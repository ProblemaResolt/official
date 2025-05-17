---
title: ReactでのCSSアニメーションを使用したテキストアニメーションの実装
date: 2025-05-10
tags: [React19, JavaScript, アニメーション, CSS]
category: React
summary: Reactでテキスト文字を1文字ずつアニメーション表示する実装方法を解説します。
---

Reactでテキストを1文字ずつアニメーション表示する方法を解説します。CSSカスタムプロパティとReactコンポーネントを組み合わせて実現します。

### 1. ユーティリティ関数の実装

```javascript
// textAnimation.jsx
import React from 'react';

export const splitTextToSpans = (text) => {
  return text.split('').map((char, i) => (
    <span 
      key={i} 
      className="drop-animation"
      style={{ '--char-index': i }}
    >
      {char}
    </span>
  ));
};
```

この関数は以下の処理を行います：

- テキストを1文字ずつ分割
- 各文字をspanタグでラップ
- CSSアニメーション用のクラスを付与
- カスタムプロパティで文字のインデックスを設定

### 2. CSSアニメーションの実装

```css
.drop-animation {
  opacity: 0;
  animation: dropIn 0.5s ease-out forwards;
  animation-delay: calc(var(--char-index) * 0.1s);
}

@keyframes dropIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 3. 使用例

```javascript
import { splitTextToSpans } from '../utils/textAnimation';

const AnimatedText = () => {
  return (
    <div>
      {splitTextToSpans('Hello, World!')}
    </div>
  );
};
```

### 4. 実装のポイント

- **カスタムプロパティの活用**: --char-indexを使用して各文字の遅延時間を制御
- **アニメーションの最適化**: transformとopacityのみを使用してパフォーマンスを確保
- **Reactのキー管理**: mapで生成する要素に適切なkeyを設定

### 5. 応用例

この実装は以下のようなケースで活用できます：

- ページタイトルのアニメーション
- ローディング時のテキストアニメーション
- モーダル表示時の演出

### 6. パフォーマンスの考慮点

大量の文字に対してアニメーションを適用する場合は、以下の点に注意が必要です：

- 文字数が多い場合は遅延時間を調整
- will-changeプロパティの適切な使用
- アニメーション完了後のクリーンアップ

このような実装により、シンプルながら効果的なテキストアニメーションを実現することができます。
