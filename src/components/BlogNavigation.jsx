import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BlogNavigation = () => {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [archives, setArchives] = useState([]);
  const baseUrl = process.env.NODE_ENV === 'production' ? '/official' : '';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterTag = queryParams.get('tag');

  useEffect(() => {
    fetch(`${baseUrl}/data/blog-posts.json`)
      .then(response => response.json())
      .then(data => {
        const uniqueCategories = [...new Set(data.map(article => article.category))];
        const uniqueTags = [...new Set(data.flatMap(article => article.tags))];
        setCategories(uniqueCategories);
        setTags(uniqueTags);

        const archiveList = [...new Set(data.map(article => {
          const date = new Date(article.date);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        }))].sort().reverse();
        setArchives(archiveList);
      });
  }, []);

  const formatArchiveDate = (dateStr) => {
    const [year, month] = dateStr.split('-');
    return `${year}年${month}月`;
  };

  return (
    <div className="blog-footer-navigation">
      <div className="footer-nav-grid">
        <div className="footer-nav-section archives">
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

        <div className="footer-nav-section categories">
          <h3>カテゴリー</h3>
          <ul>
            {categories.map(category => (
              <li key={category}>
                <Link to={`/blog?category=${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-nav-section tags">
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
    </div>
  );
};

export default BlogNavigation;
