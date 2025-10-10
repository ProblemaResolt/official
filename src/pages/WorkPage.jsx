import React from 'react';
import { useTranslation } from 'react-i18next';
import MetaTags from '../components/MetaTags.jsx';
import { splitTextToSpans } from '../utils/textAnimation.jsx';

const works = [
  {
    title: 'サイトテンプレート作成',
    description: '企業サイトのテンプレート作成。',
    image: null,
    url: 'https://ss961168.stars.ne.jp/',
  },
  // ここに他のカードを追加できます
];

const normalizeUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url.replace(/^\/\//, '')}`;
};

const WorkPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <MetaTags
        title={t('sections.work.meta.title')}
        description={t('sections.work.meta.description')}
        keywords={t('sections.work.meta.keywords')}
      />
      <section id="works" className="section">
        <div className="container">
          <h2 className="section-title">
            {splitTextToSpans(t('sections.work.title'))}
          </h2>
          <p className="workpage-lead">{t('sections.work.lead')}</p>
          <div className="workpage-cards-container">
            {works.map((work, idx) => {
              const normalizedUrl = normalizeUrl(work.url);
              const hasImage = Boolean(work.image);
              const cardBody = (
                <>
                  {hasImage ? (
                    <div
                      className="workpage-card-image"
                      style={{ backgroundImage: `url('${work.image}')` }}
                      role="img"
                      aria-label={`${work.title} のサムネイル画像`}
                    />
                  ) : (
                    <div className="workpage-card-placeholder" aria-hidden="true">
                      <span>No Image</span>
                    </div>
                  )}
                  <div className="workpage-card-content">
                    <h3 className="workpage-card-title">{work.title}</h3>
                    <p className="workpage-card-desc">{work.description}</p>
                    {normalizedUrl && (
                      <span className="workpage-card-link-label">{t('sections.work.visit')}</span>
                    )}
                  </div>
                </>
              );

              return (
                <article className="workpage-card" key={idx}>
                  {normalizedUrl ? (
                    <a
                      href={normalizedUrl}
                      className="workpage-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cardBody}
                    </a>
                  ) : (
                    cardBody
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkPage;
