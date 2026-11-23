const connecticutImg = '/assets/images/bio_connecticut_origins_1795447727858.webp';
const theatreImg = '/assets/images/bio_warner_theatre_stage_1794786145696.webp';
const purdueImg = '/assets/images/bio_purdue_engineering_1794786146083.webp';
const chicagoSkylineImg = '/assets/images/bio_chicago_skyline_night_1794786145929.webp';
const citadelChicagoImg = '/assets/images/bio_citadel_chicago_facade.webp';
const familyWarmthImg = '/assets/images/bio_family_warmth_gold_canopy_1794786163183.webp';
const quietRainImg = '/assets/images/bio_quiet_rain_restraint_1794786147394.webp';
const chicagoHomeDawnImg = '/assets/images/bio_lincoln_square_chicago.webp';
const futureHorizonImg = '/assets/images/bio_future_horizon_ai_1794786148411.webp';

export type ChapterMood = 'warm' | 'spotlight' | 'architectural' | 'restrained' | 'future';
export type BiographyEra = 'origins' | 'chicago-fintech' | 'family-endurance' | 'renewal-ai';

export interface BiographyChapter {
  id: string;
  index: string;
  year: string;
  shortYear: string;
  kicker: string;
  headline: string;
  location: string;
  narrative: string;
  image: string;
  imageAlt: string;
  mood: ChapterMood;
  era: BiographyEra;
  align: 'left' | 'right';
}

export const BIOGRAPHY_HERO = {
  eyebrow: 'Life Biography · 1974 – Beyond',
  headline: '52 years. Countless chapters. One evolving story.',
  lead: 'From a small town in Connecticut to the forefront of financial technology, my journey has been shaped by creativity, family, ambition, adversity, and the determination to keep building.',
};

export const BIOGRAPHY_ERAS: { id: BiographyEra; label: string; targetId: string }[] = [
  { id: 'origins', label: '1974–1996 · Origins & Stage', targetId: 'bio-1974' },
  { id: 'chicago-fintech', label: '1996–2023 · Chicago & FinTech', targetId: 'bio-1996' },
  { id: 'family-endurance', label: '2005–2024 · Family & Endurance', targetId: 'bio-2005-family' },
  { id: 'renewal-ai', label: '2024–Beyond · Savant Wealth & AI', targetId: 'bio-2024' },
];

