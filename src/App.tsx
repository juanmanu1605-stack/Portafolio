import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Home, 
  Archive, 
  Layers, 
  Info, 
  ArrowUpRight, 
  ArrowLeft,
  Share2, 
  Layout as LayoutIcon,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Github,
  Monitor,
  Palette,
  Zap
} from 'lucide-react';

// --- Types ---

type View = 'home' | 'archive' | 'layers' | 'info' | 'case-study';

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  tool: string;
  version?: string;
  engine?: string;
  tags?: string[];
}

// --- Mock Data ---

const CASE_STUDIES: CaseStudy[] = [
  {
    id: '01',
    title: 'NEO_INDUSTRIAL',
    subtitle: '01 // BRANDING',
    description: 'A comprehensive branding system for a technical architectural collective, focusing on modularity and industrial precision.',
    image: 'https://picsum.photos/seed/neoind/1200/1600',
    date: '2024',
    tool: 'FIGMA_PRO',
    tags: ['BRANDING', 'IDENTITY', 'SYSTEMS']
  },
  {
    id: '02',
    title: 'OS_SYSTEM_X',
    subtitle: '02 // INTERFACE',
    description: 'Experimental operating system interface design with a focus on high-density data visualization and terminal aesthetics.',
    image: 'https://picsum.photos/seed/ossystem/1200/1600',
    date: '2020',
    tool: 'REACT_VITE',
    tags: ['UI', 'UX', 'INTERFACE']
  },
  {
    id: '03',
    title: 'METROPOLIS_V2',
    subtitle: '03 // ARCHITECTURE',
    description: 'Digital reconstruction of brutalist urban landscapes, exploring the intersection of concrete forms and digital light.',
    image: 'https://picsum.photos/seed/metropolis/1200/1600',
    date: '2023',
    tool: 'BLENDER',
    tags: ['3D', 'ARCHITECTURE', 'BRUTALISM']
  },
  {
    id: '04',
    title: 'KINETIC_FLOW',
    subtitle: '04 // PRODUCT',
    description: 'Industrial product design study focusing on mechanical movement and structural tension in kinetic sculptures.',
    image: 'https://picsum.photos/seed/kinetic/1200/1600',
    date: '2024',
    tool: 'RHINO_3D',
    tags: ['PRODUCT', 'MECHANICAL', 'KINETIC']
  },
  {
    id: '05',
    title: 'FLUID_IDENTITY',
    subtitle: '05 // MOTION',
    description: 'Motion graphics study exploring fluid dynamics and organic forms in a digital environment.',
    image: 'https://picsum.photos/seed/fluid/1200/1600',
    date: '2022',
    tool: 'AFTER_EFFECTS',
    tags: ['MOTION', 'FLUID', 'ORGANIC']
  },
  {
    id: '06',
    title: 'CORE_DYNAMICS',
    subtitle: '06 // ENGINEERING',
    description: 'Technical illustration of complex mechanical systems, focusing on internal dynamics and structural integrity.',
    image: 'https://picsum.photos/seed/core/1200/1600',
    date: '2024',
    tool: 'AUTOCAD',
    tags: ['ENGINEERING', 'TECHNICAL', 'SYSTEMS']
  }
];

// --- Components ---

