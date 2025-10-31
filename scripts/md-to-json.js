import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const CONTENTS_DIR = path.join(__dirname, '../public/data/contents');
const BLOGPOSTS_PATH = path.join(__dirname, '../public/data/blog-posts.json');

if (!fs.existsSync(CONTENTS_DIR)) fs.mkdirSync(CONTENTS_DIR, { recursive: true });

function writeJsonIfChanged(targetPath, data) {
  const nextContent = `${JSON.stringify(data, null, 2)}\n`;

  if (fs.existsSync(targetPath)) {
    const currentContent = fs.readFileSync(targetPath, 'utf8');
    if (currentContent === nextContent) {
      return false;
    }
  }

  fs.writeFileSync(targetPath, nextContent);
  return true;
}

const blogPosts = [];

fs.readdirSync(POSTS_DIR).forEach(filename => {
  if (filename.endsWith('.md')) {
    const filePath = path.join(POSTS_DIR, filename);
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    const id = path.basename(filename, '.md');
    const htmlContent = md.render(content);

    // 記事本文を書き出し
    writeJsonIfChanged(
      path.join(CONTENTS_DIR, `${id}.json`),
      { content: htmlContent }
    );

    // メタデータを配列に追加
    blogPosts.push({
      id,
      date: data.date,
      tags: data.tags || [],
      category: data.category,
      title: data.title,
      summary: data.summary,
      contentPath: `contents/${id}.json`
    });
  }
});

// 記事一覧を書き出し
writeJsonIfChanged(
  BLOGPOSTS_PATH,
  blogPosts
);