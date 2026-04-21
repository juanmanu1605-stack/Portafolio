import express from "express";
import { createServer as createViteServer } from "vite";
import { Client } from "@notionhq/client";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
  });

  // API Routes
  app.get("/api/proxy-pdf", async (req, res) => {
    const url = req.query.url as string;
    if (!url) return res.status(400).send("No URL provided");
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
      
      const buffer = await response.arrayBuffer();
      
      // Enviamos el PDF con los headers limpios para permitir visualización
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", "inline");
      // Eliminamos headers restrictivos enviando los nuestros propios
      res.send(Buffer.from(buffer));
    } catch (e: any) {
      console.error("Error en proxy de PDF:", e.message);
      res.status(500).send("Error al cargar el PDF");
    }
  });

  app.get("/api/notion/data", async (req, res) => {
    // Usamos la clave proporcionada por el usuario como fallback si no está en el entorno
    const apiKey = process.env.NOTION_API_KEY || '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';

    if (!apiKey || apiKey === "") {
      return res.status(400).json({ error: "NOTION_API_KEY_MISSING", details: "Por favor, configura tu NOTION_API_KEY." });
    }

    try {
      const notionClient = new Client({ auth: apiKey });
      
      console.log("Buscando páginas en Notion...");
      const searchRes = await notionClient.search({
        filter: { value: 'page', property: 'object' }
      });
      
      const pages = searchRes.results.map((p: any) => ({
        id: p.id,
        title: p.properties?.title?.title?.[0]?.plain_text || 'Untitled',
        parentId: p.parent?.page_id
      }));

      // Encontrar las páginas principales (carpetas)
      const ilustracionPage = pages.find(p => p.title.toLowerCase() === 'ilustración' || p.title.toLowerCase() === 'ilustracion');
      const brandingPage = pages.find(p => p.title.toLowerCase() === 'branding');
      
      // Encontrar los proyectos dentro de las carpetas
      const ilustracionChildren = ilustracionPage ? pages.filter(p => p.parentId === ilustracionPage.id) : [];
      const brandingChildren = brandingPage ? pages.filter(p => p.parentId === brandingPage.id && !p.title.toLowerCase().includes('manual de marca_compressed') && !p.title.toLowerCase().includes('manual de marca compressed')) : [];
      
      // Función para obtener el contenido (bloques) de una página
      const fetchPageContent = async (page: any) => {
        try {
          const blocksRes = await notionClient.blocks.children.list({ block_id: page.id });
          const blocks = blocksRes.results as any[];
          
          // Obtener todos los párrafos de texto
          const paragraphs = blocks
            .filter(b => b.type === 'paragraph')
            .map(b => b.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || "")
            .filter(text => text.trim() !== "");
          
          const text = paragraphs.join('\n\n');
          
          // Obtener todas las imágenes
          const images = blocks
            .filter(b => b.type === 'image')
            .map(b => b.image?.file?.url || b.image?.external?.url)
            .filter(url => !!url);

          // Obtener archivos PDF o Embeds
          const pdfBlock = blocks.find(b => b.type === 'pdf');
          const embedBlock = blocks.find(b => b.type === 'embed');
          
          let pdfUrl = "";
          if (pdfBlock) {
            pdfUrl = pdfBlock.pdf?.file?.url || pdfBlock.pdf?.external?.url || "";
          } else if (embedBlock) {
            pdfUrl = embedBlock.embed?.url || "";
          }

          return { 
            ...page, 
            description: text, 
            image: images[0] || "", 
            images: images,
            pdfUrl: pdfUrl
          };
        } catch (e) {
          console.error(`Error fetching blocks for page ${page.title}:`, e);
          return { ...page, description: "", image: "", images: [] };
        }
      };
      
      console.log(`Obteniendo contenido de ${ilustracionChildren.length} ilustraciones y ${brandingChildren.length} proyectos de branding...`);
      const ilustracionData = await Promise.all(ilustracionChildren.map(fetchPageContent));
      const brandingData = await Promise.all(brandingChildren.map(fetchPageContent));
      
      // Ordenar los proyectos alfabéticamente/numéricamente por título
      ilustracionData.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }));
      brandingData.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }));
      
      // Obtener imágenes para Inicio y Sobre mí
      const inicioPage = pages.find(p => p.title.toLowerCase() === 'inicio');
      const sobreMiPage = pages.find(p => p.title.toLowerCase() === 'sobre mí' || p.title.toLowerCase() === 'sobre mi');
      
      const inicioData = inicioPage ? await fetchPageContent(inicioPage) : null;
      const sobreMiData = sobreMiPage ? await fetchPageContent(sobreMiPage) : null;

      console.log("Datos procesados correctamente.");
      res.json({
        ilustracion: ilustracionData,
        branding: brandingData,
        inicio: inicioData,
        sobreMi: sobreMiData
      });
    } catch (error: any) {
      console.error("Error de conexión con Notion:", error.message);
      res.status(500).json({ 
        error: "NOTION_CONNECTION_ERROR", 
        details: error.message 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
