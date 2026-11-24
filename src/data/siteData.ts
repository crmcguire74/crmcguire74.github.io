import type { ProjectFilter } from '../utils/portfolioLogic';

const modusBlueprintImg = '/assets/images/modus_spatial_render_1794774703750.webp';
const thriveBlueprintImg = '/assets/images/thrive_forensic_engine_1794774703856.webp';
const snapclipperBlueprintImg = '/assets/images/snapclipper_knowledge_graph_1794774703472.webp';
const booksImg = '/assets/images/christopher_books_collection_1794776076325.webp';
const investingBookCoverImg = '/assets/images/investing_book_cover_1794776363775.webp';

export const ASSETS = {
  logo: '/images/paguireLogo.webp',
  portrait: '/assets/aistudio/Professional_Executive_Portrait_9d49b2b1.webp',
  heroBg: '/assets/aistudio/background_hero_188144e2.webp',
  heroCutout: '/assets/aistudio/Profile_Photo_ebde6ee9.webp',
  bioPortrait: '/assets/aistudio/Christopher_McGuire_in_a_Warm_Home_Studio_c3164186.webp',
  chrisWorking: '/assets/aistudio/Charcoal_Blazer_Portrait_in_Warm_Studio_6a74e7c0.webp',
  studioLeader: '/assets/aistudio/Creative_Leader_in_a_Walnut_Studio_c86f2cec.webp',
  studioModern: '/assets/aistudio/Creative_Leader_in_a_Modern_Studio_f99a5580.webp',
  exploringAi: '/assets/aistudio/Exploring_AI_in_a_Walnut_Studio_1fb365fd.webp',
  buildingWebApp: '/assets/aistudio/Christopher_Building_a_Web_App_39016f52.webp',
  designingInterfaces: '/assets/aistudio/Designing_Interfaces_and_Code_in_Studio_8e1cdb45.webp',
  pinkChecksPortrait: '/assets/aistudio/Warm_Studio_Portrait_in_Pink_Checks_09f7aa6c.webp',
  authorStudyPortrait: '/assets/aistudio/Reflective_Author_in_Contemporary_Study_3539dae4.webp',
  resumeSkyline: '/assets/aistudio/Dusk_Chicago_Skyline_Reflections_03d3434e.webp',
  resumePortrait: '/assets/aistudio/Confident_Twilight_City_Portrait_b31578fb.webp',
  aiLabsBg: '/assets/aistudio/CyanAILabWorkstation_ff8c4774.webp',
  aiLabsPortrait: '/assets/aistudio/FuturisticAILabHeroSection_9403f7f4.webp',
  aiLabsPodcast: '/assets/aistudio/FocusedPodcastRecordinginModernStudio_855339d5.webp',
  aiImagesStudio: '/assets/aistudio/AI_Images_25193837.webp',
  aiVideoSuite: '/assets/aistudio/AI_Video_Editing_Studio_c09f6027.webp',
  notebookLmSynthesis: '/assets/aistudio/Google_NotebookLM_Office_Workspace_d426c87d.webp',
  markflowApp: '/assets/aistudio/markflow_app.webp',
  bioHeroBg: '/assets/aistudio/CinematicNeonOfficeOverlookingChicagoatDusk_5e0a4d30.webp',
  bioHeroPortrait: '/assets/aistudio/ChristopherMcGuire__AnEvolvingStory_5603d57c.webp',
  projectsHeroBg: '/assets/aistudio/Dark_Teal_Studio_Background_Clean_Plate-1_4707f1b2.webp',
  projectsHeroPortrait: '/assets/aistudio/Burgundy-shirted_man_at_his_desk_6adaa473.webp',
  libraryHeroBg: '/assets/aistudio/Atmospheric_Midnight_Library_Backdrop_60ebdaba.webp',
  libraryHeroPortrait: '/assets/aistudio/Seated_portrait_with_walnut_table_b754e931.webp',
  modusBlueprintImg,
  thriveBlueprintImg,
  snapclipperBlueprintImg,
  booksImg,
  resumePdf: '/Christopher_R_McGuire-SVP_of_Software_Engineering_UX_UI.pdf',
  portfolioPdf: '/Christopher_R_McGuire-Portfolio.pdf',
  contactHeroVideoId: '1tkdcFvymOM',
  contactVideoEmbedUrl:
    'https://www.youtube.com/embed/1tkdcFvymOM?autoplay=1&mute=0&loop=1&playlist=1tkdcFvymOM&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1',
  contactVideoWatchUrl: 'https://youtu.be/1tkdcFvymOM',
  biographyVideoId: 'tBkEzWZsmx4',
  biographyVideoEmbedUrl:
    'https://www.youtube.com/embed/tBkEzWZsmx4?autoplay=1&mute=1&loop=1&playlist=tBkEzWZsmx4&controls=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1',
  biographyVideoWatchUrl: 'https://www.youtube.com/watch?v=tBkEzWZsmx4',
  videoEmbedUrl: 'https://www.youtube.com/embed/tBkEzWZsmx4',
  videoWatchUrl: 'https://www.youtube.com/watch?v=tBkEzWZsmx4',
};

