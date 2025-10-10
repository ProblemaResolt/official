import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';

import { splitTextToSpans } from '../utils/textAnimation.jsx';
import { useTranslation } from 'react-i18next';

const BlogList = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [archives, setArchives] = useState([]);
  const baseUrl = process.env.NODE_ENV === 'production' ? '/official' : '';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterTag = queryParams.get('tag');
  const filterCategory = queryParams.get('category');
  const filterDate = queryParams.get('date');
  const { t } = useTranslation();

  useEffect(() => {
    fetch(`${baseUrl}/data/blog-posts.json`)
      .then(response => response.json())
      .then(data => {
        // 日付順に並び替え
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setArticles(sortedData);
        
        // カテゴリーとタグの一覧を作成
        const uniqueCategories = [...new Set(data.map(article => article.category))];
        const uniqueTags = [...new Set(data.flatMap(article => article.tags))];
        setCategories(uniqueCategories);
        setTags(uniqueTags);

        // アーカイブ（年月）の一覧を作成
        const archiveList = [...new Set(data.map(article => {
          const date = new Date(article.date);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }))].sort().reverse();
        setArchives(archiveList);
      })
      .catch(error => console.error(t('errors.blogListLoadFailed'), error));
  }, [baseUrl, t]);

  // フィルタリングされた記事を取得
  const filteredArticles = articles.filter(article => {
    if (filterTag) return article.tags.includes(filterTag);
    if (filterCategory) return article.category === filterCategory;
    if (filterDate) {
      const articleDate = new Date(article.date);
      const [year, month] = filterDate.split('-');
      return articleDate.getFullYear() === parseInt(year) && 
             articleDate.getMonth() + 1 === parseInt(month);
    }
    return true;
  });

  const formatArchiveDate = (dateStr) => {
    const [year, month] = dateStr.split('-');
    return t('sections.blogList.archiveLabel', { year, month });
  };

  const metaTitle = useMemo(() => {
    const segments = [t('sections.blogList.meta.title')];
    if (filterTag) segments.push(t('sections.blogList.meta.tag', { tag: filterTag }));
    if (filterCategory) segments.push(t('sections.blogList.meta.category', { category: filterCategory }));
    if (filterDate) segments.push(formatArchiveDate(filterDate));
    return segments.join(' - ');
  }, [filterTag, filterCategory, filterDate, t]);

  return (
    <>
      <MetaTags 
        title={metaTitle}
        description={t('sections.blogList.meta.description')}
        keywords={t('sections.blogList.meta.keywords')}
      />
      <section className="section">
        <div className="container">
          <h2 className="section-title">{splitTextToSpans(t('sections.blogList.title'))}</h2>
          <div className="blog-list">
            {filteredArticles.map(article => (
              <article key={article.id} className="blog-item">
                <Link to={`/blog/${article.id}`}>
                  <h3>{article.title}</h3>
                  <div className="blog-meta">
                    <dl>
                      <dt>{t('sections.blogList.postedAt')}:</dt>
                      <dd>
                        <time dateTime={article.date}>
                          {new Date(article.date).toLocaleDateString(t('common.locale'))}
                        </time>
                      </dd>
                      </dl>
                    <dl>
                    <dt>{t('sections.blogList.category')}:</dt>
                    <dd><span className="category">{article.category}</span></dd>
                    </dl>
                    <dl>
                      <dt>{t('sections.blogList.tags')}:</dt>
                      <dd className="tags">
                        {article.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                        ))}
                      </dd>
                    </dl>
                    <dl>
                      <dt>{t('sections.blogList.summary')}:</dt>
                      <dd className="tags">
                        {article.summary}
                      </dd>
                    </dl>
                  </div>
                  
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogList;
