---
title: ReactのMetaTagsコンポーネントの実装解説
date: 2025-05-01
tags: [React19, SEO, メタタグ]
category: SEO
summary: SEOに必要不可欠なMetaTagsコンポーネントの実装方法を詳しく解説します。
---

ReactアプリケーションでSEOを行うためには、各ページごとに適切なメタタグを設定する必要があります。今回は、その実装方法について解説します。

### 1. コンポーネントの基本構造

```javascript
const MetaTags = ({ 
  title,
  description,
  keywords,
  ogImage,
  twitterSite,
  twitterCreator
}) => {
  // ...
};
```

プロパティとして以下の値を受け取ります：

- **title**: ページのタイトル
- **description**: ページの説明文
- **keywords**: 検索キーワード
- **ogImage**: OGP画像のURL
- **twitterSite**: TwitterのサイトアカウントID
- **twitterCreator**: Twitterの作成者アカウントID

### 2. useEffectによるメタタグの更新

```javascript
useEffect(() => {
  // タイトルの設定
  document.title = title ? `${title} | Portfolio` : 'Portfolio';

  // 基本的なメタタグ
  document.querySelector('meta[name="description"]')?.setAttribute('content', description || '');
  document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords || '');
}, [title, description, keywords]);
```

useEffectを使用することで、コンポーネントのマウント時やプロパティの更新時にメタタグを動的に更新します。

### 3. OGPタグの設定

```javascript
// OGPタグの更新
document.querySelector('meta[property="og:title"]')?.setAttribute('content', title ? `${title} | Portfolio` : 'Portfolio');
document.querySelector('meta[property="og:description"]').setAttribute('content', description || '');
```

OGP（Open Graph Protocol）は、FacebookやTwitterなどのSNSでシェアされた際の表示を制御するためのメタタグです。

### 4. Twitterカードの設定

```javascript
// Twitterカードの設定
document.querySelector('meta[name="twitter:card"]').setAttribute('content', 'summary_large_image');
document.querySelector('meta[name="twitter:title"]').setAttribute('content', title);
```

Twitterカードは、Twitterでシェアされた際の表示を最適化するための設定です。

### 5. コンポーネントの使用方法

```javascript
import MetaTags from '../components/MetaTags';

const BlogPost = () => {
  return (
    <>
      <MetaTags
        title="記事タイトル"
        description="記事の説明"
        keywords="キーワード1, キーワード2"
        ogImage="//example.com/image.jpg"
        twitterSite="@siteaccount"
        twitterCreator="@creator"
      />
      // ページコンテンツ
    </>
  );
};
```

### 6. 注意点と実装のポイント

- Optional Chainingを使用して安全にメタタグを更新
- 未設定の値に対してフォールバック値を用意
- 依存配列を適切に設定してパフォーマンスを最適化

このような実装により、SPAでありながらSEOに対応したReactアプリケーションを構築することができます。
