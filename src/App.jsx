import React, { useState, useEffect } from 'react';
import './App.css';
import Profile from './components/Profile';
import Career from './components/Career';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Hero from './components/Hero';

const App = () => {
  const [showHero, setShowHero] = useState(true);
  const [activeTab, setActiveTab] = useState('career'); // 初期タブを 'career' に変更
  const [previousTab, setPreviousTab] = useState('career'); // 前のタブを記憶する状態を追加
  const [menuOpen, setMenuOpen] = useState(false); // ハンバーガーメニューの状態

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

  const handleTabClick = (tab) => {
    setPreviousTab(activeTab); // 前のタブを記憶
    setActiveTab(tab);
    setMenuOpen(false); // メニューを閉じる
  };

  const handleNavigate = (tab) => {
    window.history.pushState({ page: tab }, '', `#${tab}`);
    setShowHero(false);
    setActiveTab(tab);
  };

  const handleReturnToTop = () => {
    window.history.pushState({ page: 'hero' }, '', '/');
    setShowHero(true);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="container">
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
                  <li className={activeTab === 'top' ? 'active' : ''}>
                    <a href="#top" onClick={handleReturnToTop}>
                      Top
                    </a>
                  </li>
                  <li className={activeTab === 'profile' ? 'active' : ''}>
                    <a href="#profile" onClick={() => handleTabClick('profile')}>
                      Profile
                    </a>
                  </li>
                  <li className={activeTab === 'career' ? 'active' : ''}>
                    <a href="#career" onClick={() => handleTabClick('career')}>
                      Career
                    </a>
                  </li>
                  <li className={activeTab === 'skills' ? 'active' : ''}>
                    <a href="#skills" onClick={() => handleTabClick('skills')}>
                      Skills
                    </a>
                  </li>
                  <li className={activeTab === 'projects' ? 'active' : ''}>
                    <a href="#projects" onClick={() => handleTabClick('projects')}>
                      Projects
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>

          <main className="content">
            {activeTab === 'profile' && <Profile />}
            {activeTab === 'career' && <Career />}
            {activeTab === 'skills' && <Skills />}
            {activeTab === 'projects' && <Projects animate={true} />} {/* アニメーションを有効化 */}
          </main>

          <footer className="footer text-center">
            <p>&copy; 2025 Portfolio</p>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;