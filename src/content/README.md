# Markdown記事運用ガイド

## 記事の追加・編集・削除方法

- 記事は `src/content/posts/` フォルダ内の `.md` ファイルとして作成・編集・削除してください。
- 例: `src/content/posts/your-article.md`

## ビルド時の自動変換

- `npm run build` または `npm run build:content` を実行すると、すべてのMarkdown記事が
  - 本文HTML: `public/data/contents/[id].json`
  - メタデータ: `public/data/blog-posts.json`
  に自動変換されます。

## 注意

- `public/data/contents/` や `public/data/blog-posts.json` は自動生成物なので直接編集しないでください。
- 記事の管理・公開は必ず `src/content/posts/` のMarkdownで行ってください。