export const MODUS_GALLERY = [
  {
    id: 'living-room',
    step: '01',
    title: 'Precision Furniture Locking',
    caption: 'Redesigns room atmosphere and finishes while preserving your real sofa, rug footprint, and window geometry.',
    image: '/images/modus-1.webp',
    spec: 'Furniture Lock · Living Space',
  },
  {
    id: 'paint-visualizer',
    step: '02',
    title: 'True-Light Paint Calibration',
    caption: 'Applies real paint hues directly onto existing wall textures while retaining natural shadows and ambient bounce light.',
    image: '/images/modus-2.webp',
    spec: 'Paint-Only Mode · Texture Mapping',
  },
  {
    id: 'space-organizer',
    step: '03',
    title: 'Functional Storage Organization',
    caption: 'Re-architects tight apartments and condos to maximize usable storage without structural demolition.',
    image: '/images/modus-3.webp',
    spec: 'Organization Logic · Compact Layouts',
  },
  {
    id: 'exterior-facade',
    step: '04',
    title: 'Exterior Facade & Patio Modeling',
    caption: 'Generates structurally viable backyard, garden, and exterior architecture refreshes.',
    image: '/images/modus-4.webp',
    spec: 'Exterior Model · Landscape & Patio',
  },
  {
    id: 'kitchen-remodel',
    step: '05',
    title: 'Guided Kitchen & Structural Remodel',
    caption: 'Explores cabinetry, islands, and lighting upgrades while respecting existing plumbing and wall boundaries.',
    image: '/images/modus-5.webp',
    spec: 'Structural Mode · Contractor Brief',
  },
  {
    id: 'style-matrix',
    step: '06',
    title: 'Curated Architectural Styles',
    caption: 'Compare multiple interior design directions side-by-side before spending a dollar on contractors.',
    image: '/images/modus-6.webp',
    spec: 'Multi-Style Iteration · Draft Engine',
  },
];

export const SNAPCLIPPER_SCREENS = [
  {
    step: '01',
    title: 'Instant Context Capture',
    description: 'Right-click highlighted text or press Command+Shift+Y to save quotes, prompts, and code without leaving your tab.',
    image: '/images/snapclipper-1.webp',
  },
  {
    step: '02',
    title: 'AI-Tagged Local Dashboard',
    description: 'Automatic categorization across Research, Inspiration, Code, Quotes, and Notes with instant full-text search.',
    image: '/images/snapclipper-2.webp',
  },
  {
    step: '03',
    title: 'Privacy & Backup Controls',
    description: 'All clips remain inside your local browser storage with theme controls and one-click Markdown/JSON exports.',
    image: '/images/snapclipper-3.webp',
  },
];

export interface CareerRole {
  id: string;
  era: string;
  period: string;
  company: string;
  title: string;
  metricBadge: string;
  metricLabel: string;
  summary: string;
  highlights: string[];
  domain: string;
  blueprintCode: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  filterGroup: Exclude<ProjectFilter, 'All'>;
  description: string;
  features: string[];
  tags: string[];
  image: string;
  internalRoute?: string;
  externalUrl?: string;
  ctaLabel: string;
  featured?: boolean;
}

export interface BookItem {
  index: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  amazonUrl: string;
  coverImage: string;
}

export const PROFILE = {
  name: 'Christopher R McGuire',
  role: 'SVP of Application Design and Development',
  location: 'Chicago, IL',
  email: 'Christopher.R.McGuire@gmail.com',
  headlineLead: 'Bridging the gap between users, designers, and developers for superior application development.',
  summary:
    'Accomplished SVP of Software Engineering & UX/UI Design, recognized for pioneering the front-end transformation at Citadel with the creation of the first UX/UI Frontend Design and Development team that set a benchmark for user-centric development with a thoughtful full-stack architecture.',
  education: {
    institution: 'Purdue University',
    degree: 'B.S. Computer and Electrical Engineering',
    year: '1996',
  },
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/christopher-r-mcguire/' },
    { label: 'X / Twitter', href: 'https://twitter.com/crmcguire74' },
    { label: 'GitHub', href: 'https://github.com/crmcguire74' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@crmcguire74' },
    { label: 'YouTube', href: 'https://www.youtube.com/@crmcguire1974' },
  ],
};

export const IMPACT_METRICS = [
  { value: '20+', label: 'Years in Engineering & UX Leadership', context: 'Savant Wealth · Mesirow · Akuna · Citadel' },
  { value: '-50%', label: 'UI Development Time Reduction', context: 'Styled control libraries at Citadel' },
  { value: '+30%', label: 'Feature Delivery Acceleration', context: 'AI-augmented SDLC at Mesirow' },
  { value: '+25%', label: 'Product Delivery Velocity', context: 'Design & engineering alignment at Akuna' },
];

export const PILLARS = [
  {
    index: '01',
    title: 'Leadership',
    description:
      'Building and leading global teams to innovate, architect, and execute multiple real-time applications.',
  },
  {
    index: '02',
    title: 'Innovation',
    description:
      'Pioneering front-end transformation with innovative design systems, full-stack architecture, and applied AI.',
  },
  {
    index: '03',
    title: 'User-Centric',
    description:
      'Creating intuitive, performance-focused interfaces that prioritize operational clarity and user experience.',
  },
  {
    index: '04',
    title: 'Excellence',
    description:
      'Delivering operational excellence by aligning engineering roadmaps and team growth to key business objectives.',
  },
];

