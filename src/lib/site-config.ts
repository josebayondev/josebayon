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
  bioLong: z.array(z.string().min(1)).min(1),
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
    'Soy desarrollador fullstack. Estudié DAM y llevo dos años centrado en construir software que funcione en producción, no solo en local. En Grupo SIC soy el único responsable de todo el stack, desde la base de datos hasta la interfaz.',
    'Ahora mismo me interesa especialmente la integración de IA en el desarrollo real: uso Claude Code en mi flujo de trabajo diario e implemento flujos con la API de OpenAI en producción.',
    'Fuera del trabajo, vivo cerca de la playa, algo que aprovecho para practicar paddle surf siempre que puedo — es mi manera de desconectar y despejar la cabeza.',
  ],

  // TODO: borrador generado a partir de lo que me has contado — revisa fechas, nombre
  // de la empresa de helpdesk y tono antes de darlo por bueno.
  bioLong: [
    'Todo empezó en un puesto de helpdesk en sistemas, en una empresa española. Ahí toqué mis primeras bases de datos con SQL, y algo hizo clic: quería entender qué pasaba por debajo, no solo resolver tickets. Empecé a programar por mi cuenta hasta que decidí estudiar el grado de Desarrollo de Aplicaciones Multiplataforma (DAM) para darle una base sólida a lo que hasta entonces era autodidacta.',
    'Desde entonces no he parado de aprender. Ahora mismo intento estar al día de todo lo que sale sobre IA aplicada al código, aunque el ritmo al que avanza es difícil de seguir del todo.',
    'En Grupo SIC soy el único responsable de todo el stack de las aplicaciones que desarrollo: diseño el modelo de datos, construyo la API, levanto la infraestructura y termino cuidando el último píxel de la interfaz. Trabajar sin un equipo detrás de cada capa me ha obligado a entender el sistema completo, no solo la parte que me toca, y a tomar decisiones de arquitectura sabiendo que las voy a mantener yo mismo.',
    'Lo que más me interesa hoy es la integración de IA en el desarrollo real, más allá del hype: uso Claude Code como parte de mi flujo de trabajo diario, y he diseñado e implementado flujos con la API de OpenAI que están en producción.',
    'En el día a día me muevo entre React y TypeScript en el frontend, Python y FastAPI en el backend, y Astro y Next.js cuando el proyecto pide un sitio estático rápido. Cuido el rendimiento, la accesibilidad y el SEO.',
    'Fuera del código, el deporte ha sido una constante desde pequeño: empecé jugando al tenis, llegué a competir a nivel nacional, y más adelante di el salto al pádel — una afición que terminó llevándome también a ser entrenador de pádel. Ahora, viviendo cerca de la playa, le he cogido el gusto al paddle surf, mi manera actual de desconectar de la pantalla.',
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
