import React, { useEffect, useRef, useState } from 'react';
import MetaTags from '../components/MetaTags.jsx';
import mojs from '@mojs/core';

const Hero = ({ onNavigate }) => {
  const animDomRef = useRef();
  const canvasRef = useRef();
  const careerBtnRef = useRef();
  const skillsBtnRef = useRef();
  const profileBtnRef = useRef();
  const projectsBtnRef = useRef();
  const blogBtnRef = useRef();
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const titleChars = 'Portfolio'.split('');
  const subtitleChars = 'Web Developer'.split('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    animDomRef.current.appendChild(canvas);

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const waves = {
      y: h * 0.25,  // 波の位置を画面の下から4分の1に
      length: 0.01,
      amplitude: 1, // 波の高さを20pxに抑える
      frequency: 0.0005 // 波の周期をゆっくりに
    };

    let increment = waves.frequency;

    const animate = () => {
      // グラデーションの作成
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, '#87ceeb');    // 空色
      gradient.addColorStop(0.1, '#98d8f0');  // 中間色
      gradient.addColorStop(1, '#3498db');    // 海色

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // 波の描画
      ctx.beginPath();
      ctx.moveTo(0, h * 0.75);  // 波の開始位置を調整

      for (let i = 0; i < w; i++) {
        // より滑らかな波の動き
        const wave1 = Math.sin(i * waves.length + increment) * waves.amplitude;
        const wave2 = Math.sin(i * waves.length * 0.5 + increment) * waves.amplitude * 0.5;
        ctx.lineTo(i, waves.y + wave1 + wave2);
      }

      // 波の色と透明度を一定に
      ctx.strokeStyle = 'rgba(52, 152, 219, 0.2)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      
      ctx.fillStyle = 'rgba(52, 152, 219, 0.1)';
      ctx.fill();
      
      increment += waves.frequency;
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animDomRef.current) {
        animDomRef.current.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    // キャリアボタンのアニメーション
    const careerBurst = new mojs.Burst({
      parent: careerBtnRef.current,
      radius: { 20: 40 },
      count: 5,
      children: {
        shape: 'circle',
        fill: ['#3498db', '#2980b9'],
        scale: { 1: 0 },
        duration: 800,
        repeat: 0
      }
    });

    // スキルボタンのアニメーション
    const skillsBurst = new mojs.Burst({
      parent: skillsBtnRef.current,
      radius: { 20: 40 },
      count: 5,
      children: {
        shape: 'circle',
        fill: ['#3498db', '#2980b9'],
        scale: { 1: 0 },
        duration: 800,
        repeat: 0
      }
    });

    // プロファイルボタンのアニメーション
    const profileBurst = new mojs.Burst({
      parent: profileBtnRef.current,
      radius: { 20: 40 },
      count: 5,
      children: {
        shape: 'circle',
        fill: ['#3498db', '#2980b9'],
        scale: { 1: 0 },
        duration: 800,
        repeat: 0
      }
    });

    // プロジェクトボタンのアニメーション
    const projectsBurst = new mojs.Burst({
      parent: projectsBtnRef.current,
      radius: { 20: 40 },
      count: 5,
      children: {
        shape: 'circle',
        fill: ['#3498db', '#2980b9'],
        scale: { 1: 0 },
        duration: 800,
        repeat: 0
      }
    });

    // ブログボタンのアニメーション
    const blogBurst = new mojs.Burst({
      parent: blogBtnRef.current,
      radius: { 20: 40 },
      count: 5,
      children: {
        shape: 'circle',
        fill: ['#3498db', '#2980b9'],
        scale: { 1: 0 },
        duration: 800,
        repeat: 0
      }
    });

    // クリックハンドラーを設定
    const handleCareerClick = () => {
      careerBurst.replay();
      setTimeout(() => onNavigate('career'), 300);
    };

    const handleSkillsClick = () => {
      skillsBurst.replay();
      setTimeout(() => onNavigate('skills'), 300);
    };

    const handleProfileClick = () => {
      profileBurst.replay();
      setTimeout(() => onNavigate('profile'), 300);
    };

    const handleBlogClick = () => {
      blogBurst.replay();
      setTimeout(() => onNavigate('blog'), 300);
    };

    careerBtnRef.current.addEventListener('click', handleCareerClick);
    skillsBtnRef.current.addEventListener('click', handleSkillsClick);
    profileBtnRef.current.addEventListener('click', handleProfileClick);
    blogBtnRef.current.addEventListener('click', handleBlogClick);

    const animateText = (selector, delay = 0) => {
      const chars = document.querySelectorAll(selector);
      chars.forEach((char, index) => {
        const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
        let currentIndex = 0;
        const finalChar = char.getAttribute('data-final');
        const interval = setInterval(() => {
          if (currentIndex < 3) { // 回転回数
            char.textContent = randomChars[Math.floor(Math.random() * randomChars.length)];
            currentIndex++;
          } else {
            char.textContent = finalChar;
            clearInterval(interval);
          }
        }, 30 + (index * 20)); // インターバル
      });
    };

    // タイトルのアニメーション
    setTimeout(() => {
      setTitleVisible(true);
      animateText('.title-char');
    }, 0);

    // サブタイトルのアニメーション（タイトルの後に開始）
    setTimeout(() => {
      setSubtitleVisible(true);
      animateText('.subtitle-char', 500);
    }, 500);

    // リンクボタンのスライドアニメーション
    const links = document.querySelectorAll('.animated-link');
    links.forEach((link, index) => {
      new mojs.Html({
        el: link,
        x: { [-100]: 0 },
        opacity: { 0: 1 },
        delay: 1000 + (index * 200),
        duration: 500,
        easing: 'quint.out',
        isForce3d: true
      }).play();
    });

    // クリーンアップ
    return () => {
      careerBtnRef.current?.removeEventListener('click', handleCareerClick);
      skillsBtnRef.current?.removeEventListener('click', handleSkillsClick);
      profileBtnRef.current?.removeEventListener('click', handleProfileClick);
      blogBtnRef.current?.removeEventListener('click', handleBlogClick);
    };
  }, [onNavigate]);

  return (
    <>
      <MetaTags 
        title="トップページ"
        description="ポートフォリオサイトです。"
        keywords="ポートフォリオ, Web Developer, React, JavaScript"
        twitterSite="@ProblemaResolt"
        twitterCreator="@ProblemaResolt"
      />
      <div className="hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div ref={animDomRef} className="animation-background"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            {titleChars.map((char, index) => (
              <span
                key={index}
                className={`slot-char title-char ${titleVisible ? 'visible' : ''}`}
                data-final={char}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle">
            {subtitleChars.map((char, index) => (
              <span
                key={index}
                className={`slot-char subtitle-char ${subtitleVisible ? 'visible' : ''}`}
                data-final={char}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {char}
              </span>
            ))}
          </p>
          <div className="hero-buttons">
            {[
              { ref: profileBtnRef, text: 'Profile', handler: () => onNavigate('profile') },
              { ref: careerBtnRef, text: 'Career', handler: () => onNavigate('career') },
              { ref: skillsBtnRef, text: 'Skills', handler: () => onNavigate('skills') },
              { ref: blogBtnRef, text: 'Blog', handler: () => onNavigate('blog') }
            ].map((button, index) => (
              <div
                key={index}
                ref={button.ref}
                className="animated-link"
                onClick={button.handler}
                style={{ 
                  opacity: 0,
                  transform: 'translate3d(-100px, 0, 0)',
                  willChange: 'transform',
                  visibility: 'visible'
                }}
              >
                {button.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
