/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.homelockers.in', // ✅ your domain
  generateRobotsTxt: true,               // ✅ automatically generates robots.txt
  sitemapSize: 5000,                     // small site, single sitemap.xml
  generateIndexSitemap: false,           // no split files needed
  exclude: [
    '/admin/*',
    '/server/*',
    '/private/*',
    '/cdn-cgi/*'                        // block Cloudflare email-protection
  ],
  changefreq: 'weekly',                  // default frequency
  priority: 0.7,                         // default priority for pages
  transform: async (config, path) => {
    let priority = 0.7;

    if (path === '/') {
      priority = 1.0;                     // homepage gets 1.0
    } else if (path.startsWith('/products/')) {
      priority = 0.8;                     // all product pages 0.8
    }

    return {
      loc: path,
      changefreq: path === '/' ? 'weekly' : 'weekly',
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },           // all standard search engines
      { userAgent: 'GPTBot', allow: '/' },      // OpenAI crawler
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'FacebookBot', allow: '/' },
    ],
    additionalSitemaps: [
      'https://www.homelockers.in/sitemap.xml',
    ],
  },
};
