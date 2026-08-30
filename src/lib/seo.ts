import { siteConfig } from './site-config';

/**
 * Con `build.format: 'file'`, el `Astro.url.pathname` que se ve durante el build
 * es la ruta del FICHERO (`/proyectos/x.html`), no la URL que recibe el visitante.
 * Sin normalizar, todos los canonical del sitio apuntarian a `/index.html`.
 */
export function buildCanonical(pathname: string): string {
  const path = pathname
    .replace(/index\.html$/, '')
    .replace(/\.html$/, '')
    // `trailingSlash: 'never'`: la barra final sobra en todo menos en la raiz.
    .replace(/(.)\/+$/, '$1');

  return new URL(path || '/', siteConfig.url).href;
}

/**
 * Datos estructurados de tipo Person. Es lo que permite a un buscador entender
 * que la pagina describe a una persona concreta y no un producto.
 */
export function buildPersonSchema(): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    sameAs: siteConfig.socials
      .filter((social) => social.href.startsWith('http'))
      .map((social) => social.href),
  });
}
