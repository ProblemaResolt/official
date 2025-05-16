import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';

import { splitTextToSpans } from '../utils/textAnimation.jsx';

const BlogPost = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const baseUrl = process.env.NODE_ENV === 'production' ? '/official' : '';

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${baseUrl}/data/blog-posts.json`);
        if (!response.ok) {
          throw new Error('記事の取得に失敗しました');
        }
        const data = await response.json();
        const foundArticle = data.find(article => article.id === id);
        setArticle(foundArticle);
      } catch (error) {
        console.error("記事の取得エラー:", error);
      }
    };

    fetchArticle();
  }, [id, baseUrl]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (!article) {
    return (
      <section className="section">
        <div className="container">
          <h2>記事が見つかりませんでした</h2>
          <p>指定されたIDの記事は見つかりませんでした。</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <MetaTags 
        title={article.title}
        description={article.summary}
        keywords={article.tags.join(', ')}
      />
      <section className="section">
        <div className="container">
          <div className="blog-navigation">
            <Link to="/blog" className="back-to-list">
              ← 記事一覧に戻る
            </Link>
          </div>
          <article className="blog-post">
            <header className="blog-post-header">
              <h2 className="section-title">{splitTextToSpans(article.title)}</h2>
              <div className="blog-meta">
                <Link to={`${baseUrl}/blog?date=${article.date}`}>
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('ja-JP')}
                  </time>
                </Link>
                <Link to={`${baseUrl}/blog?category=${article.category}`}>
                  <span className="category">{article.category}</span>
                </Link>
                <div className="tags">
                  {article.tags.map(tag => (
                    <Link key={tag} to={`${baseUrl}/blog?tag=${tag}`}>
                      <span className="tag">{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </header>
            <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: article.content }} />
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