export const CAREER_TIMELINE: CareerRole[] = [
  {
    id: 'savant-wealth',
    era: 'Unified Advisor Platform & AI Advisory',
    period: '2026 – Present',
    company: 'Savant Wealth',
    title: 'Director of WiseOS Platform',
    metricBadge: 'WiseOS',
    metricLabel: 'Unified Advisor & Client Platform',
    summary:
      'Transforming a disconnected Wealth Advisor application ecosystem into one comprehensive Next.js and React platform on Azure—layered over AI agents that synthesize transcripts and client data across advisor and client workflows.',
    highlights: [
      'Architecting the unified WiseOS platform in Next.js and React on Azure to streamline end-to-end Advisor and Client workflows.',
      'Deploying AI agents that analyze transcripts and client data to prepare advisors, coach teams toward high-impact client interactions, and accelerate prospect and firm acquisitions.',
      'Rebuilt a custom executive reporting solution as a micro-UI React app synchronized with Monday.com for tailored C-suite visualizations and insights.',
      'Serving on the firm’s AI Advisory Board to guide responsible AI governance, lead strategy, and educate teams on new AI initiatives.',
    ],
    domain: 'Wealth Management & Advisor AI Platform',
    blueprintCode: 'SAVANT WEALTH // 2026–PRESENT',
  },
  {
    id: 'mesirow',
    era: 'Executive AI & Application Strategy',
    period: '2024 – 2026',
    company: 'Mesirow',
    title: 'SVP, Head of Application Design and Development',
    metricBadge: '+30%',
    metricLabel: 'Feature Delivery Velocity',
    summary:
      'Spearheading end-to-end application development strategy across multiple business lines—architecting scalable solutions, mentoring cross-functional teams, and embedding AI across the SDLC.',
    highlights: [
      'Accelerated product feature delivery by 30% through AI training, prompt engineering standards, and GPT/Claude/LLM workflows.',
      'Transformed teams from siloed and reactive to collaborative and forward-thinking with structured career ladders.',
      'Deprecated legacy systems while aligning application architecture directly to business strategy and stakeholder outcomes.',
    ],
    domain: 'Wealth Management & Institutional Finance',
    blueprintCode: 'MESIROW // 2024–2026',
  },
  {
    id: 'akuna',
    era: 'Observability & Engineering Culture',
    period: '2021 – 2023',
    company: 'Akuna Capital',
    title: 'Head of UX / UI Design and Development',
    metricBadge: '+25%',
    metricLabel: 'Product Delivery Acceleration',
    summary:
      'Serving as VP of Engineering, UX/UI Design, and Director of Front-End Development—unifying fragmented engineering workflows and establishing career paths for technology teams.',
    highlights: [
      'Consolidated distributed application logs into a unified real-time observability dashboard.',
      'Cultivated a knowledge-sharing engineering culture that reduced onboarding time and lifted team satisfaction.',
      'Accelerated product delivery by 25% by pairing UX rigor with disciplined frontend architecture.',
    ],
    domain: 'Options Market Making & Trading Tech',
    blueprintCode: 'AKUNA CAPITAL // 2021–2023',
  },
  {
    id: 'spiderrock',
    era: 'Design Systems & Distributed Resilience',
    period: '2019 – 2021',
    company: 'SpiderRock Platform',
    title: 'Director of Application Engineering',
    metricBadge: '100%',
    metricLabel: 'Design System Adoption',
    summary:
      'Modernized core trading and analytics application suites, instituted a unified design system library, and led the engineering transition into remote-first operations.',
    highlights: [
      'Implemented a cross-firm design system library transforming UI/UX consistency across product lines.',
      'Modernized complex data-intensive application interfaces for institutional options analytics.',
      'Nurtured a high-output engineering organization seamlessly through the global pandemic transition.',
    ],
    domain: 'Options Analytics & Execution Platform',
    blueprintCode: 'SPIDERROCK // 2019–2021',
  },
  {
    id: 'citadel',
    era: 'Pioneering Front-End Transformation',
    period: '2005 – 2019',
    company: 'Citadel, LLC',
    title: 'Director of UX and UI Design and Development',
    metricBadge: '-50%',
    metricLabel: 'UI Development Time',
    summary:
      'Built and led the largest UX/UI team with frontend engineering focus within Citadel—setting the firm-wide benchmark for user-centric trading and analytics software.',
    highlights: [
      'Reduced UI development time by 50% by introducing reusable styled control libraries and project templates.',
      'Delivered scalable microservices-backed interfaces across multi-monitor portfolio and trading workflows.',
      'Established shared semantic color, navigation, and layout standards across disparate business units.',
    ],
    domain: 'Global Hedge Fund & Market Maker',
    blueprintCode: 'CITADEL // 2005–2019',
  },
  {
    id: 'ge-medical',
    era: 'Clinical Imaging & Automation',
    period: '2001 – 2005',
    company: 'GE Medical',
    title: 'Lead Tools and CM Engineer',
    metricBadge: 'PACS',
    metricLabel: 'Radiology Systems & Tooling',
    summary:
      'Designed automated engineering tools and digital document management workflows supporting Radiology Information Systems (RIS) and PACS clinical software.',
    highlights: [
      'Engineered internal software tools and automated processes accelerating design and test cycles.',
      'Implemented digital document management systems and standardized configuration management across teams.',
    ],
    domain: 'Healthcare Systems & Medical Imaging',
    blueprintCode: 'GE MEDICAL // 2001–2005',
  },
  {
    id: 'motorola',
    era: 'Telecom Systems & Global QA',
    period: '1997 – 2001',
    company: 'Motorola',
    title: 'Lead Quality Assurance Engineer',
    metricBadge: 'GSM/UMTS',
    metricLabel: 'GPRS IP Network Architecture',
    summary:
      'Supported the complete software lifecycle for Motorola GSM, GPRS, and UMTS telecommunication platforms across Chicago and Vancouver teams.',
    highlights: [
      'Designed an in-house GPRS IP Network and automated core telecom verification suites.',
      'Led cross-location testing initiatives and mentored local engineering teams in Vancouver.',
    ],
    domain: 'Wireless Telecommunications',
    blueprintCode: 'MOTOROLA // 1997–2001',
  },
];

