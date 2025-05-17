import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';

import { splitTextToSpans } from '../utils/textAnimation.jsx';

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
      .catch(error => console.error("Error fetching blog posts:", error));
  }, []);

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
    return `${year}年${month}月`;
  };

  return (
    <>
      <MetaTags 
        title={`ブログ${filterTag ? ` - ${filterTag}` : ''}${filterCategory ? ` - ${filterCategory}` : ''}${filterDate ? ` - ${formatArchiveDate(filterDate)}` : ''}`}
        description="ブログ記事一覧"
        keywords="ブログ, React, SEO"
      />
      <section className="section">
        <div className="container">
          <h2 className="section-title">
                      {splitTextToSpans('Blogs')}</h2>
          
          <div className="blog-filters">
            <div className="archives">
              <h3>アーカイブ</h3>
              <ul>
                {archives.map(archive => (
                  <li key={archive}>
                    <Link to={`/blog?date=${archive}`}>
                      {formatArchiveDate(archive)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="categories">
              <h3>カテゴリー</h3>
              <ul>
                {categories.map(category => (
                  <li key={category}>
                    <Link to={`/blog?category=${category}`}>{category}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="tag-filter">
              <h3>タグ</h3>
              <div className="tag-buttons">
                {tags.map(tag => (
                  <Link 
                    key={tag}
                    to={`/blog?tag=${tag}`}
                    className={`tag-button ${filterTag === tag ? 'active' : ''}`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="blog-list">
            {filteredArticles.map(article => (
              <article key={article.id} className="blog-item">
                <Link to={`/blog/${article.id}`}>
                  <h3>{article.title}</h3>
                  <div className="blog-meta">
                    <dl>
                    <dt>投稿日:</dt>
                    <dd><time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('ja-JP')}
                    </time>
                    </dd>
                    <dt>category:</dt>
                    <span className="category">{article.category}</span>
                    <dt>tags:</dt>
                    <dd className="tags">
                      {article.tags.map(tag => (
                       <span key={tag} className="tag">{tag}</span>
                      ))}
                    </dd>
                    </dl>
                  </div>
                  <p>{article.summary}</p>
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
