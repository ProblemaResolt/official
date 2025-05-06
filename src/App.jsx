import React, { useState } from 'react';
import YouTube from 'react-youtube'; // YouTubeコンポーネントをインポート
import './App.css';
import Profile from './components/Profile';
import Career from './components/Career';
import Projects from './components/Projects';
import Skills from './components/Skills';
import PR from './components/PR';

const App = () => {
  const [activeTab, setActiveTab] = useState('career'); // 初期タブを 'career' に変更
  const [menuOpen, setMenuOpen] = useState(false); // ハンバーガーメニューの状態

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false); // メニューを閉じる
  };

  return (
    <div className="container">

      <header className="header text-center d-flex align-items-center justify-content-between">
        <h1 className="title mb-0">Portfolio</h1>
        <nav className="navigation"> 
          <div className="container">
            <button
              className="hamburger-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
            <ul className={`tabs ${menuOpen ? 'open' : ''}`}>
              <li className={activeTab === 'career' ? 'active' : ''}>
                <a href="#career" onClick={() => handleTabClick('career')}>
                  職務経歴
                </a>
              </li>
              <li className={activeTab === 'profile' ? 'active' : ''}>
                <a href="#profile" onClick={() => handleTabClick('profile')}>
                  プロフィール
                </a>
              </li>
              <li className={activeTab === 'skills' ? 'active' : ''}>
                <a href="#skills" onClick={() => handleTabClick('skills')}>
                  スキル
                </a>
              </li>
              <li className={activeTab === 'projects' ? 'active' : ''}>
                <a href="#projects" onClick={() => handleTabClick('projects')}>
                  プロジェクト
                </a>
              </li>
              <li className={activeTab === 'pr' ? 'active' : ''}>
                <a href="#pr" onClick={() => handleTabClick('pr')}>
                  自己PR
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="content">
        {activeTab === 'career' && <Career />}
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'skills' && <Skills />}
        {activeTab === 'projects' && <Projects animate={true} />} {/* アニメーションを有効化 */}
        {activeTab === 'pr' && <PR />}
      </main>

      <footer className="footer text-center">
        <p>&copy; 2025 Portfolio</p>
      </footer>
    </div>
  );
};

export default App;