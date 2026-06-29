import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://iorana.digital'

  // 1. RUTAS DE NEXT.JS (Las que ya tienes en image_ed7e6a.png)
  const staticPages = [
    '',
    '/servicios',
    '/servicios/seo-tecnico',
    '/servicios/google-business-local',
    '/servicios/ppc-paid-search',
    '/servicios/content-marketing',
    '/servicios/automatizaciones',
    '/servicios/desarrollo-web',
    '/servicios/imagen-de-marca',
    '/pymes',
    '/pymes/todo-para-tu-negocio',
    '/pymes/proceso',
    '/pymes/casos-de-exito',
    '/soluciones/kit-digital',
    '/soluciones/diseno-de-landings',
    '/soluciones/todo-para-tu-negocio',
    '/contacto',
    '/informe-sitio-web-gratis',
    '/legal/privacidad',
    '/legal/terminos',
    '/legal/cookies',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // 2. PREPARACIÓN PARA WORDPRESS EN /blog/
  let wordpressPosts: MetadataRoute.Sitemap = []
  
  try {
    // Cuando instales WP, esta URL será válida. 
    // Por ahora, el 'catch' evitará que el sitemap falle.
    const response = await fetch(`${baseUrl}/blog/wp-json/wp/v2/posts?_fields=link,modified&per_page=100`, {
      next: { revalidate: 3600 } // Revalida cada hora para SEO
    })
    
    if (response.ok) {
      const posts = await response.json()
      wordpressPosts = posts.map((post: any) => ({
        url: post.link,
        lastModified: new Date(post.modified).toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (error) {
    // Si WP no está instalado aún, simplemente ignoramos esta parte
    console.log("WordPress no detectado todavía en /blog/")
  }

  return [...staticPages, ...wordpressPosts]
}