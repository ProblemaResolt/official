import { statSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = '//problemaresolt.github.io';
const __dirname = dirname(fileURLToPath(import.meta.url));
const blogJsonPath = resolve(__dirname, '../public/data/blog-posts.json');
const sitemapPath = resolve(__dirname, '../public/sitemap.xml');

const staticPaths = [
  '/',
  '/profile',
  '/career',
  '/skills',
  '/blog',
  '/work',
  '/contact',
  '/projects',
  '/404',
];

const staticPathSourceMap = {
  '/': resolve(__dirname, '../src/pages/Hero.jsx'),
  '/profile': resolve(__dirname, '../src/pages/Profile.jsx'),
  '/career': resolve(__dirname, '../src/pages/Career.jsx'),
  '/skills': resolve(__dirname, '../src/pages/Skills.jsx'),
  '/blog': resolve(__dirname, '../src/pages/BlogList.jsx'),
  '/work': resolve(__dirname, '../src/pages/WorkPage.jsx'),
  '/contact': resolve(__dirname, '../src/components/Projects.jsx'),
  '/projects': resolve(__dirname, '../src/components/Projects.jsx'),
  '/404': resolve(__dirname, '../src/404.js'),
};

const defaultPriority = '1.0';
const defaultChangefreq = 'always';

function escapeXml(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatToJst(dateLike) {
  const date = new Date(dateLike);
  if (Number.isNaN(date.getTime())) {
    return null;
  }
  const jstTime = date.getTime() + 9 * 60 * 60 * 1000;
  return new Date(jstTime).toISOString().replace('Z', '+09:00');
}

function getLastModForPath(filePath) {
  if (!filePath) return null;
  try {
    const stats = statSync(filePath);
    return formatToJst(stats.mtime);
  } catch {
    return null;
  }
}

function loadPreviousLastmods(xmlPath) {
  if (!existsSync(xmlPath)) {
    return new Map();
  }

  try {
    const xml = readFileSync(xmlPath, 'utf-8');
    const regex = /<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<lastmod>([^<]+)<\/lastmod>/g;
    const lastmods = new Map();
    let match;

    while ((match = regex.exec(xml)) !== null) {
      const loc = match[1].trim();
      const lastmod = match[2].trim();
      if (loc && lastmod) {
        lastmods.set(loc, lastmod);
      }
    }

    return lastmods;
  } catch {
    return new Map();
  }
}

function pickLastmod({ loc, candidate, fallbackDate, previousLastmods }) {
  if (candidate) {
    return candidate;
  }

  if (previousLastmods.has(loc)) {
    return previousLastmods.get(loc);
  }

  if (fallbackDate) {
    return formatToJst(fallbackDate);
  }

  return formatToJst(Date.now());
}

function urlEntry(loc, lastmod) {
  return `  <url>\n    <loc>${loc}</loc>\n    <priority>${defaultPriority}</priority>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${defaultChangefreq}</changefreq>\n  </url>`;
}

function generateSitemap(blogPosts) {
  const previousLastmods = loadPreviousLastmods(sitemapPath);
  const urls = [];

  staticPaths.forEach((p) => {
    const loc = `${BASE_URL}${p}`;
    const sourcePath = staticPathSourceMap[p];
    const candidate = getLastModForPath(sourcePath);
    const lastmod = pickLastmod({
      loc,
      candidate,
      fallbackDate: Date.now(),
      previousLastmods,
    });
    urls.push(urlEntry(loc, lastmod));
  });

  blogPosts.forEach(post => {
    const loc = `${BASE_URL}/blog/${escapeXml(post.id)}`;
    const absPath = post.contentPath ? resolve(__dirname, `../public/data/${post.contentPath}`) : null;
    const datedSource = post.updatedAt || post.date;
    const candidate = datedSource ? formatToJst(datedSource) : getLastModForPath(absPath);
    const lastmod = pickLastmod({
      loc,
      candidate,
      fallbackDate: datedSource || Date.now(),
      previousLastmods,
    });
    urls.push(urlEntry(loc, lastmod));
  });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function main() {
  const blogPosts = JSON.parse(readFileSync(blogJsonPath, 'utf-8'));
  const xml = generateSitemap(blogPosts);
  writeFileSync(sitemapPath, xml, 'utf-8');
  console.log('sitemap.xml generated!');
}

main();
