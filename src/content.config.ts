import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const link = z.object({ label: z.string(), url: z.string().url() });
const project = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  status: z.string(),
  summary: z.string(),
  role: z.string(),
  problem: z.string(),
  process: z.string(),
  outcome: z.string(),
  technologies: z.array(z.string()),
  links: z.array(link).default([]),
  featured: z.boolean().default(false),
});

const profile = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/profile' }),
  schema: z.object({
    locale: z.enum(['en', 'tr']),
    direction: z.enum(['ltr', 'rtl']),
    name: z.string(),
    headline: z.string(),
    metadata: z.object({ title: z.string(), description: z.string() }),
    nav: z.array(z.object({ label: z.string(), href: z.string() })),
    ui: z.record(z.string(), z.string()),
    hero: z.object({ statement: z.string(), availability: z.string() }),
    about: z.object({ title: z.string(), paragraphs: z.array(z.string()) }),
    cv: z.object({
      summary: z.string(),
      publicationTier: z.string(),
      researchExperience: z.object({
        period: z.string(),
        title: z.string(),
        organization: z.string(),
        project: z.string(),
        bullets: z.array(z.string()).min(3),
      }),
    }),
    research: z.object({
      title: z.string(),
      paperTitle: z.string(),
      citation: z.string(),
      explanation: z.string(),
      limitation: z.string(),
      doi: z.string().url(),
    }),
    projects: z.array(project).min(6),
    timeline: z.array(
      z.object({
        period: z.string(),
        title: z.string(),
        organization: z.string(),
        description: z.string(),
      }),
    ),
    education: z.array(
      z.object({
        period: z.string(),
        degree: z.string(),
        institution: z.string(),
        details: z.array(z.string()),
      }),
    ),
    skillGroups: z.array(z.object({ title: z.string(), items: z.array(z.string()) })),
    languages: z.array(z.object({ language: z.string(), level: z.string() })),
    achievements: z.array(z.object({ date: z.string(), title: z.string(), detail: z.string() })),
    learning: z.array(link),
    collaboration: z.array(z.object({ title: z.string(), detail: z.string() })),
    contact: z.object({
      email: z.string().email(),
      github: z.string().url(),
      orcid: z.string().url(),
      location: z.string(),
    }),
  }),
});

export const collections = { profile };
