import React from 'react';
import { Link } from 'react-router-dom';

const SiteMap = () => (
  <nav className="site-map">
    <ul>
      <li><Link to="/">トップ</Link></li>
      <li><Link to="/profile">プロフィール</Link></li>
      <li><Link to="/career">キャリア</Link></li>
      <li><Link to="/skills">スキル</Link></li>
      <li><Link to="/blog">ブログ</Link></li>
    </ul>
  </nav>
);

export default SiteMap;
