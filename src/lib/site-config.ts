import { z } from 'astro/zod';

/**
 * Unica fuente de verdad del contenido del sitio. Se valida en el top level del
 * modulo: un valor mal puesto rompe el build en el primer import, en lugar de
 * publicar metadatos rotos que nadie mira hasta que Google los indexa.
 */

const socialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  // El icono se elige por nombre, no por URL: asi el componente no adivina.
  icon: z.enum(['github', 'linkedin', 'email']),
});

const stackGroupSchema = z.object({
  title: z.string().min(1),
  items: z.array(z.string().min(1)).min(1),
});

const siteConfigSchema = z.object({
  url: z.url(),
  locale: z.string().min(2),
  name: z.string().min(1),
  role: z.string().min(1),
  title: z.string().min(1),
  // Google recorta las descripciones alrededor de los 160 caracteres; el limite
  // esta aqui para enterarse al construir y no en el informe de Search Console.
  description: z.string().min(50).max(160),
  bio: z.array(z.string().min(1)).min(1),
  avatarAlt: z.string().min(1),
  email: z.email(),
  socials: z.array(socialLinkSchema).min(1),
  stack: z.array(stackGroupSchema).min(1),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SocialLink = z.infer<typeof socialLinkSchema>;
export type StackGroup = z.infer<typeof stackGroupSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse({
  url: 'https://josebayon.vercel.app',
  locale: 'es-ES',

  name: 'Jose Bayón',
  role: 'Desarrollador full stack',
  title: 'Jose Bayón — Desarrollador full stack',
  description:
    'Desarrollador full stack. Aplicaciones web con React, TypeScript, Python y FastAPI, y sitios rápidos con Astro y Next.js.',

  bio: [
    'Construyo aplicaciones web de principio a fin: la interfaz con React y TypeScript, la API con Python y FastAPI, y la parte aburrida de en medio que hace que las dos se entiendan.',
    'También monto sitios estáticos con Astro y Next.js, cuidando el rendimiento, la accesibilidad y el SEO desde el primer commit en lugar de dejarlos para el final.',
  ],

  avatarAlt: 'Retrato de Jose Bayón',

  email: 'josebayondev@gmail.com',

  socials: [
    { label: 'GitHub', href: 'https://github.com/josebayondev', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/josebayondev/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:josebayondev@gmail.com', icon: 'email' },
  ],

  stack: [
    { title: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Astro', 'Tailwind CSS'] },
    { title: 'Backend', items: ['Python', 'FastAPI', 'PostgreSQL', 'REST'] },
    { title: 'Y además', items: ['SEO técnico', 'Rendimiento web', 'Accesibilidad', 'CI/CD'] },
  ],
});
