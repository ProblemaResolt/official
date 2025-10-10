import React from 'react';
import { useTranslation } from 'react-i18next';
import { splitTextToSpans } from '../utils/textAnimation.jsx';
import MetaTags from '../components/MetaTags.jsx';

const renderLines = (lines) =>
  lines.map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      {idx !== lines.length - 1 && <br />}
    </React.Fragment>
  ));

const Profile = () => {
  const { t } = useTranslation();
  const summary = t('sections.profile.summary', { returnObjects: true });
  const expertise = t('sections.profile.expertise', { returnObjects: true });
  const promotion = t('sections.profile.promotion', { returnObjects: true });
  const caseStudies = t('sections.profile.caseStudies', { returnObjects: true });

  return (
    <>
      <MetaTags 
        title={t('sections.profile.meta.title')}
        description={t('sections.profile.meta.description')}
        keywords={t('sections.profile.meta.keywords')}
      />
      <section id="profile" className="section">
        <div className="container">
          <h2 className="section-title">
            {splitTextToSpans(t('sections.profile.title'))}
          </h2>
          <div className="row">
            <div className="column">
              <div className="profile-card">
                <div className="profile-content">
                  <h3 className="profile-heading">{summary.heading}</h3>
                  <p>{renderLines(summary.body)}</p>

                  <h3 className="profile-heading">{t('sections.profile.experienceHeading')}</h3>
                  {expertise.map((item, index) => (
                    <div className="profile-item" key={index}>
                      <h4>{item.heading}</h4>
                      <p>{renderLines(item.body)}</p>
                    </div>
                  ))}

                  <div className="social-links">
                    <a href="https://www.linkedin.com/in/takahiro-yamamoto-07614391/" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/ProblemaResolt" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-github"></i>
                    </a>
                    <a href="https://x.com/ProblemaResolt" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="section-title">{splitTextToSpans(promotion.title)}</h2>
        <div className="pr-content">
          {promotion.items.map((item, index) => (
            <div className="pr-item" key={index}>
              <h3>{item.heading}</h3>
              <p>{renderLines(item.body)}</p>
            </div>
          ))}
        </div>

        <h2 className="section-title">
          {splitTextToSpans(caseStudies.title)}
        </h2>
        <div className="pr-content">
          {caseStudies.items.map((item, index) => (
            <div className="pr-item" key={index}>
              <h3>{item.heading}</h3>
              <p>{renderLines(item.body)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Profile;