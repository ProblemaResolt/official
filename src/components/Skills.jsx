import React, { useEffect } from 'react';

const Skills = () => {
  const skills = {
    os: [
      { name: "Windows10", experience: "4年2ヶ月", level: "手順書をもとにインストール可能" },
      { name: "Linux（CentOS）", experience: "8年", level: "手順書をもとにインストール、CUI操作可能" }
    ],
    languages: [
      { name: "PHP", experience: "10年", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "Javascript", experience: "15年", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "HTML", experience: "20年", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "CSS", experience: "20年", level: "状況に応じて最適なコードが書け、指導が可能" },
      { name: "Java", experience: "5ヶ月", level: "簡単なプログラミングが可能" }
    ],
    frameworks: [
      { name: "Springs", experience: "5ヶ月", level: "" },
      { name: "Laravel", experience: "5年", level: "" },
      { name: "CakePHP", experience: "4年", level: "" },
      { name: "React.js", experience: "4年", level: "" },
      { name: "Vue.js", experience: "3ヶ月", level: "" },
      { name: "Next.js", experience: "6ヶ月", level: "" }
    ],
    databases: [
      { name: "MySQL", experience: "5年", level: "クエリを作成、テーブル作成が可能" },
      { name: "PostgreSQL", experience: "3年", level: "クエリを作成、テーブル作成が可能" }
    ],
    others: [
      { name: "Apache", experience: "1年", level: "インストールから設定可能" },
      { name: "Nginx", experience: "1年2ヶ月", level: "インストールから設定可能" },
      { name: "Docker", experience: "4年", level: "DockerFile作成し環境構築が可能" }
    ]
  };

  const renderSkillBars = (skillSet) => {
    return skillSet.map((skill, index) => {
      const years = parseInt(skill.experience);
      const percentage = Math.min(years * 10, 100);

      return (
        <div key={index} className="skill-item">
          <div className="skill-info">
            <span className="skill-name">{skill.name}</span>
            <span className="skill-experience">{skill.experience}</span>
          </div>
          <div className="skill-bar" data-skill={`${percentage}%`}>
            <div className="skill-bar-fill"></div>
          </div>
          {skill.level && <p className="skill-description">{skill.level}</p>}
        </div>
      );
    });
  };

  useEffect(() => {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    skillBars.forEach((bar) => {
      const parent = bar.parentElement;
      const skillLevel = parent.getAttribute('data-skill');
      bar.style.width = skillLevel;
    });
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">テクニカルスキル</h2>
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
    </section>
  );
};

export default Skills;