import express from "express";
import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/api/proxy-pdf", async (req, res) => {
  const url = req.query.url as string;
  if (!url) {
    res.status(400).send("No URL provided");
    return;
  }
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);
    
    const buffer = await response.arrayBuffer();
    
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.send(Buffer.from(buffer));
  } catch (e: any) {
    console.error("Error en proxy de PDF:", e.message);
    res.status(500).send("Error al cargar el PDF");
  }
});

app.get("/api/notion/data", async (req, res) => {
  const apiKey = process.env.NOTION_API_KEY || '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';

  if (!apiKey || apiKey === "") {
    res.status(400).json({ error: "NOTION_API_KEY_MISSING", details: "Por favor, configura tu NOTION_API_KEY." });
    return;
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

    const ilustracionPage = pages.find((p: any) => p.title.toLowerCase() === 'ilustración' || p.title.toLowerCase() === 'ilustracion');
    const brandingPage = pages.find((p: any) => p.title.toLowerCase() === 'branding');
    
    const ilustracionChildren = ilustracionPage ? pages.filter((p: any) => p.parentId === ilustracionPage.id) : [];
    const brandingChildren = brandingPage ? pages.filter((p: any) => p.parentId === brandingPage.id && !p.title.toLowerCase().includes('manual de marca compressed')) : [];
    
    const fetchPageContent = async (page: any) => {
      try {
        const blocksRes = await notionClient.blocks.children.list({ block_id: page.id });
        const blocks = blocksRes.results as any[];
        
        const paragraphs = blocks
          .filter(b => b.type === 'paragraph')
          .map(b => b.paragraph?.rich_text?.map((t: any) => t.plain_text).join('') || "")
          .filter(text => text.trim() !== "");
        
        const text = paragraphs.join('\n\n');
        
        const images = blocks
          .filter(b => b.type === 'image')
          .map(b => b.image?.file?.url || b.image?.external?.url)
          .filter(url => !!url);

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
      } catch (e: any) {
        console.error(`Error fetching blocks for page ${page.title}:`, e);
        return { ...page, description: "", image: "", images: [], pdfUrl: "" };
      }
    };
    
    const ilustracionData = await Promise.all(ilustracionChildren.map(fetchPageContent));
    const brandingData = await Promise.all(brandingChildren.map(fetchPageContent));
    
    ilustracionData.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }));
    brandingData.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }));
    
    const inicioPage = pages.find((p: any) => p.title.toLowerCase() === 'inicio');
    const sobreMiPage = pages.find((p: any) => p.title.toLowerCase() === 'sobre mí' || p.title.toLowerCase() === 'sobre mi');
    
    const inicioData = inicioPage ? await fetchPageContent(inicioPage) : null;
    const sobreMiData = sobreMiPage ? await fetchPageContent(sobreMiPage) : null;

    res.json({
      ilustracion: ilustracionData,
      branding: brandingData,
      inicio: inicioData,
      sobreMi: sobreMiData
    });
  } catch (error: any) {
    console.error("Error de conexión con Notion:", error.message);
    res.status(500).json({ error: "NOTION_CONNECTION_ERROR", details: error.message });
  }
});

export default app;
