import React from 'react';

const SiteMap = () => (
  <section className="section">
    <div className="container">
      <h2 className="section-title">サイトマップ</h2>
      <ul className="site-map-list">
        <li>
          <a href="/">トップ</a>
          <span className="site-map-desc">… サイトのホームページ</span>
        </li>
        <li>
          <a href="/profile">プロフィール</a>
          <span className="site-map-desc">… 管理人のプロフィール</span>
        </li>
        <li>
          <a href="/career">キャリア</a>
          <span className="site-map-desc">… 職歴・経歴の紹介</span>
        </li>
        <li>
          <a href="/skills">スキル</a>
          <span className="site-map-desc">… 技術スキル一覧</span>
        </li>
        <li>
          <a href="/blog">ブログ</a>
          <span className="site-map-desc">… 技術ブログ記事一覧</span>
        </li>
      </ul>
    </div>
  </section>
);

export default SiteMap;
