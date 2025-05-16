import React, { useState, useEffect, Suspense } from 'react';
import './App.css';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Hero from './pages/Hero';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import MetaTags from './components/MetaTags';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

const Career = React.lazy(() => import('./pages/Career'));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      navigate(redirect);
    }
  }, []);

  // ベースURLを環境に応じて設定（末尾のスラッシュを削除）
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? '/official'
    : '';

  const [showHero, setShowHero] = useState(() => {
    // URLパスが初期状態の場合のみHeroを表示
    const pathname = window.location.pathname.replace(baseUrl, '');
    return pathname === '';
  });
  const [activeTab, setActiveTab] = useState(() => {
    // URLパスから初期タブを設定
    const pathname = window.location.pathname.replace(baseUrl, '');
    return pathname || 'career';
  });
  const [previousTab, setPreviousTab] = useState('career'); // 前のタブを記憶する状態を追加
  const [menuOpen, setMenuOpen] = useState(false); // ハンバーガーメニューの状態

  useEffect(() => {
    // 初期化時のURL処理を修正
    const pathname = window.location.pathname.replace(baseUrl, '');
    
    if (pathname) {
      setShowHero(false);
      setActiveTab(pathname);
      window.history.replaceState({ page: pathname }, '', `${baseUrl}${pathname}`);
    } else {
      window.history.replaceState({ page: 'hero' }, '', baseUrl);
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.page === 'hero') {
        setShowHero(true);
      } else if (event.state?.page) {
        setShowHero(false);
        setActiveTab(event.state.page);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // URL変更時のスクロール処理
    const handlePathChange = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  const handleTabClick = (tab) => {
    setPreviousTab(activeTab); // 前のタブを記憶
    setActiveTab(tab);
    setMenuOpen(false); // メニューを閉じる
    const path = `${baseUrl}/${tab}`; // パスの生成を修正
    navigate(path); // useNavigateを使用
    window.scrollTo(0, 0); // ページ上部へスクロール
  };

  const handleNavigate = (tab) => {
    setShowHero(false);
    setActiveTab(tab);
    setMenuOpen(false);
    const path = `${baseUrl}/${tab}`; // パスの生成を修正
    navigate(path); // useNavigateを使用
    window.scrollTo(0, 0); // ページ上部へスクロール
  };

  const handleReturnToTop = () => {
    window.history.pushState({ page: 'hero' }, '', baseUrl);
    setShowHero(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <MetaTags
        title="Portfolio"
        description="ポートフォリオサイト"
        keywords="ポートフォリオ, React, JavaScript"
      />
      <div className="app">
        <AnimatePresence mode="wait">
          <motion.div
            key={showHero ? 'hero' : activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {showHero ? (
              <Hero onNavigate={handleNavigate} />
            ) : (
              <>
                <header className="header text-center d-flex align-items-center justify-content-between">
                  <h1 className="title mb-0" onClick={handleReturnToTop} style={{ cursor: 'pointer' }}>
                    Portfolio
                  </h1>
                  <nav className="navigation">
                    <div className="container">
                      <button
                        className="hamburger-menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                      >
                        ☰
                      </button>
                      <ul className={`tabs ${menuOpen ? 'open' : ''}`}>
                        {['profile', 'career', 'skills', 'blog'].map((tab) => (
                          <li key={tab} className={activeTab === tab ? 'active' : ''}>
                            <a onClick={(e) => {
                              e.preventDefault();
                              handleTabClick(tab);
                            }}>
                              {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </header>

                <main className="main-content">
                  <Routes>
                    <Route path={`${baseUrl}/profile`} element={<Profile />} />
                    <Route path={`${baseUrl}/career`} element={
                        <Suspense fallback={<div className="loading-screen"><div className="loading-spinner"></div></div>}>
                            <Career />
                        </Suspense>
                    } />
                    <Route path={`${baseUrl}/skills`} element={<Skills />} />
                    <Route path={`${baseUrl}/blog`} element={<BlogList />} />
                    <Route path={`${baseUrl}/blog/:id`} element={<BlogPost />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                <div id="modal-root"></div>

                <footer className="footer text-center">
                  <p>&copy; 2025 Portfolio</p>
                </footer>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
};

const NotFound = () => {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? '/official'
    : '';

  return (
    <div className="section">
      <div className="container">
        <h1>404 Not Found</h1>
        <p>ページが見つかりませんでした。</p>
        <p><a href={baseUrl}>トップページへ戻る</a></p>
      </div>
    </div>
  );
};

export default App;