import { Car, Code, Smartphone, ShieldCheck, Video } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ---- Edit your public details here ---- */
export const CONTACT = {
  email: 'suryacsengineer06@gmail.com',
  github: 'https://github.com/surya-167',
  linkedin: 'https://www.linkedin.com/in/s-surya-43063030b/',
}

export const NAV_LINKS = [
  { href: '#services', label: 'Services', mobile: 'Services & Pricing' },
  { href: '#skills', label: 'Skills', mobile: 'Technical Skills' },
  { href: '#experience', label: 'Experience', mobile: 'Experience' },
  { href: '#projects', label: 'Projects', mobile: 'Projects' },
  { href: '#sample-project', label: 'Demo Site', mobile: 'Sample Project' },
]

export const STATS = [
  { to: 1.5, decimals: 1, suffix: '+', label: 'Years Experience' },
  { to: 35, decimals: 0, suffix: '%', label: 'Latency Reduced' },
  { to: 99.99, decimals: 2, suffix: '%', label: 'Payment Uptime' },
  { to: 24, decimals: 0, suffix: 'h', label: 'Reply Time' },
]

export const SERVICE_OPTIONS = [
  'Website (₹5,000 - ₹8,000)',
  'Mobile App (₹15,000 - ₹20,000)',
  'Full Web + Mobile Package',
  'Other / Custom Requirement',
]
export const SERVICE_OPTION_LABELS: Record<string, string> = {
  'Website (₹5,000 - ₹8,000)': 'Website Offer (₹5,000 – ₹8,000)',
  'Mobile App (₹15,000 - ₹20,000)': 'Mobile Application Offer (₹15,000 – ₹20,000)',
  'Full Web + Mobile Package': 'Full Package (Web + Mobile App)',
  'Other / Custom Requirement': 'Other / Custom Requirement',
}

type Accent = {
  iconBox: string
  price: string
  check: string
  cta: string
}

export const ACCENTS: Record<'cyan' | 'indigo' | 'purple', Accent> = {
  cyan: {
    iconBox: 'bg-cyan-500/10 border-cyan-500/25 text-cyan-400',
    price: 'text-cyan-400',
    check: 'text-cyan-400',
    cta: 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950',
  },
  indigo: {
    iconBox: 'bg-indigo-500/10 border-indigo-500/25 text-indigo-400',
    price: 'text-indigo-400',
    check: 'text-indigo-400',
    cta: 'border-indigo-500/40 text-indigo-400 hover:bg-indigo-500 hover:text-slate-950',
  },
  purple: {
    iconBox: 'bg-purple-500/10 border-purple-500/25 text-purple-400',
    price: 'text-purple-400',
    check: 'text-purple-400',
    cta: 'border-purple-500/40 text-purple-400 hover:bg-purple-500 hover:text-slate-950',
  },
}

export const SERVICES: {
  icon: LucideIcon
  accent: keyof typeof ACCENTS
  title: string
  price: string
  description: string
  features: string[]
  cta: string
  service: string
  side: 'left' | 'right'
}[] = [
  {
    icon: Code,
    accent: 'cyan',
    title: 'Web Application Offer',
    price: '₹5,000 – ₹8,000',
    description:
      'High-performance responsive websites, REST/GraphQL integrations, microservice architecture, and Cloudflare Pages deployment.',
    features: [
      'Responsive UI/UX Design & Frontend Prototyping',
      'React.js, Node.js, or Spring Boot Backend',
      'Relational Database Setup (PostgreSQL / MySQL)',
      'Testing, Optimization & Cloudflare Deployment',
    ],
    cta: 'Request Web Service',
    service: SERVICE_OPTIONS[0],
    side: 'left',
  },
  {
    icon: Smartphone,
    accent: 'indigo',
    title: 'Mobile Application Offer',
    price: '₹15,000 – ₹20,000',
    description:
      'Cross-platform mobile applications for iOS & Android with Flutter, backed by serverless cloud backends and real-time synchronization.',
    features: [
      'Flutter Cross-Platform Development (iOS/Android)',
      'Real-time WebSockets, Maps SDK & GPS Integration',
      'API Integration & Supabase / AWS Cloud Setup',
      'Complete App Testing, Debugging & Deployment',
    ],
    cta: 'Request Mobile Service',
    service: SERVICE_OPTIONS[1],
    side: 'right',
  },
]

export const SKILLS = [
  'Java / Spring Boot',
  'Node.js / Express.js',
  'React.js / Next.js',
  'Flutter / Dart',
  'TypeScript / ES6+',
  'AWS Services & Lambda',
  'PostgreSQL / MySQL',
  'Docker & Terraform',
  'WebSockets / WebRTC',
  'GraphQL / REST APIs',
  'Supabase Integrations',
  'Jest / JUnit Testing',
]

export const EXPERIENCE = [
  {
    role: 'Software Developer – Full Stack',
    company: 'Deutsche Roboter Systeme Pvt. Ltd. | Chennai, India',
    period: 'December 2024 – April 2026',
    points: [
      'Built microservices in Java/Spring Boot and Flutter mobile apps for a ride-hailing platform.',
      'Reduced ride-dispatch latency by 35% using real-time GPS tracking (Google Maps SDK) and WebSockets.',
      'Sustained a 99.99% payment transaction success rate on a financial application with AES-256 encryption & JWT.',
      'Optimized PostgreSQL/MySQL queries and index structures, improving API response times by 40%.',
    ],
  },
]

export const PROJECTS: {
  icon: LucideIcon
  color: string
  title: string
  stack: string
  description: string
  wide?: boolean
}[] = [
  {
    icon: Car,
    color: 'text-cyan-400',
    title: 'Ride-Hailing Platform',
    stack: 'Java · Spring Boot · Flutter · MySQL · AWS EC2/RDS · WebSockets · Docker',
    description:
      'Real-time ride matching system utilizing Spring Boot microservices, AWS SQS event handling, and Flutter mobile interfaces.',
  },
  {
    icon: ShieldCheck,
    color: 'text-indigo-400',
    title: 'Financial Gateway',
    stack: 'Java · React.js · Express · AWS Lambda · API Gateway · Terraform',
    description:
      'Serverless financial transaction gateway featuring JWT auth, automated ledger operations, and Terraform multi-environment provisioning.',
  },
  {
    icon: Video,
    color: 'text-purple-400',
    title: 'Video Suite',
    stack: 'Node.js · TypeScript · Spring Boot · WebRTC · AWS EC2 · Jest',
    description:
      'Peer-to-peer real-time video communication hub engineered with WebSockets signaling and a Node.js RESTful API.',
    wide: true,
  },
]

export const SAMPLE_PROJECT = {
  name: 'NexaFlow — Business Website',
  route: '/business_model',
  summary:
    'A complete, animated business website I built as a sample for clients: hero, services, work showcase, testimonials, and a working enquiry form that stores leads in a database and opens WhatsApp in one tap.',
  stack: ['React', 'TypeScript', 'Vite', 'Framer Motion', 'Supabase', 'Cloudflare Pages'],
  highlights: [
    'Mobile-first responsive layout with scroll animations',
    'Lead capture form wired to Supabase + WhatsApp chat button',
    'SEO-ready: page metadata, sitemap and robots.txt',
    'Deployed on Cloudflare Pages with GitHub CI/CD',
  ],
}
