const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const POSTS_DIR = path.join(__dirname, '../src/content/posts');
const CONTENTS_DIR = path.join(__dirname, '../public/data/contents');
const BLOGPOSTS_PATH = path.join(__dirname, '../public/data/blog-posts.json');

if (!fs.existsSync(CONTENTS_DIR)) fs.mkdirSync(CONTENTS_DIR, { recursive: true });

const blogPosts = [];

fs.readdirSync(POSTS_DIR).forEach(filename => {
  if (filename.endsWith('.md')) {
    const filePath = path.join(POSTS_DIR, filename);
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    const id = path.basename(filename, '.md');
    const htmlContent = md.render(content);

    // 記事本文を書き出し
    fs.writeFileSync(
      path.join(CONTENTS_DIR, `${id}.json`),
      JSON.stringify({ content: htmlContent }, null, 2)
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
fs.writeFileSync(
  BLOGPOSTS_PATH,
  JSON.stringify(blogPosts, null, 2)
);