export const COLLEAGUE_QUOTES = [
  {
    quote:
      'Chris is a game-changing UI/UX expert and team leader, with a rare combination of modern technical skill on the best platforms, ability to partner with key business stakeholders, and a great instinct for workflow efficiency.',
    attribution: 'Chris Herringshaw',
    context: 'Chief Technology Officer at Janus Henderson Investors',
  },
  {
    quote:
      'Chris is one of those rare people who gets every step of making a successful digital product. His ability to pair a solid strategy with top-tier design and development is unmatched and shows in the products he successfully creates.',
    attribution: 'Jason Eplawy',
    context: 'Owner at World Headquarters, Inc.',
  },
];

export const SKILLS_MATRIX = {
  programming: [
    'TypeScript',
    'JavaScript',
    'React',
    'HTML5',
    'CSS3',
    '.NET',
    'Java',
    'SQL',
    'Google Cloud',
    'Firebase',
    'Azure',
  ],
  software: ['Figma', 'VS Code', 'Git', 'Adobe CS', 'Grafana', 'Balsamiq'],
  expertise: [
    'UX & UI Design',
    'Frontend Architecture',
    'Full Stack Development',
    'Generative AI & LLMs',
    'Design System Libraries',
    'System Architecture',
    'API Design and Development',
    'Database Design',
  ],
  leadership: [
    'Team Leadership',
    'Strategic Planning',
    'Mentorship',
    'Cross-Team Collaboration',
    'Business Strategy',
    'Change Management',
    'Product Management',
    'Stakeholder Management',
    'Vendor Management',
    'Technical Interviews',
  ],
  aiStack: [
    'OpenAI GPT Models',
    'Claude Models',
    'Google Gemini Models',
    'Codex, Claude Code',
    'Grok',
    'LlaMa (Local LLM)',
    'AI Agents',
    'Google AI Studio',
    'ElevenLabs',
    'GPT Image (2 / 2.5 / 2.6)',
    'Nano Banana (2 / 2.1 / Pro)',
    'Adobe Firefly (Image 4), Flux',
    'Muse, Duet, GrokBot',
    'Gemini Omni, Veo 3.1',
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'thrive-financial',
    title: 'Thrive Financial',
    subtitle: 'AI Forensic Accounting & Settlement Intelligence',
    category: 'Legal Tech / FinTech AI',
    filterGroup: 'FinTech',
    description:
      'Take control of complex financial separation by leveraging AI to parse bank and credit card statements, uncover hidden assets, organize marital property and debts, and model state-aligned settlements.',
    features: [
      'Bank statement PDF-to-Excel forensic extraction engine.',
      'AI LLM anomaly detection to surface undisclosed transfers and asset discrepancies.',
      'Structured property division and mediation agreement modeling.',
    ],
    tags: ['Gemini 2.5 Flash', 'React', 'Node.js', 'Firebase', 'UX/UI'],
    image: '/assets/aistudio/ThriveFinancial_694601f5.webp',
    externalUrl: 'https://thrivefinancial.app',
    ctaLabel: 'Visit Thrive Financial',
    featured: true,
  },
  {
    id: 'incident-logger',
    title: 'Thrive Incident Logger',
    subtitle: 'Privacy-First iOS Evidence & Audit Timeline App',
    category: 'Mobile App (iOS) / Legal Utility',
    filterGroup: 'FinTech',
    description:
      'A privacy-first iOS incident logging app built to capture timestamped events with context, attachments, and export-ready records while preserving an immutable audit trail.',
    features: [
      'Structured entries with categories, notes, photos, and location/device metadata.',
      'Audit-ready timeline preserving edit history for defensible documentation.',
      'Encrypted on-device storage with PDF, CSV, and attorney packet exports.',
    ],
    tags: ['iOS', 'Privacy', 'Audit Trail', 'Mobile'],
    image: '/assets/aistudio/ThriveIncidentLogger_c0495e50.webp',
    externalUrl: 'https://apps.apple.com/us/app/incidentlog/id6756827780',
    ctaLabel: 'View on App Store',
    featured: true,
  },
  {
    id: 'modus-ai',
    title: 'Modus AI',
    subtitle: 'AI Room Designer for Interior & Exterior Spaces (iOS)',
    category: 'AI / iOS / Spatial Reasoning',
    filterGroup: 'AI & LLM',
    description:
      'Professional-grade AI interior design with spatial constraints that transforms rooms while preserving your real furniture, walls, and architectural footprints—with zero subscription.',
    features: [
      'Intelligent Spatial Constraints: Toggle between Paint-Only updates and structural remodels.',
      'Functional Organization Mode: Specialized AI logic to maximize storage and optimize layouts.',
      'Precision Furniture Mapping: Image-to-image pipeline that locks existing furniture pieces.',
    ],
    tags: ['Gemini', 'iOS', 'React Native', 'Expo', 'Spatial AI'],
    image: '/assets/aistudio/Modus_AI_e260817c.webp',
    internalRoute: '/projects/modus-ai',
    externalUrl: 'https://apps.apple.com/us/app/modus-ai-interior-design-app/id6757023994',
    ctaLabel: 'Explore Modus AI',
    featured: true,
  },
  {
    id: 'wils-martini-lounge',
    title: "Wil's Martini Lounge",
    subtitle: 'Full Hospitality Website Design & Motion Graphics Experience',
    category: 'Web Design / Motion Graphics & Video',
    filterGroup: 'Web & Interactive',
    description:
      'A full website design project undertaken for Wil’s Martini Lounge—combining bespoke hospitality UX, atmospheric motion graphics, and integrated video storytelling across menus and private room reservations.',
    features: [
      'Custom editorial visual direction paired with integrated video and motion graphics.',
      'Seamless menu, happenings, hours, and private room reservation workflows.',
      'Responsive performance engineered for an evocative late-night lounge aesthetic.',
    ],
    tags: ['Web Design', 'Motion Graphics', 'Video', 'Brand UX'],
    image: '/assets/aistudio/WilsMartiniLounge_6d752b71.webp',
    externalUrl: 'https://wilsmartinilounge.com',
    ctaLabel: "Visit Wil's Martini Lounge",
    featured: true,
  },
  {
    id: 'tron-engaged',
    title: 'Tron Engaged',
    subtitle: 'WebXR 3D Light Cycle & Disc Combat Game (Web & VR)',
    category: 'WebXR / 3D Interactive Gaming',
    filterGroup: 'Web & Interactive',
    description:
      'A web-based (WebXR) 3D game delivering a modernized reimagination of the classic Tron discs and light cycle arenas—playable seamlessly in standard desktop browsers as well as first-person in VR.',
    features: [
      'Dual-mode gameplay across desktop web browsers and immersive first-person VR via WebXR.',
      'Modernized 3D disc combat and light cycle trail mechanics inside a neon cyber arena.',
      'Real-time 3D rendering, responsive spatial controls, and immersive lighting physics.',
    ],
    tags: ['WebXR', '3D Gaming', 'VR', 'Interactive Web'],
    image: '/assets/aistudio/TronEngaged_a8a21c6c.webp',
    externalUrl: 'https://tronengaged.paguire.com/',
    ctaLabel: 'Play Tron Engaged',
    featured: true,
  },
  {
    id: 'nexora',
    title: 'Nexora: The Visual Workspace',
    subtitle: 'Browser-Based Precision Canvas for Diagrams & Floorplans',
    category: 'Diagramming / Vector Design Tooling',
    filterGroup: 'Design Tools',
    description:
      'A browser-based alternative to desktop diagramming suites. Build engineering architectures, interactive sequence diagrams, process flows, org charts, and scaled floorplans on a single precision vector canvas.',
    features: [
      'Nine studios across four modules: Flow, Space, Sequence, and Architect.',
      'Measured architectural floorplans with auto-detected rooms in US or Metric units.',
      'Drag-to-connect sequence lifelines, activations, events, and fragments.',
    ],
    tags: ['Vector Canvas', 'Diagramming', 'Floorplans', 'React', 'Local-First'],
    image: '/assets/aistudio/Nexora_VisualWorkspace_8268a7b5.webp',
    externalUrl: 'https://nexora.paguire.com',
    ctaLabel: 'Launch Nexora',
    featured: true,
  },
  {
    id: 'snapclipper',
    title: 'SnapClipper',
    subtitle: 'Privacy-First AI Web Clipper Chrome Extension',
    category: 'Chrome Extension / Knowledge Capture',
    filterGroup: 'AI & LLM',
    description:
      'One-click web clipping with automatic AI categorization. Capture highlights, code snippets, prompts, and quotes without breaking flow—stored privately on your own device.',
    features: [
      'Instant context-menu and Command+Shift+Y keyboard clipping.',
      'Automatic AI tagging across Research, Inspiration, Code, Quotes, and Notes.',
      'Local-first privacy with full-text search and Markdown/JSON export.',
    ],
    tags: ['Chrome Extension', 'AI Tagging', 'Local-First', 'Productivity'],
    image: '/assets/aistudio/SnapClipper_dc1f331f.webp',
    internalRoute: '/projects/snapclipper',
    externalUrl: 'https://chromewebstore.google.com/detail/snapclipper/eboikfkhaojmcbmpdcdbcblflncledmc',
    ctaLabel: 'Explore SnapClipper',
    featured: true,
  },
  {
    id: 'fiscal-compass',
    title: 'Fiscal Compass',
    subtitle: 'Privacy-Respecting Suite of Financial Calculators',
    category: 'Financial Tools / Data Visualization',
    filterGroup: 'FinTech',
    description:
      'Free financial calculators with no sign-up required. Make clearer decisions around loans, compounding investments, and retirement trajectories with local browser persistence.',
    features: [
      'Interactive compounding charts and amortization visualizations.',
      'Zero-account local browser persistence keeping user financials private.',
      'Comprehensive planning tools spanning mortgages, savings, and retirement.',
    ],
    tags: ['React', 'TypeScript', 'Data Visualization', 'FinTech'],
    image: '/assets/aistudio/FiscalCompass_38af56ab.webp',
    externalUrl: 'https://fiscalcompass.net',
    ctaLabel: 'Launch Fiscal Compass',
    featured: false,
  },
  {
    id: 'icon-forge',
    title: 'Icon Forge',
    subtitle: 'Precision SVG Icon Design & Export Studio',
    category: 'Design System / SVG Tooling',
    filterGroup: 'Design Tools',
    description:
      'Design custom icon packages with geometric precision. Create, customize, and export cohesive SVG icon sets engineered to match your brand design tokens.',
    features: [
      'Interactive vector customization with unified stroke and grid alignment.',
      'Organize and share team-wide icon collections cleanly.',
      'Multi-format production export optimized for web and mobile frameworks.',
    ],
    tags: ['SVG', 'React', 'Design Systems', 'UI Tooling'],
    image: '/assets/aistudio/IconForge_6b28609c.webp',
    externalUrl: 'https://iconforge.net',
    ctaLabel: 'Open Icon Forge',
    featured: false,
  },
  {
    id: 'ai-shortcut-series',
    title: 'The AI ShortCut Book Series',
    subtitle: 'Applied Prompt Playbooks & Wealth Guides on Amazon',
    category: 'Published Works / Amazon',
    filterGroup: 'Publications',
    description:
      'A practical collection of Amazon playbooks covering Real Estate, Small Business operations, Personal & Legal strategy, and beginner wealth building.',
    features: [
      'Over 600 battle-tested, domain-specific AI prompts across three playbooks.',
      'Companion beginner investing guide: Investing for the Rest of Us.',
      'Actionable workflows built by a 20+ year technology executive.',
    ],
    tags: ['Amazon Books', 'Prompt Systems', 'Strategy', 'Finance'],
    image: booksImg,
    internalRoute: '/blog',
    ctaLabel: 'Browse Library Shelf',
    featured: false,
  },
  {
    id: 'celeb-income',
    title: 'Celebrity Net Worth & Income Tracker',
    subtitle: 'Interactive Financial Comparison & Search Engine',
    category: 'Web Application / Search',
    filterGroup: 'Design Tools',
    description:
      'A fast, searchable comparison platform exploring verified career earnings, net worth benchmarks, and income trajectories across public figures.',
    features: [
      'Thousands of structured financial profiles with industry comparisons.',
      'Interactive side-by-side earnings analysis and visualization.',
    ],
    tags: ['React', 'Data Visualization', 'Search UX'],
    image: '/assets/aistudio/CelebrityNetWorthComparisonDashboard_7c9947b6.webp',
    externalUrl: 'https://celebincometracker.com/',
    ctaLabel: 'Visit Website',
    featured: false,
  },
];

