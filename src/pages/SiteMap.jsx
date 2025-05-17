import React from 'react';
import { Link } from 'react-router-dom';

const SiteMap = () => (
  <section className="section">
    <div className="container">
      <h2 className="section-title">サイトマップ</h2>
      <ul className="site-map-list">
        <li>
          <Link to="/">トップ</Link>
          <span className="site-map-desc">… サイトのホームページ</span>
        </li>
        <li>
          <Link to="/profile">プロフィール</Link>
          <span className="site-map-desc">… 管理人のプロフィール</span>
        </li>
        <li>
          <Link to="/career">キャリア</Link>
          <span className="site-map-desc">… 職歴・経歴の紹介</span>
        </li>
        <li>
          <Link to="/skills">スキル</Link>
          <span className="site-map-desc">… 技術スキル一覧</span>
        </li>
        <li>
          <Link to="/blog">ブログ</Link>
          <span className="site-map-desc">… 技術ブログ記事一覧</span>
        </li>
      </ul>
    </div>
  </section>
);

export default SiteMap;
