import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SiteMap = ({ setActiveTab }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (setActiveTab) setActiveTab('sitemap');
  }, [setActiveTab]);

  // クリック時にactiveTabもセット
  const handleNav = (tab, path) => {
    if (setActiveTab) setActiveTab(tab);
    navigate(path);
  };

  return (
    <div>
      <a href="#" onClick={e => { e.preventDefault(); handleNav('', '/'); }}>TOP</a><br />
      ├<a href="#" onClick={e => { e.preventDefault(); handleNav('career', '/career'); }}>Career</a><br />
      ├<a href="#" onClick={e => { e.preventDefault(); handleNav('profile', '/profile'); }}>Profile</a><br />
      ├<a href="#" onClick={e => { e.preventDefault(); handleNav('skills', '/skills'); }}>Skills</a><br />
      └<a href="#" onClick={e => { e.preventDefault(); handleNav('blog', '/blog'); }}>Blog</a><br />
    </div>
  );
};

export default SiteMap;
// Sitemapページとナビゲーションのリンク削除済み
