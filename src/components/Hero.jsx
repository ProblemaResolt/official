import React, { useEffect, useRef, useState } from 'react';
import mojs from '@mojs/core';

const Hero = ({ onNavigate }) => {
  const animDomRef = useRef();
  const careerBtnRef = useRef();
  const skillsBtnRef = useRef();
  const profileBtnRef = useRef();
  const projectsBtnRef = useRef();
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const titleChars = 'Portfolio'.split('');
  const subtitleChars = 'Web Developer'.split('');

  useEffect(() => {
    // シンプルな円のアニメーション
    const circle = new mojs.Shape({
      parent: animDomRef.current,
      shape: 'circle',
      scale: { 0: 1 },
      duration: 1000,
      repeat: 999,
      fill: 'none',
      stroke: '#3498db',
      strokeWidth: { 50: 0 },
      opacity: { 1: 0 }
    });

    // 複数の円を作成
    const circles = [];
    for (let i = 0; i < 5; i++) {
      circles.push(
        new mojs.Shape({
          parent: animDomRef.current,
          shape: 'circle',
          fill: 'none',
          stroke: '#3498db',
          strokeWidth: { 20: 0 },
          opacity: { 1: 0 },
          scale: { 0: 5 },
          duration: 2000,
          delay: i * 1,
          repeat: 999,
          left: '50%',
          top: '50%',
        })
      );
    }

    // アニメーション開始
    circle.play();
    circles.forEach(c => c.play());

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

    careerBtnRef.current.addEventListener('click', handleCareerClick);
    skillsBtnRef.current.addEventListener('click', handleSkillsClick);
    profileBtnRef.current.addEventListener('click', handleProfileClick);

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
      circle.stop();
      circles.forEach(c => c.stop());
      careerBtnRef.current?.removeEventListener('click', handleCareerClick);
      skillsBtnRef.current?.removeEventListener('click', handleSkillsClick);
      profileBtnRef.current?.removeEventListener('click', handleProfileClick);
    };
  }, [onNavigate]);

  return (
    <div className="hero-section">
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
            { ref: skillsBtnRef, text: 'Skills', handler: () => onNavigate('skills') }
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
  );
};

export default Hero;
