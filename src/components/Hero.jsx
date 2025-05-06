import React from 'react';
import YouTube from 'react-youtube';

const Hero = ({ onNavigate }) => {
  const videoOpts = {
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      showinfo: 0,
      mute: 1,
      loop: 1,
      playlist: 'By4y0zO-fNM' // YouTubeの動画IDを設定
    }
  };

  return (
    <div className="hero-section">
      <div className="video-background">
        <YouTube
          videoId="By4y0zO-fNM" // YouTubeの動画IDを設定
          opts={videoOpts}
          className="youtube-video"
          onReady={(event) => {
            event.target.playVideo();
          }}
        />
      </div>
      <nav className="hero-nav">
        <ul>
          <li><button onClick={() => onNavigate('profile')}>Profile</button></li>
          <li><button onClick={() => onNavigate('career')}>Career</button></li>
          <li><button onClick={() => onNavigate('skills')}>Skills</button></li>
          <li><button onClick={() => onNavigate('projects')}>Projects</button></li>
        </ul>
      </nav>
      <div className="hero-content">
        <h1 className="hero-title">Portfolio</h1>
        <p className="hero-subtitle">Web Developer</p>
        <div className="hero-buttons">
          <button onClick={() => onNavigate('career')} className="hero-button">
            職務経歴を見る
          </button>
          <button onClick={() => onNavigate('skills')} className="hero-button">
            スキル歴を見る
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