export const BOOKS: BookItem[] = [
  {
    index: '01',
    category: 'Real Estate',
    title: 'The AI Shortcut: The Real Estate Playbook',
    subtitle: '200+ Expert Prompts to Help You Navigate the Real Estate Market',
    description:
      'Designed by a tech executive and creative strategist, these shortcuts turn AI into your personal marketing agency and transaction coordinator.',
    amazonUrl: 'https://www.amazon.com/dp/B0GPN7FKYW',
    coverImage: '/images/book-real-estate.webp',
  },
  {
    index: '02',
    category: 'Business',
    title: 'The AI Shortcut: Small Business Playbook',
    subtitle: '200+ Ready-to-Use Prompts That Save Owners 10 Hours a Week',
    description:
      '7 categories covering every function in your business from Marketing and Sales to Operations and HR.',
    amazonUrl: 'https://www.amazon.com/gp/product/B0GN94KGNT',
    coverImage: '/images/book-small-business.webp',
  },
  {
    index: '03',
    category: 'Legal / Personal',
    title: 'The AI Shortcut: The Divorce Playbook',
    subtitle: '200+ AI Prompts to Protect Yourself, Finances, and Kids',
    description:
      'Turn AI into your personal legal analyst—saving thousands in billable hours while navigating complex financial hurdles.',
    amazonUrl: 'https://www.amazon.com/gp/product/B0GNZ63Z1T',
    coverImage: '/images/book-divorce.webp',
  },
  {
    index: '04',
    category: 'Finance',
    title: 'Investing for the Rest of Us',
    subtitle: 'From Piggy Bank to Portfolio',
    description:
      'Your beginner-friendly guide to building wealth. Learn the magic of compound interest and how to construct a balanced portfolio.',
    amazonUrl: 'https://www.amazon.com/dp/B0DSVRCLKL',
    coverImage: investingBookCoverImg,
  },
];