const NavigationOverlay = ({ isOpen, onClose, setView }: { isOpen: boolean, onClose: () => void, setView: (v: View) => void }) => {
  const menuItems = [
    { id: 'home', label: 'INICIO', num: '01' },
    { id: 'archive', label: 'ILUSTRACIÓN', num: '02' },
    { id: 'layers', label: 'BRANDING', num: '03' },
    { id: 'info', label: 'SOBRE MÍ', num: '04' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-obsidian flex flex-col p-6"
        >
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center space-x-4">
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-2 h-2 bg-safety-orange" />
                <div className="w-2 h-2 bg-white/20" />
                <div className="w-2 h-2 bg-white/20" />
                <div className="w-2 h-2 bg-white/20" />
              </div>
              <span className="text-pure-archive font-black tracking-tighter text-2xl uppercase">juanma.</span>
            </div>
            <button onClick={onClose} className="text-safety-orange">
              <X size={32} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-8">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ x: 20 }}
                onClick={() => {
                  setView(item.id as View);
                  onClose();
                }}
                className="group flex items-baseline space-x-4 text-left"
              >
                <span className="font-mono text-safety-orange text-sm">[{item.num}]</span>
                <span className="text-5xl md:text-8xl font-black tracking-tighter text-outline group-hover:text-outline-active transition-all duration-300">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>

          <div className="mt-auto flex justify-between items-end">
            <div className="border border-safety-orange/30 px-6 py-2 text-xs font-mono text-safety-orange">
              CONTACT_DIRECT
            </div>
            <div className="flex space-x-2">
              <button className="p-3 bg-white/5 brutalist-border"><LayoutIcon size={20} /></button>
              <button className="p-3 bg-white/5 brutalist-border"><Share2 size={20} /></button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ArchiveView = ({ onSelect, caseStudies }: { onSelect: (cs: CaseStudy) => void, caseStudies: CaseStudy[] }) => {
  return (
    <div className="space-y-16 pb-24">
      {/* Header Section */}
      <div className="space-y-6 pt-12">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase">
          ILUSTRACIONES
        </h1>
        <div className="space-y-4 max-w-md">
          <div className="font-mono text-xs text-safety-orange tracking-widest uppercase">BUILD_LOG_V.04</div>
          <p className="text-concrete text-sm leading-relaxed opacity-80">
            A curated assembly of digital constructs, industrial design experiments, and technical brand identities developed between 2021—2024.
          </p>
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-1">
        {caseStudies.map((cs) => (
          <div 
            key={cs.id} 
            className="group relative cursor-pointer overflow-hidden aspect-[3/4] md:aspect-video"
            onClick={() => onSelect(cs)}
          >
            <img 
              src={cs.image} 
              alt={cs.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-transparent to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div className="space-y-1">
                <div className="font-mono text-[10px] text-safety-orange uppercase tracking-widest">{cs.subtitle}</div>
                <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">{cs.title}</h3>
              </div>
              <div className="font-mono text-xs opacity-40 group-hover:opacity-100 transition-opacity">{cs.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 border-t border-white/10 pt-8">
          <div className="font-mono text-[10px] opacity-40 uppercase tracking-[0.3em]">PAGE 03 / 32</div>
          <div className="flex space-x-8 font-mono text-[10px] uppercase tracking-widest">
            <span className="text-safety-orange">juanma. // ARCHIVE</span>
            <span className="opacity-40">LAST_UPDATE // 2024.03.24</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const CaseStudyDetail = ({ caseStudy, onBack }: { caseStudy: CaseStudy, onBack: () => void }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setIsFullscreen(false)}
          >
            <img 
              src={caseStudy.image} 
              alt={caseStudy.title} 
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-12 pb-12">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="group flex items-center space-x-6 hover:text-safety-orange transition-colors"
          >
            <div className="w-16 h-16 brutalist-border flex items-center justify-center group-hover:bg-safety-orange group-hover:text-obsidian transition-all duration-500">
              <ArrowLeft size={32} />
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                RETURN_TO
              </span>
              <span className="block font-black text-xl tracking-tighter group-hover:text-safety-orange transition-colors">
                ARCHIVE
              </span>
            </div>
          </button>
          <div className="font-mono text-[10px] opacity-40 uppercase tracking-widest">{caseStudy.subtitle}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                {caseStudy.title.split('_').map((word, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <br />}
                    <span className={i % 2 !== 0 ? 'text-safety-orange' : ''}>{word}</span>
                  </React.Fragment>
                ))}
              </h1>
            </div>
            
            <div className="p-8 brutalist-border bg-white/5 space-y-6">
              <h2 className="font-mono text-xs text-safety-orange uppercase tracking-[0.3em]">Project_Overview</h2>
              <p className="text-concrete text-sm md:text-base leading-relaxed">
                {caseStudy.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {caseStudy.tags?.map(tag => (
                  <span key={tag} className="px-3 py-1 font-mono text-[10px] bg-white/10 border border-white/5 uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div 
              className="aspect-[3/4] brutalist-border overflow-hidden cursor-zoom-in group"
              onClick={() => setIsFullscreen(true)}
            >
              <img 
                src={caseStudy.image} 
                alt={caseStudy.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 font-mono text-[10px]">
              <div className="p-4 bg-white/5 brutalist-border">
                <div className="opacity-40 uppercase mb-1">Year</div>
                <div className="text-safety-orange">{caseStudy.date}</div>
              </div>
              <div className="p-4 bg-white/5 brutalist-border">
                <div className="opacity-40 uppercase mb-1">Tool</div>
                <div className="text-safety-orange">{caseStudy.tool}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface ContentBlock {
  type: 'text' | 'heading' | 'image';
  content?: string;
  url?: string;
}

interface BrandingModule {
  id: string;
  label: string;
  num: string;
  desc: string;
  content: string;
  image: string;
  images?: string[];
  pdfUrl?: string;
  blocks?: ContentBlock[];
}

const BRANDING_MODULES: BrandingModule[] = [
  { 
    id: 'manual', 
    label: 'MANUAL DE MARCA', 
    num: '01', 
    desc: 'Sistemas de identidad y guías de estilo.',
    content: 'Desarrollo de normativas visuales, tipografía corporativa y paletas cromáticas para garantizar la consistencia de marca en todos los soportes.',
    image: 'https://picsum.photos/seed/manual/1200/800'
  },
  { 
    id: 'logo', 
    label: 'LOGOTIPO', 
    num: '02', 
    desc: 'Construcción geométrica y variantes.',
    content: 'Diseño de marcas gráficas basadas en retículas matemáticas, con variantes para diferentes aplicaciones y escalas.',
    image: 'https://picsum.photos/seed/logo/1200/800'
  },
  { 
    id: 'pop', 
    label: 'MATERIAL POP', 
    num: '03', 
    desc: 'Puntos de venta y exhibición.',
    content: 'Diseño de elementos para puntos de venta, displays y material promocional físico enfocado en la experiencia del usuario.',
    image: 'https://picsum.photos/seed/pop/1200/800'
  },
  { 
    id: 'stationery', 
    label: 'PAPELERÍA CORPORATIVA', 
    num: '04', 
    desc: 'Soportes físicos y administrativos.',
    content: 'Sistemas de papelería que incluyen tarjetas personales, hojas membretadas, sobres y carpetas corporativas.',
    image: 'https://picsum.photos/seed/stationery/1200/800'
  },
];

const BrandingDetail = ({ module, onBack }: { module: BrandingModule, onBack: () => void }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-obsidian/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage} 
              alt="Preview" 
              className="max-w-full max-h-full object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-12 pb-12">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack} 
            className="group flex items-center space-x-6 hover:text-safety-orange transition-colors"
          >
            <div className="w-16 h-16 brutalist-border flex items-center justify-center group-hover:bg-safety-orange group-hover:text-obsidian transition-all duration-500">
              <ArrowLeft size={32} />
            </div>
            <div className="space-y-1">
              <span className="block font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
                RETURN_TO
              </span>
              <span className="block font-black text-xl tracking-tighter group-hover:text-safety-orange transition-colors">
                BRANDING
              </span>
            </div>
          </button>
          <div className="font-mono text-[10px] opacity-40 uppercase tracking-widest">MODULE // {module.num}</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-12 space-y-8">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
              {module.label.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ' '}
                  <span className={i % 2 !== 0 ? 'text-safety-orange' : ''}>{word}</span>
                </React.Fragment>
              ))}
            </h1>
          </div>
          
          <div className="lg:col-span-4 p-8 brutalist-border bg-white/5 space-y-6 h-fit sticky top-24">
            <h2 className="font-mono text-xs text-safety-orange uppercase tracking-[0.3em]">Module_Description</h2>
            <div className="text-concrete text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {module.content}
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {module.pdfUrl ? (
              <div className="space-y-6">
                <div className="w-full aspect-[3/4] md:aspect-[4/5] brutalist-border bg-white/5 overflow-hidden relative group">
                  <iframe 
                    src={`/api/proxy-pdf?url=${encodeURIComponent(module.pdfUrl)}#view=FitH`}
                    className="w-full h-full border-none"
                    title={module.label}
                  />
                  <div className="absolute inset-0 pointer-events-none border-4 border-safety-orange/10 group-hover:border-safety-orange/30 transition-colors" />
                </div>

                <div className="flex justify-center pt-4">
                  <a 
                    href={module.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 brutalist-border bg-white/5 text-concrete hover:bg-safety-orange hover:text-obsidian font-black uppercase tracking-tighter transition-all flex items-center space-x-3 text-sm"
                  >
                    <ArrowUpRight size={18} />
                    <span>Abrir en pestaña nueva</span>
                  </a>
                </div>
              </div>
            ) : module.blocks && module.blocks.length > 0 ? (
              <div className="space-y-12">
                {module.blocks.map((block, idx) => {
                  if (block.type === 'heading') {
                    return (
                      <h3 key={idx} className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-safety-orange pt-8 border-t border-white/10">
                        {block.content}
                      </h3>
                    );
                  }
                  if (block.type === 'text') {
                    return (
                      <p key={idx} className="text-concrete text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                        {block.content}
                      </p>
                    );
                  }
                  if (block.type === 'image') {
                    return (
                      <motion.div 
                        key={idx}
                        className="w-full brutalist-border overflow-hidden cursor-zoom-in group bg-white/5"
                        onClick={() => setSelectedImage(block.url!)}
                      >
                        <img 
                          src={block.url} 
                          alt={`block-${idx}`} 
                          className="w-full h-auto object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(module.images && module.images.length > 0 ? module.images : [module.image]).map((img, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="aspect-square brutalist-border overflow-hidden cursor-zoom-in group bg-white/5"
                    onClick={() => setSelectedImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${module.label} - ${idx}`} 
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const BrandingView = ({ onSelect, modules }: { onSelect: (module: BrandingModule) => void, modules: BrandingModule[] }) => {
  return (
    <div className="space-y-12 pb-12">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-outline-active">BRANDING</h1>
        <p className="text-concrete text-sm font-mono uppercase tracking-widest opacity-60">Sistemas de Identidad Visual</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <button 
            key={module.id}
            onClick={() => onSelect(module)}
            className="group p-8 brutalist-border bg-white/5 text-left hover:bg-safety-orange hover:text-obsidian transition-all duration-500 flex flex-col justify-between aspect-square md:aspect-auto md:min-h-[250px]"
          >
            <span className="font-mono text-xs opacity-40 group-hover:opacity-100 group-hover:font-bold">[{module.num}]</span>
            <div className="space-y-2">
              <h3 className="text-3xl font-black tracking-tighter leading-none">{module.label}</h3>
              <p className="text-[10px] font-mono opacity-50 group-hover:opacity-100 uppercase tracking-tighter">{module.desc}</p>
            </div>
            <div className="mt-4 flex justify-end">
              <ArrowUpRight size={24} className="opacity-20 group-hover:opacity-100" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const AboutView = ({ profileImage }: { profileImage?: string | null }) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        <div className="lg:col-span-8 space-y-6">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8]">
            HOLA,<br/>
            <span className="text-safety-orange">SOY juanma.!</span>
          </h1>
          <p className="text-xl md:text-2xl font-mono tracking-tight opacity-60">
            Y el diseño gráfico es mi pasión.
          </p>
        </div>
        <div className="lg:col-span-4">
          <div className="aspect-square bg-safety-orange brutalist-border relative overflow-hidden group">
            <img 
              src={profileImage || "https://picsum.photos/seed/designer/800/800"} 
              alt="Profile" 
              className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[16px] border-obsidian/10 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Bio & Contact */}
        <div className="lg:col-span-4 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tighter uppercase border-b border-white/10 pb-2">Bio</h2>
            <p className="text-sm text-concrete leading-relaxed">
              Soy ilustradora, animadora y diseñadora, viviendo actualmente en Lima, Perú. Amo los gatos, la historia y los libros de ciencia ficción. Mi objetivo es demostrar cómo mi metodología y competencias técnicas se adaptan de forma proactiva a cada proyecto.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-black tracking-tighter uppercase border-b border-white/10 pb-2">Contacto</h2>
            <div className="space-y-3 font-mono text-xs">
              <a href="#" className="flex items-center space-x-3 hover:text-safety-orange transition-colors">
                <Phone size={14} className="text-safety-orange" />
                <span>+51 987 707 142</span>
              </a>
              <a href="#" className="flex items-center space-x-3 hover:text-safety-orange transition-colors">
                <Mail size={14} className="text-safety-orange" />
                <span>kl_design@archive.com</span>
              </a>
              <div className="flex items-center space-x-3">
                <MapPin size={14} className="text-safety-orange" />
                <span>LIMA, PERÚ</span>
              </div>
            </div>
            <div className="flex space-x-4 pt-2">
              <Instagram size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
              <Linkedin size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
              <Github size={18} className="opacity-40 hover:opacity-100 cursor-pointer transition-opacity" />
            </div>
          </div>
        </div>

        {/* Right Column: Education, Experience, Software */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase border-b border-white/10 pb-2">Educación</h2>
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-safety-orange">2018—2021</div>
                  <div className="font-bold uppercase tracking-tighter">Toulouse Lautrec</div>
                  <div className="text-xs text-concrete italic">Animación Digital</div>
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-[10px] text-safety-orange">2022—Present</div>
                  <div className="font-bold uppercase tracking-tighter">USIL</div>
                  <div className="text-xs text-concrete italic">Diseño Gráfico</div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase border-b border-white/10 pb-2">Software</h2>
              <div className="flex flex-wrap gap-2">
                {['Ps', 'Ai', 'Ae', 'Pr', 'Id', 'Fi'].map(tool => (
                  <div key={tool} className="w-10 h-10 brutalist-border bg-white/5 flex items-center justify-center font-black text-xs hover:bg-safety-orange hover:text-obsidian transition-all cursor-default">
                    {tool}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-2xl font-black tracking-tighter uppercase border-b border-white/10 pb-2">Experiencia</h2>
              <div className="space-y-6">
                {[
                  { year: '2024—2025', role: 'Artista de Escenarios', company: 'Startoons' },
                  { year: '2023—2024', role: 'Concept Artist', company: 'Heskil Studio' },
                  { year: '2022—2023', role: 'Concept Artist', company: 'Startoons' },
                  { year: '2021—2022', role: 'Redes Sociales', company: 'Need Full Store' }
                ].map((exp, i) => (
                  <div key={i} className="space-y-1">
                    <div className="font-mono text-[10px] text-safety-orange">{exp.year}</div>
                    <div className="font-bold uppercase tracking-tighter">{exp.role}</div>
                    <div className="text-xs text-concrete italic">{exp.company}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [selectedBrandingModule, setSelectedBrandingModule] = useState<BrandingModule | null>(null);
  const [notionData, setNotionData] = useState<any>(null);
  const [dynamicCaseStudies, setDynamicCaseStudies] = useState<CaseStudy[]>([]);
  const [dynamicBrandingModules, setDynamicBrandingModules] = useState<BrandingModule[]>([]);
  const [isLoadingNotion, setIsLoadingNotion] = useState(true);
  const [notionError, setNotionError] = useState<string | null>(null);

  React.useEffect(() => {
    const fetchNotion = async () => {
      setIsLoadingNotion(true);
      setNotionError(null);
      try {
        const res = await fetch('/api/notion/data');
        const data = await res.json();
        if (!data.error) {
          setNotionData(data);
          processNotionData(data);
        } else {
          setNotionError(data.details || data.error);
        }
      } catch (err) {
        console.error("Notion fetch error:", err);
        setNotionError("Error de conexión con el servidor.");
      } finally {
        setIsLoadingNotion(false);
      }
    };
    fetchNotion();
  }, []);

  const processNotionData = (data: any) => {
    if (!data) return;
    
    const cases: CaseStudy[] = [];
    const brands: BrandingModule[] = [];

    if (data.ilustracion && Array.isArray(data.ilustracion)) {
      data.ilustracion.forEach((item: any, index: number) => {
        cases.push({
          id: item.id,
          title: item.title.toUpperCase() || "UNTITLED_PROJECT",
          subtitle: `${String(index + 1).padStart(2, '0')} // ILUSTRACIÓN`,
          description: item.description || "Sin descripción disponible.",
          image: item.image || `https://picsum.photos/seed/${item.id}/1200/1600`,
          date: "2024",
          tool: "NOTION",
          tags: ['NOTION', 'DYNAMIC']
        });
      });
    }

    if (data.branding && Array.isArray(data.branding)) {
      data.branding.forEach((item: any, index: number) => {
        brands.push({
          id: item.id,
          label: item.title.toUpperCase() || "BRAND_MODULE",
          num: String(index + 1).padStart(2, '0'),
          desc: (item.description || "Módulo de branding.").substring(0, 50) + '...',
          content: item.description || "Detalles del sistema de marca.",
          image: item.image || `https://picsum.photos/seed/${item.id}/1200/800`,
          images: item.images || [],
          pdfUrl: item.pdfUrl || "",
          blocks: item.blocks || []
        });
      });
    }

    if (cases.length > 0) setDynamicCaseStudies(cases);
    if (brands.length > 0) setDynamicBrandingModules(brands);
  };

  const getNotionImage = (name: string) => {
    if (!notionData) return null;
    
    if (name.toLowerCase() === 'inicio' && notionData.inicio) {
      return notionData.inicio.image || null;
    }
    
    if ((name.toLowerCase() === 'profile' || name.toLowerCase() === 'sobre mí') && notionData.sobreMi) {
      return notionData.sobreMi.image || null;
    }
    
    return null;
  };

  const renderView = () => {
    if (selectedCaseStudy) {
      return <CaseStudyDetail caseStudy={selectedCaseStudy} onBack={() => setSelectedCaseStudy(null)} />;
    }

    if (selectedBrandingModule) {
      return <BrandingDetail module={selectedBrandingModule} onBack={() => setSelectedBrandingModule(null)} />;
    }

    switch (currentView) {
      case 'archive':
        return <ArchiveView 
          onSelect={(cs) => setSelectedCaseStudy(cs)} 
          caseStudies={dynamicCaseStudies.length > 0 ? dynamicCaseStudies : CASE_STUDIES} 
        />;
      case 'layers':
        return <BrandingView 
          onSelect={(module) => setSelectedBrandingModule(module)} 
          modules={dynamicBrandingModules.length > 0 ? dynamicBrandingModules : BRANDING_MODULES}
        />;
      case 'info':
        return <AboutView profileImage={getNotionImage('Profile')} />;
      case 'home':
        const homeImage = getNotionImage('inicio');
        return (
          <div className="relative flex flex-col items-center justify-center h-[70vh] text-center space-y-12 overflow-hidden">
            {homeImage && (
              <div className="absolute inset-0 -z-10 opacity-30">
                <img 
                  src={homeImage} 
                  alt="Home Background" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
              </div>
            )}
            <div className="space-y-6">
              <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none text-outline-active">
                PORTAFOLIO
              </h1>
            </div>
            
            <motion.button 
              onClick={() => setIsMenuOpen(true)} 
              className="group relative flex flex-col items-center space-y-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -3, 3, -3, 0],
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <div className="w-24 h-24 brutalist-border rounded-full flex items-center justify-center group-hover:bg-safety-orange group-hover:text-obsidian transition-all duration-500">
                <Menu size={40} />
              </div>
              <div className="space-y-2">
                <span className="block font-mono text-[10px] tracking-[0.5em] text-safety-orange">OPEN_MENU</span>
                <div className="w-full h-px bg-safety-orange/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.button>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-[70vh] opacity-20">
            <span className="font-mono text-xs tracking-[0.5em]">SYSTEM_OFFLINE</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-full max-w-7xl mx-auto relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-obsidian/80 backdrop-blur-md p-6 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center space-x-4">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-2 h-2 bg-safety-orange" />
            <div className="w-2 h-2 bg-white/20" />
            <div className="w-2 h-2 bg-white/20" />
            <div className="w-2 h-2 bg-white/20" />
          </div>
          <span className="text-pure-archive font-black tracking-tighter text-2xl uppercase">juanma.</span>
        </div>
        <motion.button 
          onClick={() => setIsMenuOpen(true)} 
          className="flex items-center space-x-2 group"
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <span className="font-mono text-[10px] tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">MENU</span>
          <Menu size={20} className="text-safety-orange" />
        </motion.button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto relative">
        {isLoadingNotion && (
          <div className="absolute top-0 left-0 w-full h-1 z-50 overflow-hidden">
            <motion.div 
              className="h-full bg-safety-orange"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
        )}
        
        {notionError && (
          <div className="mb-6 p-4 brutalist-border bg-red-500/10 border-red-500 text-red-500 text-xs font-mono flex items-center justify-between">
            <span>ERROR_SYNC: {notionError}</span>
            <button onClick={() => window.location.reload()} className="underline">RETRY</button>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView + (selectedCaseStudy?.id || '') + (selectedBrandingModule?.id || '')}
            initial={
              currentView === 'layers' 
                ? { opacity: 0, scale: 0.2, filter: 'blur(20px)' } 
                : { opacity: 0, x: 20, filter: 'blur(10px)' }
            }
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={
              currentView === 'layers'
                ? { opacity: 0, scale: 2, filter: 'blur(20px)' }
                : { opacity: 0, x: -20, filter: 'blur(10px)' }
            }
            transition={
              currentView === 'layers'
                ? { type: "spring", stiffness: 150, damping: 15 }
                : { duration: 0.4, ease: "anticipate" }
            }
            className="w-full h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <NavigationOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        setView={(v) => {
          setCurrentView(v);
          setSelectedCaseStudy(null);
          setSelectedBrandingModule(null);
        }}
      />
    </div>
  );
}
