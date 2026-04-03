import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getAllSlugs, getNextProject } from '@/lib/projects'
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return {}

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.heroImage }],
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  const nextProject = getNextProject(slug)

  // Dynamically import MDX content
  let MDXContent: React.ComponentType | null = null
  try {
    const mdxModule = await import(`@/content/projects/${slug}.mdx`)
    MDXContent = mdxModule.default
  } catch {
    // MDX file not found — render without body content
  }

  return (
    <CaseStudyLayout project={project} nextProject={nextProject}>
      {MDXContent ? <MDXContent /> : null}
    </CaseStudyLayout>
  )
}