export const AI_EXPLORATION_APPS = [
  {
    title: 'SnapClipper Chrome Extension',
    description:
      'AI-powered Chrome extension for highlighting, clipping, and auto-tagging web research, prompts, and code locally.',
    url: 'https://chromewebstore.google.com/detail/snapclipper/eboikfkhaojmcbmpdcdbcblflncledmc',
    tag: 'Chrome Extension',
    image: '/assets/aistudio/SnapClipper_dc1f331f.webp',
  },
  {
    title: 'Mobile Vibe Coding Tutorial',
    description:
      'Community guide walking builders step-by-step through shipping a full iOS application using AI-assisted workflows.',
    url: 'https://www.reddit.com/r/buildinpublic/comments/1qfhfqh/how_i_built_and_shipped_an_ios_app_using/',
    tag: 'iOS Workflow',
    image: '/assets/aistudio/Mobile_Vibe_Coding_Tutorial-2_53ea1d1c.webp',
  },
  {
    title: 'Microsoft License Feature Selector',
    description:
      'AI-powered decision utility helping organizations select optimal Microsoft licensing tiers at minimum cost.',
    url: 'https://mslicensemanager.netlify.app/',
    tag: 'Enterprise Utility',
    image: '/assets/aistudio/Microsoft_License_Selector_Dashboard-3_7a34688f.webp',
  },
  {
    title: 'Email to PDF Converter',
    description:
      'Precision tool converting bulk .eml email threads into clean, chronologically sorted PDF archives.',
    url: 'https://mailmergepdf.netlify.app/',
    tag: 'Document Utility',
    image: '/assets/aistudio/Email_to_PDF_Converter_Flow-1_3dd31a89.webp',
  },
  {
    title: 'MarkFlow',
    description:
      'Clean split-pane Markdown studio for creating, editing, and viewing documents with instant code (Markup), Split, and Formatted views plus local .md persistence.',
    url: 'https://markflowapp.netlify.app/',
    tag: 'Markdown Studio',
    image: '/assets/aistudio/markflow_app.webp',
  },
  {
    title: 'Creative AI Synthesis & Art',
    description:
      'Explorations across Replicate, Leonardo.ai, ElevenLabs, GPT Image, Nano Banana, and Veo models.',
    image: '/assets/aistudio/CreativeAI_Synthesis_b14b7b57.webp',
    tag: 'Multimodal AI',
  },
];

