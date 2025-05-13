import React, { useEffect, useRef, useState } from 'react';
import { splitTextToSpans } from '../utils/textAnimation.jsx';

const Career = () => {
  const timelineRefs = useRef([]);
  const [expandedItem, setExpandedItem] = useState(null);
  const [careers, setCareers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? '/official'
      : '';
      
    fetch(`${baseUrl}/data/careers.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('キャリアデータの読み込みに失敗しました');
        }
        return response.json();
      })
      .then(data => setCareers(data))
      .catch(error => {
        console.error('Error loading careers:', error);
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    if (!careers) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-item-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      timelineRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [careers]);

  const toggleDetails = (index) => {
    const currentItem = timelineRefs.current[index];
    const wasExpanded = expandedItem === index;

    setExpandedItem(wasExpanded ? null : index);

    if (currentItem) {
      setTimeout(() => {
        const headerOffset = 120;
        const elementPosition = currentItem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, wasExpanded ? 0 : 50);
    }
  };

  if (error) return <div>Error: {error}</div>;
  if (!careers) return <div>Loading...</div>;

  return (
    <section id="career" className="section">
      <div className="container">
        <h2 className="section-title">
          {splitTextToSpans('Career')}
        </h2>
        <div className="timeline">
          {careers.map((career, index) => (
            <div
              key={index}
              className="timeline-item"
              ref={(el) => (timelineRefs.current[index] = el)}
            >
              <div className="timeline-info">
                <span className="timeline-period">{career.period}</span>
              </div>
              <div className="timeline-marker"></div>
              <div 
                className={`timeline-content ${expandedItem === index ? 'expanded' : ''}`}
                onClick={() => career.projects && toggleDetails(index)}
              >
                <div className="timeline-header">
                  <div className="timeline-title">
                    <h3 className="timeline-company">{career.company}</h3>
                    <h4 className="timeline-position">{career.position}</h4>
                  </div>
                  {career.projects && (
                    <span className={`toggle-icon ${expandedItem === index ? 'open' : ''}`}>
                      {expandedItem === index ? '−' : '＋'}
                    </span>
                  )}
                </div>
                <p className="timeline-duties">{career.duties}</p>
                {career.projects && expandedItem === index && (
                  <><h3>参加プロジェクト</h3>
                  <div className="projects-list">
                    {career.projects.map((project, pIndex) => (
                      <div key={`project-${pIndex}`} className="project-item">
                        <h4>{project.title}</h4>
                        <div className="project-details">
                          <dl>
                            <dt>プロジェクト期間:</dt>
                            <dd className="project-period">{project.period}</dd>
                          </dl>
                          <dl>
                            <dt>業務内容:</dt>
                            <dd className="project-period">
                              <p>{project.description}</p>
                            </dd>
                          </dl>
                          
                          <dl className="project-info">
                            <dt><h5>担当業務：</h5></dt>
                            <dd>
                              <ul>
                                {project.tasks.map((task, i) => (
                                  <li key={`task-${pIndex}-${i}`}>{task}</li>
                                ))}
                              </ul>
                              <p><strong>環境：</strong> {project.environment}</p>
                              <p><strong>役割：</strong> {project.role}</p>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    ))}
                  </div>
                  </>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;