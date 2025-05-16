import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = ({ article }) => {
  const baseUrl = process.env.NODE_ENV === 'production' ? '/official' : '';
  return (
    <div className="blog-item">
      <Link to={`/blog/${article.id}`}>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
      </Link>
    </div>
  );
};

export default BlogItem;