export interface AIVideoReel {
  id: string;
  channelKey: 'thrive' | 'personal';
  channelName: string;
  channelUrl: string;
  title: string;
  focus: string;
  modelLine: string;
}

export const AI_VIDEO_REELS: AIVideoReel[] = [
  {
    id: 'ARhSeig74Q8',
    channelKey: 'thrive',
    channelName: 'Thrive Financial (@ThriveFinancialLLC)',
    channelUrl: 'https://www.youtube.com/@ThriveFinancialLLC',
    title: 'Thrive Financial — Take Control of Your Finances During Divorce',
    focus: 'Product Marketing · Google Omni & Veo',
    modelLine: 'Google Veo & NotebookLM Production',
  },
  {
    id: 'klptl3vAbS8',
    channelKey: 'thrive',
    channelName: 'Thrive Financial (@ThriveFinancialLLC)',
    channelUrl: 'https://www.youtube.com/@ThriveFinancialLLC',
    title: 'Thrive Financial First-Time User Guide — From Records to Clarity',
    focus: 'Onboarding & Explainer · NotebookLM',
    modelLine: 'NotebookLM Explainer & Product Walkthrough',
  },
  {
    id: 'EhW2aDRKPEw',
    channelKey: 'thrive',
    channelName: 'Thrive Financial (@ThriveFinancialLLC)',
    channelUrl: 'https://www.youtube.com/@ThriveFinancialLLC',
    title: 'Forensic Guidance in Thrive Financial — Finding Financial Red Flags',
    focus: 'Feature Deep-Dive · Multimodal Video',
    modelLine: 'Google Omni & NotebookLM Storytelling',
  },
  {
    id: '3-dcxXtaLX0',
    channelKey: 'thrive',
    channelName: 'Thrive Financial (@ThriveFinancialLLC)',
    channelUrl: 'https://www.youtube.com/@ThriveFinancialLLC',
    title: 'Divorce Financial Analysis Software — Hidden Assets & Settlement',
    focus: 'Commercial Overview · AI Video',
    modelLine: 'Google Veo Motion Synthesis',
  },
  {
    id: 'UL3WBuHkAjU',
    channelKey: 'personal',
    channelName: 'Personal Studio (@crmcguire1974)',
    channelUrl: 'https://www.youtube.com/@crmcguire1974',
    title: 'Official Trailer — FuzzTown the Series',
    focus: 'Creative & Hobby Project · Google Omni & Veo',
    modelLine: 'Narrative Character & Scene Generation',
  },
  {
    id: 'tBkEzWZsmx4',
    channelKey: 'personal',
    channelName: 'Personal Studio (@crmcguire1974)',
    channelUrl: 'https://www.youtube.com/@crmcguire1974',
    title: 'Founder Story — Christopher R McGuire',
    focus: 'Executive Story & Voice Synthesis',
    modelLine: 'AI Video & Narrative Production',
  },
  {
    id: 'liaJMyXh7SU',
    channelKey: 'personal',
    channelName: 'Personal Studio (@crmcguire1974)',
    channelUrl: 'https://www.youtube.com/@crmcguire1974',
    title: 'SnapClipper — Capture. Organize. Remember.',
    focus: 'Product Launch Reel · Applied AI',
    modelLine: 'Multimodal Product Video',
  },
  {
    id: '1tkdcFvymOM',
    channelKey: 'personal',
    channelName: 'Personal Studio (@crmcguire1974)',
    channelUrl: 'https://www.youtube.com/@crmcguire1974',
    title: 'Christopher R McGuire — Leader of UX and UI Design & Development',
    focus: 'Executive Overview · Motion Reel',
    modelLine: 'Personal Brand Video Production',
  },
];

