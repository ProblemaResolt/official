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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const videoOptions = {
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: '9g2U12SsRns', // ループ再生のために動画IDを指定
    },
  };

  return (
    <div className="container">
      <nav className="navigation fixed-top"> {/* ナビゲーションをページトップに固定 */}
        <div className="container">
          <ul className="tabs">
            <li className={activeTab === 'profile' ? 'active' : ''}>
              <a href="#profile" onClick={() => handleTabClick('profile')}>
                プロフィール
              </a>
            </li>
            <li className={activeTab === 'career' ? 'active' : ''}>
              <a href="#career" onClick={() => handleTabClick('career')}>
                職務経歴
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

      <header className="header text-center">
        <div className="background-video">
          <YouTube videoId="9g2U12SsRns" opts={videoOptions} className="youtube-video" />
        </div>
        <h1 className="title">ポートフォリオ</h1>
        <p className="subtitle">フロントエンドエンジニア・マーケティングコンサルタント</p>
      </header>

      <main className="content">
        {activeTab === 'profile' && <Profile />}
        {activeTab === 'career' && <Career />}
        {activeTab === 'skills' && <Skills />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'pr' && <PR />}
      </main>

      <footer className="footer text-center">
        <p>&copy; 2025 山本 高廣</p>
      </footer>
    </div>
  );
};

export default App;