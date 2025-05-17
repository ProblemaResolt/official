---
title: スキルページのバーアニメーション実装解説
date: 2025-05-11
tags: [React19, JavaScript, アニメーション, Intersection Observer]
category: React
summary: バーアニメーション実装について解説します。
---

Reactでスキルを視覚的に表現するページの実装方法を解説します。Intersection Observerを使用したアニメーションと、データの動的な読み込みを組み合わせています。

### 1. 基本構造

```javascript
const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState(null);
  // ...
};
```

スキルデータの状態管理には、useStateフックを使用しています。

### 2. データの読み込み

```javascript
useEffect(() => {
  const baseUrl = process.env.NODE_ENV === "production" 
    ? "/official"
    : "";
    
  fetch(`${baseUrl}/data/skills.json`)
    .then(response => response.json())
    .then(data => setSkills(data));
}, []);
```

環境に応じたベースURLを使用してJSONデータを読み込みます。

### 3. スキルバーのアニメーション

```javascript
useEffect(() => {
  if (!skills) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const percentage = bar.getAttribute("data-percentage");
          bar.style.width = `${percentage}%`;
        }
      });
    },
    { threshold: 0.1 }
  );
}, [skills]);
```

Intersection Observerを使用して、要素が画面に表示されたときにアニメーションを開始します。

### 4. 経験年数の計算

```javascript
const experience = skill.experience.match(/(\d+)年|(\d+)ヶ月/g);
let totalMonths = 0;

if (experience) {
  experience.forEach((exp) => {
    if (exp.includes("年")) {
      totalMonths += parseInt(exp) * 12;
    } else if (exp.includes("ヶ月")) {
      totalMonths += parseInt(exp);
    }
  });
}
```

正規表現を使用して経験年数を月数に変換し、スキルバーの長さを計算します。

### 5. カテゴリー別の表示

```jsx
<div className="skill-categories">
  <div className="skill-category">
    <h3>OS</h3>
    {renderSkillBars(skills.os)}
  </div>
  {/* その他のカテゴリー */}
</div>
```

スキルをカテゴリー別に整理して表示します。

### 6. パフォーマンスの最適化

- Intersection Observerの適切な閾値設定
- アニメーション実行タイミングの調整
- コンポーネントのクリーンアップ処理

### 7. アクセシビリティ

- 適切なHTML構造
- セマンティックなマークアップ
- キーボード操作への対応

このように、視覚的な表現とパフォーマンス、アクセシビリティを両立させた実装を行っています。
