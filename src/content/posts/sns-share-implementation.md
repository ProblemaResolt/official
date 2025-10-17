---
title: ReactでのSNSシェアボタンの実装方法
date: 2025-05-12
tags: [React19, SNS, シェアボタン]
category: 開発
summary: ブログ記事にTwitter、Facebook、LINE、LinkedInのシェアボタンを実装する方法を解説します。
---

ブログ記事やWebサイトにSNSシェアボタンを実装することは、コンテンツの拡散を促進する重要な要素です。この記事では、React環境でのSNSシェアボタンの実装方法について解説します。

### 1. シェアURLの生成

```javascript
const getShareLinks = (title) => {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(`${window.location.origin}${baseUrl}/blog/${id}`);
  
  return {
    twitter: `//twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `//www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    line: `//social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    linkedin: `//www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
  };
};
```

### 2. シェアボタンのコンポーネント実装

各SNSプラットフォームのシェアURLを使用して、シンプルなリンクボタンとして実装します。

```jsx
<div className="social-share">
  <div className="share-buttons">
    {Object.entries(getShareLinks(article.title)).map(([platform, url]) => (
      <a
        key={platform}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`share-button ${platform}`}
        aria-label={`Share on ${platform}`}
      >
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </a>
    ))}
  </div>
</div>
```

### 3. スタイリング

各SNSプラットフォームのブランドカラーを使用してボタンをスタイリングします。

```css
.social-share {
  margin: 1rem 0;
}

.share-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.share-button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  color: white;
  text-decoration: none;
  font-size: 0.9rem;
  transition: opacity 0.3s;
}

.share-button:hover {
  opacity: 0.8;
}

.share-button.twitter { background-color: #1DA1F2; }
.share-button.facebook { background-color: #1877F2; }
.share-button.line { background-color: #00B900; }
.share-button.linkedin { background-color: #0A66C2; }
```

### 4. セキュリティとアクセシビリティ

シェアボタンの実装時には、以下の点に注意が必要です：

- target="_blank"を使用する際は、必ずrel="noopener noreferrer"を追加する
- aria-labelを使用して、スクリーンリーダーユーザーにも適切な情報を提供する
- encodeURIComponentを使用して、URLやタイトルを適切にエンコードする

### まとめ

SNSシェアボタンの実装は、単純なURLベースのアプローチで十分機能します。必要に応じて、各プラットフォームが提供する公式のシェアボタンウィジェットを使用することもできますが、パフォーマンスとカスタマイズ性を考慮すると、このシンプルな実装方法がおすすめです。
