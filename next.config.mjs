import createMDX from '@next/mdx'

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    formats: ['image/webp'],
    remotePatterns: [],
  },
  experimental: {
    mdxRs: true,
  },
}

export default withMDX(nextConfig)
