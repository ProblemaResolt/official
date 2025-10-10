import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';

import { splitTextToSpans } from '../utils/textAnimation.jsx';
import { useTranslation } from 'react-i18next';

const BlogPost = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const baseUrl = process.env.NODE_ENV === 'production' ? '/official' : '';
  const { t } = useTranslation();

  // SNSシェア用のURLを生成する関数を追加
  const getShareLinks = (title) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(`${window.location.origin}${baseUrl}/blog/${id}`);
    
    return {
      twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    };
  };

  // createPath関数を修正
  const createPath = (path) => {
    // パスをそのまま返す（baseUrlは React Router が処理する）
    return path;
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // メタデータの取得
        const metaResponse = await fetch(`${baseUrl}/data/blog-posts.json`);
        if (!metaResponse.ok) {
          throw new Error(t('errors.blogMetaLoadFailed'));
        }
        const metaData = await metaResponse.json();
        const foundArticle = metaData.find(article => article.id === id);
        if (!foundArticle) {
          throw new Error(t('errors.blogNotFound'));
        }

        try {
          // コンテンツの取得
          const contentResponse = await fetch(`${baseUrl}/data/contents/${id}.json`);
          if (!contentResponse.ok) {
            throw new Error(t('errors.blogContentLoadFailed'));
          }
          const contentData = await contentResponse.json();

          // 記事データの結合
          setArticle({
            ...foundArticle,
            content: contentData.content
          });
        } catch (contentError) {
          console.error(t('errors.blogContentLoadLog'), contentError);
          // コンテンツ取得に失敗した場合は、メタデータのみで表示
          setArticle(foundArticle);
        }
      } catch (error) {
        console.error(t('errors.blogFetchLog'), error);
      }
    };

    fetchArticle();
  }, [id, baseUrl, t]);

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
          <h2>{t('sections.blogPost.notFoundTitle')}</h2>
          <p>{t('sections.blogPost.notFoundBody')}</p>
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
              ← {t('sections.blogPost.backToList')}
            </Link>
          </div>
          <article className="blog-post">
            <header className="blog-post-header">
              <h2 className="section-title">{splitTextToSpans(article.title)}</h2>
              <div className="blog-meta">
                <Link to={createPath(`/blog?date=${article.date}`)}>
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString(t('common.locale'))}
                  </time>
                </Link>
                <Link to={createPath(`/blog?category=${article.category}`)}>
                  <span className="category">{article.category}</span>
                </Link>
                <div className="tags">
                  {article.tags.map(tag => (
                    <Link key={tag} to={createPath(`/blog?tag=${tag}`)}>
                      <span className="tag">{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
              {/* SNSシェアボタンを追加 */}
              <div className="social-share">
                <div className="share-buttons">
                  {Object.entries(getShareLinks(article.title)).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`share-button ${platform}`}
                      aria-label={`Share on ${platform}`}
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
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
