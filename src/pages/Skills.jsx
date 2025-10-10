import React, { useEffect, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { splitTextToSpans } from '../utils/textAnimation.jsx';
import MetaTags from '../components/MetaTags.jsx';

const Skills = () => {
  const [skills, setSkills] = useState(null);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const baseUrl = useMemo(() => (
    process.env.NODE_ENV === 'production' ? '/official' : ''
  ), []);

  useEffect(() => {
    fetch(`${baseUrl}/data/skills.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error(t('errors.skillsLoadFailed'));
        }
        return response.json();
      })
      .then(data => setSkills(data))
      .catch(error => {
        console.error('Error loading skills:', error);
        setError(error.message);
      });
  }, [t, baseUrl]);

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

  const handleDownloadCsv = () => {
    if (!skills) return;

    const rows = [[
      t('sections.skills.csvHeaders.category'),
      t('sections.skills.csvHeaders.name'),
      t('sections.skills.csvHeaders.experience'),
      t('sections.skills.csvHeaders.notes')
    ]];

    Object.entries(skills).forEach(([categoryKey, items]) => {
      (items || []).forEach((skill) => {
        rows.push([
          t(`sections.skills.categories.${categoryKey}`, { defaultValue: categoryKey }),
          skill.name || '',
          skill.experience || '',
          skill.level || ''
        ]);
      });
    });

    const escapeCsvValue = (value) => {
      const stringValue = `${value ?? ''}`;
      if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
      }
      return stringValue;
    };

    const csvContent = rows
      .map((row) => row.map(escapeCsvValue).join(','))
      .join('\r\n');

    const blob = new Blob(['\uFEFF', csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'skills.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  if (error) return <div>{t('common.errorPrefix')} {error}</div>;
  if (!skills) return <div>{t('common.loading')}</div>;

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

  return (
    <>
      <MetaTags 
        title={t('sections.skills.meta.title')}
        description={t('sections.skills.meta.description')}
        keywords={t('sections.skills.meta.keywords')}
      />
      <section id="skills" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              {splitTextToSpans(t('sections.skills.title'))}
            </h2>
            <button
              type="button"
              className="download-button"
              onClick={handleDownloadCsv}
            >
              {t('sections.skills.actions.downloadCsv')}
            </button>
          </div>
          <div className="skill-categories"> {/* レスポンシブ対応のクラス */}
            {Object.entries(skills).map(([key, skillItems]) => (
              <div key={key} className="skill-category">
                <h3>{t(`sections.skills.categories.${key}`, { defaultValue: key })}</h3>
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