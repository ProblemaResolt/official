---
title: ReactとGitHub Pagesでブログ機能を実装する詳細解説
date: 2025-05-14
tags: [React19, GitHub Pages, ブログ, 実装]
category: 開発
summary: BlogPost.jsxとBlogList.jsxの具体的な実装方法について、コードと共に詳しく解説します。
---

この記事では、BlogPost.jsxとBlogList.jsxの具体的な実装方法について解説します。

## 1. BlogList.jsxの主要機能実装

### 記事一覧の取得と状態管理

```javascript
const [articles, setArticles] = useState([]);
const [categories, setCategories] = useState([]);
const [tags, setTags] = useState([]);
const [archives, setArchives] = useState([]);
```

### フィルタリング処理

```javascript
const filteredArticles = articles.filter(article => {
  if (filterTag) return article.tags.includes(filterTag);
  if (filterCategory) return article.category === filterCategory;
  if (filterDate) {
    const articleDate = new Date(article.date);
    const [year, month] = filterDate.split('-');
    return articleDate.getFullYear() === parseInt(year) && 
           articleDate.getMonth() + 1 === parseInt(month);
  }
  return true; 
});
```

### アーカイブ生成処理

```javascript
const archiveList = [...new Set(data.map(article => {
  const date = new Date(article.date);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}))].sort().reverse();
```

### 記事データの取得と結合

```javascript
const fetchArticle = async () => {
  try {
    // メタデータの取得
    const metaResponse = await fetch(`${baseUrl}/data/blog-posts.json`);
    const metaData = await metaResponse.json();
    const foundArticle = metaData.find(article => article.id === id);

    // コンテンツの取得
    const contentResponse = await fetch(`${baseUrl}/data/contents/${id}.json`);
    const contentData = await contentResponse.json();

    // 記事データの結合
    setArticle({
      ...foundArticle,
      content: contentData.content
    });
  } catch (error) {
    console.error('記事の取得に失敗:', error);
  }
};
```

### 3. データ構造の設計

#### 記事メタデータ（blog-posts.json）

```json
{
  "id": "post-id",
  "date": "2025-05-13",
  "tags": ["React", "GitHub Pages"],
  "category": "開発",
  "title": "記事タイトル",
  "summary": "記事の要約",
  "contentPath": "contents/post-id.json"
}
```

#### 記事コンテンツ（contents/[id].json）

```json
{
  "content": "<h2>記事タイトル</h2><p>記事の本文...</p>"
}
```

### 4. 実装のポイント

- メタデータとコンテンツの分離による効率的なデータ管理
- 静的ホスティングに適したJSON形式でのコンテンツ管理
- URLパラメータを使用したフィルタリング機能
- アーカイブ、カテゴリー、タグによる記事の整理
- React Routerを使用した効率的なルーティング

### 5. パフォーマンス最適化

- メタデータの一括取得によるリクエスト数の削減
- 必要な時のみコンテンツを取得する遅延ローディング
- URLパラメータによるフィルタリング状態の保持
- メモ化によるフィルタリング処理の最適化

---

この実装方法により、GitHub Pagesの静的ホスティング環境でも動的なブログ機能を実現できます。JSONファイルによるコンテンツ管理は、CMSを使用せずともメンテナンスが容易で、かつGitHub上で直接編集も可能という利点があります。
