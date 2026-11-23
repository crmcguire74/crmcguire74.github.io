import type { ArticleSummary } from '../utils/portfolioLogic';

export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  diagram?: {
    src: string;
    alt: string;
    caption: string;
  };
}

export interface FullArticle extends ArticleSummary {
  kicker: string;
  coverImage: string;
  coverAlt: string;
  sections: ArticleSection[];
}

export const ARTICLES: FullArticle[] = [
  {
    slug: 'why-fintech-companies-need-dedicated-ux-teams',
    title: "Why FinTech Companies Need Dedicated UX Teams (not 'a designer when we have time')",
    kicker: 'UX/UI Design · FinTech',
    date: 'March 6, 2026',
    readTime: '12 min read',
    excerpt:
      'Fintech UX drives revenue, retention, and regulatory compliance. A 20-year industry perspective on why dedicated UX teams outperform ad hoc design support.',
    categories: ['UX', 'Fintech', 'Design', 'Business'],
    coverImage: '/images/blog-fintech-safe.webp',
    coverAlt: 'Locked metal door representing trust and security in FinTech UX',
    sections: [
      {
        paragraphs: [
          'In FinTech, UX is not decoration. It is how trust gets built, how costly operational mistakes get prevented, and how product, engineering, and compliance stop working against each other.',
          'People outside fintech sometimes talk about UX as if it sits somewhere between branding and polish. Early in my time at Citadel, I watched analysts, portfolio managers, and traders work across six to eight monitors filled with applications that were supposed to support the same workflows. The problem was not just visual inconsistency—it was operational inconsistency.',
        ],
        diagram: {
          src: '/images/blog-dashboard-compare.webp',
          alt: 'Before and after comparison of a financial dashboard redesign',
          caption: 'Hierarchy-driven redesign reducing cognitive load across dense multi-pane financial interfaces.',
        },
      },
      {
        heading: 'The hidden operational tax of inconsistent software',
        paragraphs: [
          'When colors mean different things from application to application, context menus behave differently, and alerts compete blindly for attention, users have to pause, re-orient, and mentally translate the interface before doing actual financial work. In a consumer app, that is frustrating. In a high-speed institutional environment, it is risk.',
          'Pushing for a shared front-end foundation—common components, clear semantic color rules, reusable layouts, and codified project templates—cuts engineering overhead dramatically while raising operator confidence.',
        ],
      },
      {
        heading: 'Why ad hoc design support fails regulated products',
        paragraphs: [
          'Borrowing a designer for a sprint at the end of development produces surface styling over flawed workflows. Dedicated UX teams embed with compliance, engineering, and end users early enough to simplify multi-step approvals, clarify exception states, and eliminate silent ambiguity.',
        ],
        bullets: [
          'Establish a shared design system and semantic color vocabulary across every internal and client-facing surface.',
          'Validate dense financial workflows with real operators before locking backend schemas.',
          'Treat usability metrics—time-to-task, error recovery, and override frequency—as core product health indicators.',
        ],
      },
    ],
  },
  {
    slug: 'building-ai-products-with-ux-rigor',
    title: 'Building AI Products With UX Rigor',
    kicker: 'AI Product Development',
    date: 'February 28, 2026',
    readTime: '7 min read',
    excerpt:
      'AI products fail less from model quality and more from weak product framing. This framework keeps intent, UX, and engineering quality aligned from day one.',
    categories: ['AI', 'UX', 'Development'],
    coverImage: '/assets/aistudio/Exploring_AI_in_a_Walnut_Studio_1fb365fd.webp',
    coverAlt: 'Christopher R McGuire designing AI workflows across dual displays in a walnut studio',
    sections: [
      {
        paragraphs: [
          'AI capability alone does not create a great product. The teams that ship reliable AI experiences define a user outcome first, then design around confidence, feedback, and recovery paths.',
        ],
      },
      {
        heading: '1. Scope the job before the model',
        paragraphs: [
          'Start with a narrow, high-value use case. Write down the exact decision a user needs to make and where AI should accelerate that decision. If the outcome is unclear, raw model intelligence will not save the experience.',
        ],
      },
      {
        heading: '2. Design for uncertainty up front',
        paragraphs: [
          'Every AI output carries a confidence envelope. Thoughtful product UX communicates uncertainty clearly through provenance labels, optional explanations, and frictionless user controls to revise or override outputs.',
        ],
      },
      {
        heading: '3. Treat observability as a product feature',
        paragraphs: [
          'Track prompt quality, response acceptance rates, override frequency, and time to task completion. The fastest path to trustworthy AI is not maximum automation—it is controlled assistance paired with visible product accountability.',
        ],
        bullets: [
          'Define one measurable user outcome per AI feature.',
          'Ship human override and recovery controls in v1.',
          'Instrument acceptance and correction events from day one.',
          'Review real failure modes weekly alongside prompt and UI refinements.',
        ],
      },
    ],
  },
  {
    slug: 'designing-application-icons',
    title: 'Designing Application Icons: Tips and Tricks for Success',
    kicker: 'UX/UI Design · Visual Design',
    date: 'November 15, 2024',
    readTime: '10 min read',
    excerpt:
      'Explore expert tips and practical strategies for designing application icons that stand out across grid systems, metaphors, and production delivery.',
    categories: ['Design', 'UX'],
    coverImage: '/images/blog-icon-types.webp',
    coverAlt: 'Application icon styles from flat to skeuomorphic',
    sections: [
      {
        paragraphs: [
          'Application icons are often the first visual element users encounter. On a home screen, in an app store, or in a dock, the icon represents your entire product in a single compact frame.',
        ],
      },
      {
        heading: 'Types of icons and when to use them',
        paragraphs: [
          'Outlined icons use strokes to define shapes and feel crisp inside toolbars. Filled icons use solid geometry and excel in active or primary states. Flat and architectural icons rely on decisive silhouettes that remain legible at 16px as well as 512px.',
        ],
      },
      {
        heading: 'Visual language, grid discipline & Boolean geometry',
        paragraphs: [
          'Start with clear constraints: stroke weight, corner radius, base grid (24x24 or 32x32), and optical padding zones. Sketch metaphors rapidly on paper before moving into digital Boolean operations (union, subtract, intersect) to produce mathematically clean SVGs.',
        ],
      },
    ],
  },
  {
    slug: 'hidden-roi-of-uxui-design-in-internal-business-applications',
    title: 'The Hidden ROI of UX/UI Design in Internal Business Applications',
    kicker: 'UX/UI Design · Business Strategy',
    date: 'November 13, 2024',
    readTime: '12 min read',
    excerpt:
      'Internal tools rarely get the design attention they deserve. The cost shows up in lost productivity, higher training overhead, and employees fighting software daily.',
    categories: ['UX', 'Business', 'Design'],
    coverImage: '/images/blog-roi.webp',
    coverAlt: 'Business metrics and ROI improvements from UX design investment',
    sections: [
      {
        paragraphs: [
          'Internal business applications rarely receive the design investment granted to customer-facing products. The flawed assumption is simple: employees have to use these tools anyway.',
          'That logic ignores the compounding cost of friction—higher training overhead, elevated error rates, and spreadsheet workarounds built around failing software.',
        ],
      },
      {
        heading: 'The measurable cost of poor internal UX',
        paragraphs: [
          'Research from Harvard Business Review found that employees lose hours each week navigating clunky internal tools, while Forrester documented 40–60% higher training time and 30–50% higher support volume when usability is neglected.',
        ],
      },
      {
        heading: 'Employee experience is user experience',
        paragraphs: [
          'When every internal platform shares a coherent component library, predictable navigation, and consistent visual language, teams spend less time deciphering interfaces and zero time inventing risky shadow-IT spreadsheets.',
        ],
      },
    ],
  },
  {
    slug: 'mastering-uiux-design-in-modern-application-development',
    title: 'Mastering UI/UX Design in Modern Application Development',
    kicker: 'UX/UI Design · Product Development',
    date: 'November 13, 2024',
    readTime: '15 min read',
    excerpt:
      'Modern application development demands design that is research-driven, systematized, and tested with real users across the full product lifecycle.',
    categories: ['UX', 'Design', 'Development'],
    coverImage: '/assets/aistudio/ChristopherWorkingWithTradingApps.webp',
    coverAlt: 'Christopher R McGuire working across dual high-density financial chart displays at a Chicago workstation',
    sections: [
      {
        paragraphs: [
          'Modern application development demands design that goes far beyond surface styling. It requires a disciplined lifecycle: user research, structured prototyping, codified design systems, and iterative user validation.',
        ],
      },
      {
        heading: 'Research before pixels',
        paragraphs: [
          'Contextual inquiry, workflow observation, and journey mapping uncover what users actually struggle with rather than relying on speculative feature wishlists.',
        ],
      },
      {
        heading: 'Prototyping & Design Systems',
        paragraphs: [
          'Interactive prototypes validate assumptions in days rather than burning engineering sprints. Once validated, tokens and coded component libraries ensure consistency and immediate feedback loops across every release.',
        ],
      },
    ],
  },
  {
    slug: 'custom-icons-and-user-interface-design-tips',
    title: 'Custom Icons and User Interface Design Tips and Methods',
    kicker: 'UX/UI Design · Iconography',
    date: 'November 9, 2024',
    readTime: '10 min read',
    excerpt:
      'Elevate your digital product with custom iconography that reinforces brand identity, improves scanability, and maintains stroke harmony at every scale.',
    categories: ['Design', 'UX'],
    coverImage: '/images/blog-custom-icons.webp',
    coverAlt: 'Collection of custom-designed interface icons',
    sections: [
      {
        paragraphs: [
          'Icons are among the smallest elements in an interface and among the most influential. While off-the-shelf icon packs accelerate early prototypes, custom icons give mature products a distinct visual voice aligned to brand geometry.',
        ],
      },
      {
        heading: 'Clarity, simplicity, and token discipline',
        paragraphs: [
          'Every custom set should share consistent stroke weight, corner radii, optical sizing, and semantic naming conventions ("arrow-right" rather than visual descriptors) so designers and engineers collaborate without friction.',
        ],
      },
    ],
  },
  {
    slug: 'user-interface-design-for-web-applications',
    title: 'User Interface Design for Web Applications | Best Practices',
    kicker: 'UX/UI Design · Web Development',
    date: 'November 8, 2024',
    readTime: '14 min read',
    excerpt:
      'Discover essential best practices for web application UI design—combining visual hierarchy, responsive patterns, accessibility, and frontend speed.',
    categories: ['UX', 'Design', 'Development'],
    coverImage: '/images/blog-web-ui.webp',
    coverAlt: 'Modular web application UI hierarchy and layout system with highlighted primary action focus',
    sections: [
      {
        paragraphs: [
          'User interface design for web applications is not decoration—it is the functional layer between people and the complex systems they depend on.',
        ],
      },
      {
        heading: 'Visual hierarchy and Gestalt structure',
        paragraphs: [
          'Scale, weight, contrast, proximity, and alignment guide attention intentionally. Users completing real tasks rely on predictable navigation, clean progressive disclosure, and mobile-first responsive clarity.',
        ],
      },
      {
        heading: 'Color as functional signal',
        paragraphs: [
          'Restrain high-saturation accents for primary actions and semantic states so users immediately distinguish interactive triggers from passive data.',
        ],
      },
    ],
  },
  {
    slug: 'job-titles-software-engineering',
    title: 'The Impact of Job Titles in Software Engineering: Pitfalls and Solutions',
    kicker: 'Career · Engineering Management',
    date: 'April 12, 2023',
    readTime: '8 min read',
    excerpt:
      'Job titles shape careers, compensation benchmarks, and hiring pipelines. When treated as an afterthought, ambiguity compounds across the organization.',
    categories: ['Career', 'Business'],
    coverImage: '/images/blog-job-titles.webp',
    coverAlt: 'Architectural stepped columns along dual glowing tracks representing transparent engineering career ladders',
    sections: [
      {
        paragraphs: [
          'Job titles in software engineering carry more operational weight than most managers realize. They govern recruiting pipelines, compensation calibration, career mobility, and cross-functional authority.',
        ],
      },
      {
        heading: 'Generic titles obscure real specialization',
        paragraphs: [
          'Flattening every role under generic "Software Engineer" labels hides critical specialization in frontend architecture, design systems, or distributed backend systems—creating friction in hiring and retention.',
        ],
      },
      {
        heading: 'Building transparent engineering ladders',
        paragraphs: [
          'Clear leveling coupled with explicit domain tracks gives engineers visible growth trajectories while helping teams staff balanced capabilities intentionally.',
        ],
      },
    ],
  },
  {
    slug: 'mythical-full-stack-developer',
    title: "The Mythical 'Full Stack' Developer",
    kicker: 'Career · Engineering Leadership',
    date: 'February 22, 2023',
    readTime: '5 min read',
    excerpt:
      'The full stack unicorn is often a recruiting shortcut that dilutes quality on both ends. Strong products emerge from deep specialists collaborating across clean contracts.',
    categories: ['Career', 'Development'],
    coverImage: '/images/blog-fullstack.webp',
    coverAlt: 'Layered frontend glass monolith and steel backend lattice connected across a glowing API bridge',
    sections: [
      {
        paragraphs: [
          'The software industry frequently treats the "full stack developer" as a universal headcount shortcut. In practice, deep backend engineering and deep frontend UX engineering activate fundamentally different crafts.',
        ],
      },
      {
        heading: 'Specialists build stronger systems',
        paragraphs: [
          'Cross-functional awareness is invaluable—frontend engineers should understand API design, and backend engineers should respect rendering latency. Yet pairing true specialists at clean API contracts consistently ships higher quality faster.',
        ],
      },
    ],
  },
  {
    slug: 'frontend-development',
    title: "Frontend Development: Not Just About a 'Pretty' Website",
    kicker: 'Software Engineering · Frontend',
    date: 'December 28, 2022',
    readTime: '11 min read',
    excerpt:
      'Frontend engineering is the software discipline connecting users to your product—governing state, accessibility, performance, and component architecture.',
    categories: ['Development', 'UX'],
    coverImage: '/images/blog-frontend.webp',
    coverAlt: 'Layered frosted-glass UI wireframe panels and cyan component telemetry waveforms',
    sections: [
      {
        paragraphs: [
          'Frontend development is often mistakenly reduced to visual styling. In reality, every form, state transition, data grid, loading state, and error recovery flow passes through frontend engineering.',
        ],
      },
      {
        heading: 'Component architecture is software architecture',
        paragraphs: [
          'Type safety, render performance, Core Web Vitals, accessibility compliance, and coded design systems directly determine conversion rates, regulatory safety, and long-term engineering velocity.',
        ],
      },
    ],
  },
];
