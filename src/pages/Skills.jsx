import React, { useEffect, useState } from 'react';
import { splitTextToSpans } from '../utils/textAnimation.jsx';
import MetaTags from '../components/MetaTags.jsx';

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? '/official'
      : '';
      
    fetch(`${baseUrl}/data/skills.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('スキルデータの読み込みに失敗しました');
        }
        return response.json();
      })
      .then(data => setSkills(data))
      .catch(error => {
        console.error('Error loading skills:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (!skills) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target;
            const percentage = bar.getAttribute('data-percentage');
            setTimeout(() => {
              bar.style.width = `${percentage}%`;
            }, 100);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.skill-bar-fill').forEach((bar) => observer.observe(bar));
    return () => observer.disconnect();
  }, [skills]);

  if (error) return <div>Error: {error}</div>;
  if (!skills) return <div>Loading...</div>;

  const renderSkillBars = (skillSet) => {
    return skillSet.map((skill, index) => {
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

      const percentage = Math.min((totalMonths / 60) * 100, 100);

      return (
        <div key={index} className="skill-item">
          <div className="skill-info">
            <span className="skill-name">{skill.name}</span>
            <span className="skill-experience">{skill.experience}</span>
          </div>
          <div className="skill-bar">
            <div 
              className="skill-bar-fill" 
              ref={(el) => {
                if (el) {
                  el.setAttribute('data-percentage', percentage);
                }
              }}
            ></div>
          </div>
          {skill.level && <p className="skill-description">{skill.level}</p>}
        </div>
      );
    });
  };

  const categoryLabels = {
    os: 'OS',
    languages: '言語',
    frameworks: 'フレームワーク',
    databases: 'データベース',
    servers: 'サーバー',
    others: 'その他',
    virtualenvironment: '仮想環境',
  };

  return (
    <>
      <MetaTags 
        title="スキル"
        description="使用可能なスキルセット"
        keywords="スキル, React, Javascript, PHP"
      />
      <section id="skills" className="section">
        <div className="container">
          <h2 className="section-title">
            {splitTextToSpans('Technical Skill')}
          </h2>
          <div className="skill-categories"> {/* レスポンシブ対応のクラス */}
            {Object.entries(skills).map(([key, skillItems]) => (
              <div key={key} className="skill-category">
                <h3>{categoryLabels[key] || key}</h3>
                {renderSkillBars(skillItems || [])}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;