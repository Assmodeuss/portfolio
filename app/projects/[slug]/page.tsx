import { notFound } from "next/navigation"
import { projects } from "@/data/projects"
import ProjectLayout from "@/components/ProjectLayout"

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Pratyush`,
    description: project.description,
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return notFound()

  return <ProjectLayout project={project} />
}
