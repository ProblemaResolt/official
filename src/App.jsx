import React, { useState, useEffect, Suspense, useMemo } from 'react';
import './App.css';
import Profile from './pages/Profile';
import Skills from './pages/Skills';
import Hero from './pages/Hero';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, Routes, Route, useLocation } from 'react-router-dom';
import MetaTags from './components/MetaTags';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import BlogNavigation from './components/BlogNavigation';
import WorkPage from './pages/WorkPage';
import { useTranslation } from 'react-i18next';

const Career = React.lazy(() => import('./pages/Career'));

const BlogFooter = ({ location }) => {
  return (
    <footer className="footer">
      <BlogNavigation />
    </footer>
  );
};

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const navTabs = useMemo(() => ([
    { key: 'profile', label: t('navigation.profile') },
    { key: 'career', label: t('navigation.career') },
    { key: 'skills', label: t('navigation.skills') },
    { key: 'blog', label: t('navigation.blog') },
    { key: 'work', label: t('navigation.work') }
  ]), [t]);

  useEffect(() => {
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      sessionStorage.removeItem('redirect');
      // パスの重複を防ぐために置換処理を追加
      const cleanPath = redirect.replace(/^\/official/, '');
      navigate(cleanPath, { replace: true });
    }
  }, [navigate]);

  // ベースURLを環境に応じて設定（本番環境では/officialを使用）
  const baseUrl = process.env.NODE_ENV === 'production' ? '/official' : '';

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
      // Heroページのときは必ず /official/ で終わるようにする
      window.history.replaceState({ page: 'hero' }, '', baseUrl ? `${baseUrl}/` : '/');
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
    setPreviousTab(activeTab);
    setActiveTab(tab);
    setMenuOpen(false);
    const path = tab.startsWith('/') ? tab : `/${tab}`;
    navigate(path); // baseUrlは絶対に付けない
    window.scrollTo(0, 0);
  };

  const handleNavigate = (tab) => {
    setShowHero(false);
    setActiveTab(tab);
    setMenuOpen(false);
    const path = tab.startsWith('/') ? tab : `/${tab}`;
    navigate(path, { replace: true }); // baseUrlは絶対に付けない
    window.scrollTo(0, 0);
  };

  const handleReturnToTop = () => {
    navigate('/', { replace: true });
    setShowHero(false);
    setActiveTab('');
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <>
      <MetaTags
        title={t('app.meta.title')}
        description={t('app.meta.description')}
        keywords={t('app.meta.keywords')}
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
                    {t('app.title')}
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
                        {navTabs.map(({ key, label }) => (
                          <li key={key} className={activeTab === key ? 'active' : ''}>
                            <a onClick={(e) => {
                              e.preventDefault();
                              handleTabClick(key);
                            }}>
                              {label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </nav>
                </header>

                <main className="main-content">
                  <Routes>
                    <Route path="/" element={<Hero onNavigate={handleNavigate} />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/career" element={
                      <Suspense fallback={<div className="loading-screen"><div className="loading-spinner"></div></div>}>
                        <Career />
                      </Suspense>
                    } />
                    <Route path="/skills" element={<Skills />} />
                    <Route path="/blog" element={<BlogList />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/work" element={<WorkPage />} />
                    <Route path="/official" element={<Hero onNavigate={handleNavigate} />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>

                <div id="modal-root"></div>

                <footer>
                  <BlogFooter location={location} />
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
  const navigate = useNavigate();
  const baseUrl = process.env.NODE_ENV === 'production' ? '/official' : '';
  const { t } = useTranslation();

  useEffect(() => {
    // 開発環境では/に、本番環境では/official/にリダイレクト
    navigate(baseUrl || '/', { replace: true });
  }, [navigate, baseUrl]);

  return (
    <div className="not-found">
      <h1>{t('notFound.title')}</h1>
      <p>{t('notFound.message')}</p>
    </div>
  );
};

export default App;