---
title: React+ViteでMarkdownブログを自動HTML化して公開する方法
date: 2025-06-01
tags: [React, Vite, Markdown, 静的サイト, ブログ]
category: ビルドツール
summary: Markdownで記事を書き、ビルド時に自動でHTML化・JSON化してReactで表示する静的ブログ構築手法を解説します。
---

## 概要

Markdownで記事を書き、ビルド時に自動でHTML化・JSON化してReactで表示する静的ブログ構築手法を解説します。

---

## 1. 必要なライブラリのインストール

```bash
npm install gray-matter markdown-it
```

---

## 2. Markdown記事を書く

`src/content/posts/` ディレクトリにMarkdownファイルを作成します。

```markdown
---
title: React+ViteでMarkdownブログを自動HTML化して公開する方法
date: 2025-06-01
tags: [React, Vite, Markdown, 静的サイト, ブログ]
category: 開発
summary: Markdownで記事を書き、ビルド時に自動でHTML化・JSON化してReactで表示する静的ブログ構築手法を解説します。
---

# React+ViteでMarkdownブログを自動HTML化して公開する方法

（ここに本文をMarkdownで記述）
```

---

## 3. Markdown→HTML(JSON)変換スクリプト

`scripts/md-to-json.js` を作成します。

```javascript
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();
const POSTS_DIR = join(__dirname, '../src/content/posts');
const CONTENTS_DIR = join(__dirname, '../public/data/contents');
const BLOGPOSTS_PATH = join(__dirname, '../public/data/blog-posts.json');

if (!existsSync(CONTENTS_DIR)) mkdirSync(CONTENTS_DIR, { recursive: true });

const blogPosts = [];

readdirSync(POSTS_DIR).forEach(filename => {
  if (filename.endsWith('.md')) {
    const filePath = join(POSTS_DIR, filename);
    const { data, content } = matter(readFileSync(filePath, 'utf8'));
    const id = basename(filename, '.md');
    const htmlContent = md.render(content);

    // 記事本文を書き出し
    writeFileSync(
      join(CONTENTS_DIR, `${id}.json`),
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
      contentPath: `contents/${id}.json`,
      ogImage: data.ogImage || '',
      description: data.description || data.summary || ''
    });
  }
});

// 記事一覧を書き出し
writeFileSync(
  BLOGPOSTS_PATH,
  JSON.stringify(blogPosts, null, 2)
);
```

---

## 4. package.jsonのスクリプト設定

```json
"scripts": {
  "build:content": "node scripts/md-to-json.cjs",
  "build": "npm run build:content && vite build"
}
```

---

## 5. ReactでHTMLを表示

BlogPost.jsxなどで、生成されたJSONの`content`を `dangerouslySetInnerHTML` で表示します。

```javascript
<div className="blog-post-content" dangerouslySetInnerHTML={{ __html: article.content }} />
```

---

## まとめ

- Markdownで記事を書けるので執筆・管理が楽
- ビルド時にHTML化・JSON化するので高速・安全
- React/Viteの静的サイトでも柔軟にブログ運用できる

この仕組みで、エンジニア向けの静的ブログを効率よく構築できます！
