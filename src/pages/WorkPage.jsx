import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MetaTags from '../components/MetaTags.jsx';
import { splitTextToSpans } from '../utils/textAnimation.jsx';

const works = [
  {
    title: 'サイトテンプレート作成',
    description: '企業サイトのテンプレート作成。',
    image: null,
    url: 'http://ss961168.stars.ne.jp/',
    displayUrlOnly: true,
    disclaimerKey: 'sections.work.testServerNotice',
  },
  // ここに他のカードを追加できます
];

const normalizeUrl = (url) => {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('//')) {
    return url;
  }
  return `//${url.replace(/^\/\//, '')}`;
};

const WorkPage = () => {
  const { t } = useTranslation();
  const [copiedIndex, setCopiedIndex] = useState(null);
  const copyTimeoutRef = useRef(null);
  const canUseClipboard =
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function';

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async (text, idx) => {
    if (!canUseClipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(idx);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy work URL', error);
    }
  };

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
              const showUrlOnly = Boolean(work.displayUrlOnly);
              const isLinkCard = Boolean(normalizedUrl) && !showUrlOnly;
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
                    {isLinkCard && (
                      <span className="workpage-card-link-label">{t('sections.work.visit')}</span>
                    )}
                  </div>
                </>
              );

              return (
                <article className="workpage-card" key={idx}>
                  {isLinkCard ? (
                    <a
                      href={normalizedUrl}
                      className="workpage-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cardBody}
                    </a>
                  ) : (
                    <>
                      {cardBody}
                      {showUrlOnly && work.url && (
                        <div className="workpage-card-url">
                          <code>{work.url}</code>
                          <button
                            type="button"
                            className="workpage-copy-button"
                            onClick={() => handleCopy(work.url, idx)}
                            disabled={!canUseClipboard}
                          >
                            {copiedIndex === idx
                              ? t('sections.work.copySuccess')
                              : t('sections.work.copyUrl')}
                          </button>
                        </div>
                      )}
                      {work.disclaimerKey && (
                        <p className="workpage-card-note">{t(work.disclaimerKey)}</p>
                      )}
                    </>
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
