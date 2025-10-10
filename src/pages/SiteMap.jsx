import React from 'react';
import { useTranslation } from 'react-i18next';

const SiteMap = () => {
  const { t } = useTranslation();
  const items = t('sections.siteMap.items', { returnObjects: true });

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">{t('sections.siteMap.title')}</h2>
        <ul className="site-map-list">
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
              <span className="site-map-desc">{item.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SiteMap;