export const BIOGRAPHY_CHAPTERS: BiographyChapter[] = [
  {
    id: 'bio-1974',
    index: '01',
    year: '1974',
    shortYear: '1974',
    kicker: 'Where it all began',
    headline: 'Born in Connecticut',
    location: '83 Pleasant View Ave, Oakville & Torrington, CT',
    narrative:
      'I was born on August 24, 1974, as Christopher Robert Patrick. I grew up at 83 Pleasant View Avenue in Oakville, Connecticut—attending Griffin School before moving to Torrington, where I attended Vogel School and Torrington High School. Those New England hillsides, family roots, and early creative freedom forged my independence.',
    image: connecticutImg,
    imageAlt: 'New England hillside avenue in Oakville and Litchfield County Connecticut beneath autumn maples',
    mood: 'warm',
    era: 'origins',
    align: 'left',
  },
  {
    id: 'bio-1984',
    index: '02',
    year: '1984–1992',
    shortYear: '1984',
    kicker: 'Finding my voice',
    headline: 'The stage, creativity, and independence',
    location: 'Historic Warner Theatre · Torrington, CT',
    narrative:
      "My parents divorced when I was young. I started working at 14 and discovered a passion for musical theatre, performing regularly at Torrington's historic Warner Theatre. Theatre taught me confidence, collaboration, and the power of storytelling.",
    image: theatreImg,
    imageAlt: 'Historic 1930s art-deco theatre auditorium with warm stage spotlights',
    mood: 'spotlight',
    era: 'origins',
    align: 'right',
  },
  {
    id: 'bio-1992',
    index: '03',
    year: '1992–1996',
    shortYear: '1992',
    kicker: 'Engineering my future',
    headline: 'Purdue University',
    location: 'West Lafayette, Indiana · Theta Tau · B.S. CompE & EE',
    narrative:
      'I attended Purdue University, double-majoring in Computer and Electrical Engineering while paying my own way through college. I joined the Theta Tau engineering fraternity—building lifelong friendships that endure to this day—and graduated in December 1996, ready to turn my curiosity into a career.',
    image: purdueImg,
    imageAlt: 'Red-brick university engineering courtyard illuminated at twilight',
    mood: 'architectural',
    era: 'origins',
    align: 'left',
  },
  {
    id: 'bio-1996',
    index: '04',
    year: '1996–2005',
    shortYear: '1996',
    kicker: 'A new city, a new career',
    headline: 'Building a life in Chicago',
    location: 'Chicago, Illinois · Motorola & GE Healthcare',
    narrative:
      'After graduation, I moved to Chicago and began my professional career. Working at Motorola and GE Healthcare, I developed a foundation in software engineering and discovered my interest in combining technology with thoughtful design.',
    image: chicagoSkylineImg,
    imageAlt: 'Downtown Chicago skyline and bridges reflecting on the river at blue hour',
    mood: 'architectural',
    era: 'chicago-fintech',
    align: 'right',
  },
  {
    id: 'bio-2005-citadel',
    index: '05',
    year: '2005–2019',
    shortYear: '2005',
    kicker: 'Building something bigger',
    headline: 'Fourteen years at Citadel',
    location: 'Citadel Center · Chicago Loop · Global Engineering & UX',
    narrative:
      'I joined Citadel in 2005 and grew from software engineer to engineering director. Inside Citadel Center on Dearborn Street, I pioneered user-centered application design, built global engineering teams, and helped transform how institutional financial technology was designed and developed.',
    image: citadelChicagoImg,
    imageAlt: 'Brushed stainless steel facade and embossed Citadel logo at Citadel Center in Chicago',
    mood: 'architectural',
    era: 'chicago-fintech',
    align: 'left',
  },
  {
    id: 'bio-2005-family',
    index: '06',
    year: '2005–2015',
    shortYear: '2009',
    kicker: 'Building a family',
    headline: 'Love, commitment, and parenthood',
    location: 'Julia (2009) & Hayden (2012) · Marriage (2015)',
    narrative:
      'I celebrated my first commitment ceremony in 2005. In 2009, I became a father when we adopted Julia, followed by Hayden in 2012. We entered a civil union in 2011 and married in 2015. Becoming a dad changed my priorities and gave my life an entirely new purpose.',
    image: familyWarmthImg,
    imageAlt: 'Warm sunlit golden oak pathway representing family warmth and parenthood',
    mood: 'warm',
    era: 'family-endurance',
    align: 'right',
  },
  {
    id: 'bio-2016',
    index: '07',
    year: '2016–2019',
    shortYear: '2016',
    kicker: 'Leading beyond the organization',
    headline: 'Innovation and open-source leadership',
    location: 'OpenFin Technical Advisory Board · FINOS Chair',
    narrative:
      'Alongside my work at Citadel, I helped advance collaboration in financial technology through the OpenFin Technical Advisory Board and as a founding member and chairman of the FINOS foundation.',
    image: '/assets/aistudio/Christopher_Building_a_Web_App_39016f52.webp',
    imageAlt: 'Christopher R McGuire building modern financial web architecture and open-source interface systems',
    mood: 'architectural',
    era: 'chicago-fintech',
    align: 'left',
  },
  {
    id: 'bio-2019',
    index: '08',
    year: '2019–2023',
    shortYear: '2019',
    kicker: 'New challenges and leadership',
    headline: 'SpiderRock and Akuna Capital',
    location: 'Chicago Options Markets · Design & Engineering',
    narrative:
      'I moved into senior product and engineering leadership roles at SpiderRock and Akuna Capital, bringing together software architecture, design systems, user experience, and high-performing teams.',
    image: '/assets/aistudio/ChristopherWorkingWithTradingApps.webp',
    imageAlt: 'Christopher R McGuire analyzing options order book and trading charts at a multi-monitor desk in Chicago',
    mood: 'architectural',
    era: 'chicago-fintech',
    align: 'right',
  },
  {
    id: 'bio-2020',
    index: '09',
    year: '2020–2024',
    shortYear: '2020',
    kicker: 'Crucible & creation',
    headline: 'Separation, divorce, and the birth of Thrive Financial',
    location: 'Resilience · Protecting Family · Forensic Clarity',
    narrative:
      'In October 2020, I separated from my husband after years of escalating emotional, financial, and physical abuse—entering nearly four years of contentious divorce proceedings and steep financial losses while fighting to protect my children. Out of that crucible, sorting through years of opaque statements by hand, the Thrive Financial concept and designs were born: turning lived adversity into forensic software that brings financial transparency and leverage to others.',
    image: quietRainImg,
    imageAlt: 'Quiet steel-grey dusk water seen through rain-speckled glass',
    mood: 'restrained',
    era: 'family-endurance',
    align: 'left',
  },
  {
    id: 'bio-2024',
    index: '10',
    year: '2024–2025',
    shortYear: '2024',
    kicker: 'Rebuilding from the ground up',
    headline: 'Leadership, loss, and a new beginning',
    location: 'Mesirow SVP · 2605 W Carmen Ave, Lincoln Square, Chicago',
    narrative:
      'In May 2024, I became Senior Vice President and Head of Application Design and Development at Mesirow. My divorce was finalized that August. In April 2025, I sold our longtime family home and purchased a new home at 2605 W Carmen Ave in Chicago’s Lincoln Square neighborhood, beginning another chapter with Julia and Hayden.',
    image: chicagoHomeDawnImg,
    imageAlt: 'Lincoln Square archway and red-brick Chicago neighborhood streetscape near 2605 W Carmen Ave',
    mood: 'warm',
    era: 'renewal-ai',
    align: 'right',
  },
  {
    id: 'bio-2025',
    index: '11',
    year: '2025–2026',
    shortYear: '2025',
    kicker: 'Turning experience into innovation',
    headline: 'Creating with purpose',
    location: 'AI Software · Thrive Financial · Modus AI',
    narrative:
      'I began channeling decades of engineering experience and my personal financial challenges into independent software products. My work expanded into AI-powered development, financial technology, and tools designed to make complicated problems easier to understand and manage.',
    image: '/assets/aistudio/Exploring_AI_in_a_Walnut_Studio_1fb365fd.webp',
    imageAlt: 'Christopher R McGuire building AI-powered workflows across dual displays in his studio',
    mood: 'future',
    era: 'renewal-ai',
    align: 'left',
  },
  {
    id: 'bio-2026',
    index: '12',
    year: '2026–Beyond',
    shortYear: '2026+',
    kicker: 'The next frontier',
    headline: 'Director of WiseOS at Savant Wealth',
    location: 'Savant Wealth · Chicago, IL · WiseOS AI Platform',
    narrative:
      'In 2026, I moved to Savant Wealth as the Director of WiseOS, leading an AI-powered platform architected to support the entire advisor workflow—uniting disparate tools, client transcript intelligence, and human-centered design under one roof while raising Julia and Hayden in Chicago.',
    image: futureHorizonImg,
    imageAlt: 'Expansive architectural digital horizon lit with electric blue forward pathways',
    mood: 'future',
    era: 'renewal-ai',
    align: 'right',
  },
];
