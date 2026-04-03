export interface Project {
  slug: string
  title: string
  description: string
  year: number
  categories: string[]
  thumbnail: string
  heroImage: string
  client?: string
  featured: boolean
  order: number
  overview: string
}

export const projects: Project[] = [
  {
    slug: 'nestle-rebrand',
    title: 'Nestlé Rebrand',
    description: 'Visual identity system redesign for a heritage brand — balancing legacy equity with contemporary expression.',
    year: 2024,
    categories: ['Brand Identity', 'Visual System'],
    // Replace with .webp paths once assets are ready
    thumbnail: '/images/thumbnails/nestle-rebrand.svg',
    heroImage: '/images/projects/nestle-rebrand-hero.svg',
    client: 'Nestlé',
    featured: true,
    order: 1,
    overview: 'A comprehensive visual identity redesign exploring how a 150-year-old brand can feel contemporary without abandoning its heritage. The project involved deep research into brand archaeology, competitive landscape analysis, and system design across print, digital, and environmental touchpoints.',
  },
  {
    slug: 'maze-that-listens',
    title: 'The Maze That Listens',
    description: 'Spatial horror experience in VR — designed around absence, acoustic dread, and the architecture of fear.',
    year: 2024,
    categories: ['Spatial Design', 'VR', 'Unity'],
    thumbnail: '/images/thumbnails/maze-that-listens.svg',
    heroImage: '/images/projects/maze-that-listens-hero.svg',
    featured: true,
    order: 2,
    overview: 'A VR horror experience built in Unity exploring spatial design as an emotional medium. The maze uses architecture, sound design, and negative space to generate dread — the horror is the environment itself, not jump scares or monsters. Designed for the Meta Quest 2.',
  },
  {
    slug: 'union-budget-dataviz',
    title: 'Union Budget Dataviz',
    description: "Editorial data visualization of India's Union Budget 2024 — making dense fiscal data legible and compelling.",
    year: 2024,
    categories: ['Data Visualization', 'Editorial', 'D3.js'],
    thumbnail: '/images/thumbnails/union-budget-dataviz.svg',
    heroImage: '/images/projects/union-budget-dataviz-hero.svg',
    featured: true,
    order: 3,
    overview: "An editorial data visualization project translating India's Union Budget 2024 into a readable, explorable visual narrative. Built with D3.js and custom SVG rendering, the project makes budget allocation, sectoral spending, and year-over-year changes accessible to a general audience.",
  },
  {
    slug: 'erudio',
    title: 'Erudio',
    description: '55-screen UX design for an edtech platform — from concept to high-fidelity MVP in 8 weeks.',
    year: 2023,
    categories: ['UX Design', 'Product Design'],
    thumbnail: '/images/thumbnails/erudio.svg',
    heroImage: '/images/projects/erudio-hero.svg',
    client: 'Erudio',
    featured: true,
    order: 4,
    overview: 'End-to-end UX design for an edtech startup building personalized learning experiences. The project spanned user research, information architecture, interaction design, and high-fidelity prototyping across 55 screens — covering the full learning journey from onboarding to course completion.',
  },
]

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order)

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export function getNextProject(currentSlug: string): Project {
  const sorted = [...projects].sort((a, b) => a.order - b.order)
  const idx = sorted.findIndex((p) => p.slug === currentSlug)
  return sorted[(idx + 1) % sorted.length]
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug)
}
