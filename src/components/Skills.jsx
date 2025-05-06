import React, { useEffect } from 'react';

const Skills = () => {
  const skills = {
    os: [
      { name: "Windows10", experience: "4年2ヶ月", level: "手順書をもとにインストール可能" },
      { name: "Linux（CentOS）", experience: "5年以上", level: "手順書をもとにインストール、CUI操作可能" }
    ],
    languages: [
      { name: "PHP", experience: "5年以上", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "Javascript", experience: "5年以上", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "HTML", experience: "5年以上", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "CSS", experience: "5年以上", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "Java", experience: "5ヶ月", level: "簡単なプログラミングが可能" }
    ],
    frameworks: [
      { name: "Springs", experience: "5ヶ月", level: "" },
      { name: "Laravel", experience: "5年以上", level: "" },
      { name: "CakePHP", experience: "5年以上", level: "" },
      { name: "React.js", experience: "5年以上", level: "" },
      { name: "Vue.js", experience: "3ヶ月", level: "" },
      { name: "Next.js", experience: "6ヶ月", level: "" }
    ],
    databases: [
      { name: "MySQL", experience: "5年以上", level: "クエリを作成、テーブル作成が可能" },
      { name: "PostgreSQL", experience: "5年以上", level: "クエリを作成、テーブル作成が可能" }
    ],
    others: [
      { name: "Apache", experience: "1年", level: "インストールから設定可能" },
      { name: "Nginx", experience: "1年2ヶ月", level: "インストールから設定可能" },
      { name: "Docker", experience: "5年以上", level: "DockerFile作成し環境構築が可能" }
    ]
  };

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

  useEffect(() => {
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
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">テクニカルスキル</h2>
        <div className="skill-categories"> {/* レスポンシブ対応のクラス */}
          <div className="skill-category">
            <h3>OS</h3>
            {renderSkillBars(skills.os)}
          </div>
          <div className="skill-category">
            <h3>言語</h3>
            {renderSkillBars(skills.languages)}
          </div>
          <div className="skill-category">
            <h3>フレームワーク</h3>
            {renderSkillBars(skills.frameworks)}
          </div>
          <div className="skill-category">
            <h3>データベース</h3>
            {renderSkillBars(skills.databases)}
          </div>
          <div className="skill-category">
            <h3>その他</h3>
            {renderSkillBars(skills.others)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;