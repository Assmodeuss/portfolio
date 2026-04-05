export type ContentSection =
  | { type: "text"; heading: string; body: string }
  | { type: "figure"; src: string; alt: string }
  | { type: "blockquote"; quote: string }
  | { type: "image-grid"; images: { src: string; alt: string }[] }

export interface ProjectData {
  slug: string
  title: string
  description: string
  year: string
  client: string
  categories: string
  role: string
  heroImage: string
  content: {
    overview: string[]
    sections: ContentSection[]
  }
  nextProject?: {
    slug: string
    title: string
  }
}

export const projects: ProjectData[] = [
  {
    slug: "nestle-rebrand",
    title: "Nestlé Rebrand",
    description: "Global brand evolution for a digital-first generation.",
    year: "2024",
    client: "Nestlé S.A.",
    categories: "Brand Identity · Visual System",
    role: "Lead Designer",
    heroImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDqOr1ZoTT42SZtXpD1_290Xyl8Q0JbvQ5Rt3UmcpRX2PzXA8bMn5zzaX1gfHl0FX84T6VGshbY9Bk9LLINuMxwV7ohIyW9DLcIRc0vE1AOOeCN8Mcy8fVnriCTF-Ok_0Ya3cyiBn3a54gvq7dr2B0-4CoOwD4XYlLDweCghYNfekCu0HZQxluE_aTXlI1LK1mx3yqCRE8Gt--LiUnxhsRn9DxSnbi44b8F82B9S5yOTu7-XkrA5ra98tRVrmlQqJKYUIW7EAcg8tE",
    content: {
      overview: [
        "The challenge was to evolve a global legacy brand for a digital-first generation without losing its century-old heritage. We focused on the concept of Nutritional Warmth, translating it into a modular visual system that scales from microscopic digital icons to massive industrial architecture.",
        "By stripping away decorative elements and focusing on pure geometry and a revised color palette centered on Nocturnal Blue and Vitality Violet, we created a system that feels both authoritative and accessible.",
      ],
      sections: [
        {
          type: "text",
          heading: "The Foundation",
          body: "The core of the rebrand was the refinement of the iconic bird's nest. We simplified the strokes to ensure legibility at small scale while increasing the stroke weight to maintain presence on physical packaging. This was not about changing the logo, but about optimizing it for a high-frequency digital environment.",
        },
        {
          type: "figure",
          src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZXAHUPW6HZYPui1YPr7ub95PmlmAOOHXwGo2qqjKqzn-SkLiBLIAAXp4ViD4MYW2NHrbBMeZEG9A7sYGGk2xbrgMIc7GtWI_BEIzkip_K_urwsP5FQNz_YWQMre1tfeiTAJuwBqgCjadrkNEdJRR8p7qdpY7sO82gwQgH7N6rmPtRrlrQiAaaa0P50eh5xHw72ncekCMBxNzS9sk2lbnkE80yxlN1tsWgLBitM0nn5D9GZ4IT3GEqrOMAiu9XGrOQJ9Hxbayegys",
          alt: "Brand Guidelines Detail",
        },
        {
          type: "blockquote",
          quote:
            "Design is the bridge between corporate intent and human experience. For Nestlé, that bridge needed to be invisible yet indestructible.",
        },
        {
          type: "text",
          heading: "Systemic Flexibility",
          body: "We developed a custom typeface, 'Nestlé Editorial,' which balances the technical precision of a neo-grotesque with the warmth of traditional humanist details. This allows the brand to speak with a single voice across dairy, coffee, and nutrition segments.",
        },
        {
          type: "image-grid",
          images: [
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvyZcxsBjOadF9URyVDQ3f_FBS2pwZrOJ_xMNW20xHNQGnwwWtOvp04rJvpD8qFXu0Z7xejz1Id94CbvonO5r1ax_-6u8aN_Txl02mEoSF5-0o-etABRbEecB_i9rkPUosrs2mKLYr7Wzpj9uVEkb71OO157qj-qNmFoum7CZr0XayW1IjiFylj3pF5-l5ClNZkk12sJOtgDQuZs4OlsCZnLVAUa0LJ9jgnRwjcX3I8vSNiA70BMQRa_eI4qXhXfdT5w3EMiYjlYI",
              alt: "Packaging mockups",
            },
            {
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJS-z2XdrLtecq1OdVKl6sSzsHYZCbjZ7SzFQmVhAp3Id_lG-GRdFNqqTq8TkWC34MTdA27ChcK9uE3Q501Z_WP78J2xSiykVYCVG6EgdKi8Rhf0w6EwL8J_jArJ8qNDa33ckLcTP1QeTjb1DZ3KLa370tPOLj5YrJ252E1Eqr9JPR0t5HRayBuwPHQg3WGYaBxFwAd6TqgozQyvWQlZpdEJfRKDV9IICvc8cmeA5vcFXhB7KacvDu34VKxDgszQb0qN4lfhcyyUM",
              alt: "Digital interface",
            },
          ],
        },
      ],
    },
    nextProject: { slug: "lumina", title: "Lumina" },
  },
  {
    slug: "lumina",
    title: "Lumina",
    description: "AI-powered design system generator.",
    year: "2024",
    client: "Internal",
    categories: "Product Design · AI",
    role: "Designer & Developer",
    heroImage:
      "https://plus.unsplash.com/premium_photo-1723489242223-865b4a8cf7b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: {
      overview: [
        "Lumina is an AI-powered tool that generates complete design systems from a single brand prompt. It produces tokens, component specs, and accessibility annotations automatically.",
        "The challenge was designing an interface that felt collaborative rather than automated — making AI output feel intentional and craft-driven.",
      ],
      sections: [
        {
          type: "text",
          heading: "The Problem",
          body: "Design systems take months to build and require constant maintenance. Lumina compresses that process into minutes by learning from existing design patterns and brand guidelines.",
        },
        {
          type: "figure",
          src: "https://plus.unsplash.com/premium_photo-1723489242223-865b4a8cf7b8?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0",
          alt: "Lumina interface overview",
        },
        {
          type: "blockquote",
          quote:
            "The best design tool is one that disappears — leaving only the decisions that matter.",
        },
        {
          type: "text",
          heading: "The Output",
          body: "Every generated system includes a full token set, responsive component library, and a living documentation site — all editable and version-controlled from day one.",
        },
      ],
    },
    nextProject: { slug: "flux", title: "Flux" },
  },
  {
    slug: "flux",
    title: "Flux",
    description: "Real-time collaboration for creative teams.",
    year: "2024",
    client: "Flux Labs",
    categories: "Product Design · Motion",
    role: "Lead Product Designer",
    heroImage:
      "https://images.unsplash.com/photo-1530435460869-d13625c69bbf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0",
    content: {
      overview: [
        "Flux reimagines how creative teams collaborate on motion work — bringing real-time multiplayer editing to animation timelines, making remote creative sessions feel synchronous.",
        "The core design challenge: how do you show multiple people editing the same keyframe without creating visual chaos?",
      ],
      sections: [
        {
          type: "text",
          heading: "Presence Without Noise",
          body: "We developed a presence system that shows collaborator cursors as subtle orbital markers rather than intrusive pointers. Each person's actions create ripples in the timeline rather than overriding it.",
        },
        {
          type: "figure",
          src: "https://images.unsplash.com/photo-1530435460869-d13625c69bbf?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0",
          alt: "Flux collaboration interface",
        },
        {
          type: "blockquote",
          quote:
            "Multiplayer isn't about seeing each other — it's about feeling each other's intent.",
        },
        {
          type: "text",
          heading: "The Timeline",
          body: "The core innovation was a conflict-resolution algorithm that lets two people edit the same layer simultaneously, merging changes with animation rather than snapping — preserving the feeling of creative flow.",
        },
      ],
    },
    nextProject: { slug: "prism", title: "Prism" },
  },
  {
    slug: "prism",
    title: "Prism",
    description: "Color palette extraction from any image.",
    year: "2023",
    client: "Open Source",
    categories: "Tool Design · Color Theory",
    role: "Designer & Developer",
    heroImage: "https://i.pinimg.com/1200x/99/ca/5c/99ca5cf82cf12df8801f7b2bef38d325.jpg",
    content: {
      overview: [
        "Prism extracts harmonically-balanced color palettes from any image, applying color theory principles to produce palettes that work across digital and print contexts.",
        "Most extraction tools give you the five most common colors. Prism gives you the five most useful ones.",
      ],
      sections: [
        {
          type: "text",
          heading: "Beyond Sampling",
          body: "The algorithm combines perceptual clustering with harmonic weighting — ensuring extracted colors maintain the emotional register of the source image while being usable as a design system.",
        },
        {
          type: "figure",
          src: "https://i.pinimg.com/1200x/99/ca/5c/99ca5cf82cf12df8801f7b2bef38d325.jpg",
          alt: "Prism color extraction example",
        },
        {
          type: "blockquote",
          quote:
            "Color is not decoration. It is structure — and structure should be derived, not guessed.",
        },
        {
          type: "text",
          heading: "The Output",
          body: "Every palette ships with WCAG contrast ratios, CSS custom properties, and Figma variable exports — ready to use in a design system immediately.",
        },
      ],
    },
    nextProject: { slug: "vertex", title: "Vertex" },
  },
  {
    slug: "vertex",
    title: "Vertex",
    description: "3D modeling toolkit for the web.",
    year: "2023",
    client: "Internal",
    categories: "3D Design · WebGL",
    role: "Designer & Developer",
    heroImage:
      "https://i.pinimg.com/736x/7c/15/39/7c1539cf7ff0207cb49ce0d338de1e5f.jpg",
    content: {
      overview: [
        "Vertex brings parametric 3D modeling to the browser — no installs, no exports, no friction. A design tool that treats geometry as material.",
        "The challenge was performance: running a full CSG engine at 60fps in WebGL while keeping the interface responsive and beginner-accessible.",
      ],
      sections: [
        {
          type: "text",
          heading: "The Editor",
          body: "We built a node-based geometry editor that compiles to WebGL shaders in real time. Every operation is non-destructive, and the full edit history is encoded in a shareable URL.",
        },
        {
          type: "figure",
          src: "https://i.pinimg.com/736x/7c/15/39/7c1539cf7ff0207cb49ce0d338de1e5f.jpg",
          alt: "Vertex 3D editor interface",
        },
        {
          type: "blockquote",
          quote:
            "3D shouldn't require a $3,000 workstation. The browser is the most powerful design surface we have.",
        },
        {
          type: "text",
          heading: "The Constraint",
          body: "Running entirely in the browser meant rethinking every algorithm for GPU parallelism. The constraint became the creative engine — every feature had to earn its performance budget.",
        },
      ],
    },
    nextProject: { slug: "nestle-rebrand", title: "Nestlé Rebrand" },
  },
]
