import React from 'react';

const works = [
  {
    title: 'Action is the foundational Key to all success.',
    description: '“行動がすべての成功への基本的な鍵である。”\n美術分野の巨匠と呼ばれるピカソの言葉です。',
    image: './docs/assets/hero-bg.jpg',
    url: '//ss961168.stars.ne.jp/',
  },
  // ここに他のカードを追加できます
];

const WorkPage = () => (
  <section className="workpage-section">
    <div className="workpage-cards-container">
      {works.map((work, idx) => (
        <div className="workpage-card" key={idx}>
          <div className="workpage-card-image" style={{ backgroundImage: `url('${work.image}')` }} />
          <div className="workpage-card-content">
            <h2 className="workpage-card-title">{work.title}</h2>
            <p className="workpage-card-desc">{work.description}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default WorkPage;
