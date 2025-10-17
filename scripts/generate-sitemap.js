import { statSync, readFileSync, writeFileSync } from 'fs';
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

const defaultPriority = '1.0';
const defaultChangefreq = 'always';

function escapeXml(str) {
  return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function getLastModForPath(filePath) {
  try {
    const stats = statSync(filePath);
    // ISO8601 +09:00 形式
    return new Date(stats.mtime).toISOString().replace(/\.\d{3}Z$/, '+09:00');
  } catch {
    return null;
  }
}

function urlEntry(loc, lastmod) {
  return `  <url>\n    <loc>${loc}</loc>\n    <priority>${defaultPriority}</priority>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${defaultChangefreq}</changefreq>\n  </url>`;
}

function generateSitemap(blogPosts) {
  // 直近24時間以内に更新されたファイルのみを対象にする
  const now = new Date();
  const ONE_DAY = 24 * 60 * 60 * 1000;

  let urls = staticPaths.map(p => {
    let file = p === '/' ? '../public/index.html' : `../public${p}.html`;
    const absPath = resolve(__dirname, file);
    const lastmod = getLastModForPath(absPath) || new Date().toISOString().replace(/\.\d{3}Z$/, '+09:00');
    // 24時間以内に更新されたものだけ出力
    if (lastmod && (now - new Date(lastmod.replace('+09:00', 'Z'))) < ONE_DAY) {
      return urlEntry(`${BASE_URL}${p}`, lastmod);
    }
    return null;
  }).filter(Boolean);

  // ブログ記事
  blogPosts.forEach(post => {
    const contentPath = post.contentPath ? `../public/data/${post.contentPath}` : null;
    const absPath = contentPath ? resolve(__dirname, contentPath) : null;
    const lastmod = absPath ? getLastModForPath(absPath) : new Date().toISOString().replace(/\.\d{3}Z$/, '+09:00');
    if (lastmod && (now - new Date(lastmod.replace('+09:00', 'Z'))) < ONE_DAY) {
      urls.push(urlEntry(`${BASE_URL}/blog/${escapeXml(post.id)}`, lastmod));
    }
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