export interface VibeCodedAppItem {
  id: string;
  title: string;
  platform: string;
  description: string;
  highlights: string;
  image: string;
  internalRoute?: string;
  externalUrl: string;
  ctaLabel: string;
}

export const VIBE_CODED_APPS: VibeCodedAppItem[] = [
  {
    id: 'thrive-financial',
    title: 'Thrive Financial',
    platform: 'Web SaaS · Gemini 2.5 Flash · React & Firebase',
    description:
      'AI-powered forensic accounting and settlement modeling platform parsing multi-year bank and credit statements into structured property divisions and discrepancy alerts.',
    highlights: 'Backed by NotebookLM user-research synthesis and Google Omni/Veo launch videos.',
    image: '/assets/aistudio/ThriveFinancial_694601f5.webp',
    externalUrl: 'https://thrivefinancial.app',
    ctaLabel: 'Visit Thrive Financial',
  },
  {
    id: 'modus-ai',
    title: 'Modus AI',
    platform: 'iOS App · React Native / Expo · Spatial Vision',
    description:
      'Production iOS interior and exterior redesign app engineered with spatial constraints that lock existing room geometry, lighting, and furniture while transforming paint, finishes, or structural layouts.',
    highlights: 'Shipped end-to-end to the Apple App Store using AI-assisted mobile workflows.',
    image: '/assets/aistudio/Modus_AI_e260817c.webp',
    internalRoute: '/projects/modus-ai',
    externalUrl: 'https://apps.apple.com/us/app/modus-ai-interior-design-app/id6757023994',
    ctaLabel: 'Explore Case Study',
  },
  {
    id: 'tron-engaged',
    title: 'Tron Engaged',
    platform: 'WebXR · 3D & First-Person VR Arena Game',
    description:
      'Modernized 3D disc combat and light-cycle arena playable seamlessly in standard desktop browsers or first-person inside VR headsets via WebXR.',
    highlights: 'Vibe-coded spatial shaders, trail collision physics, and headset locomotion.',
    image: '/assets/aistudio/TronEngaged_a8a21c6c.webp',
    externalUrl: 'https://tronengaged.netlify.app/',
    ctaLabel: 'Launch VR & Web Game',
  },
  {
    id: 'nexora',
    title: 'Nexora: The Visual Workspace',
    platform: 'Web App · Vector Canvas · Local-First IndexedDB',
    description:
      'Browser-based diagramming studio spanning flowcharts, org charts, user journeys, sequence diagrams, system topologies, ERDs, and scaled architectural floorplans on one precision vector canvas.',
    highlights: 'Nine studios, five diagram themes, and portable .nexora files saved locally.',
    image: '/assets/aistudio/Nexora_VisualWorkspace_8268a7b5.webp',
    externalUrl: 'https://nexora.paguire.com',
    ctaLabel: 'Launch Nexora',
  },
  {
    id: 'snapclipper',
    title: 'SnapClipper',
    platform: 'Chrome Extension · Local-First AI Tagging',
    description:
      'One-click browser web clipper that captures highlights, code snippets, prompts, and research quotes with automatic local AI categorization and Markdown/JSON export.',
    highlights: 'Live on the Chrome Web Store with full local browser persistence.',
    image: '/assets/aistudio/SnapClipper_dc1f331f.webp',
    internalRoute: '/projects/snapclipper',
    externalUrl: 'https://chromewebstore.google.com/detail/snapclipper/eboikfkhaojmcbmpdcdbcblflncledmc',
    ctaLabel: 'View Architecture',
  },
  {
    id: 'email-to-pdf',
    title: 'Email to PDF Converter',
    platform: 'Web Utility · Bulk .eml Forensic Parser',
    description:
      'Rapid-built document utility converting bulk .eml email threads into clean, chronologically sorted, print-ready PDF archives for legal and business discovery.',
    highlights: 'Eliminates manual email compilation with instant browser-side sorting.',
    image: '/assets/aistudio/Email_to_PDF_Converter_Flow-1_3dd31a89.webp',
    externalUrl: 'https://mailmergepdf.netlify.app/',
    ctaLabel: 'Open Converter',
  },
];

