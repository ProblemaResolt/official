import React, { useEffect, useRef } from 'react';
import mojs from '@mojs/core';

const Hero = ({ onNavigate }) => {
  const animDomRef = useRef();
  const careerBtnRef = useRef();
  const skillsBtnRef = useRef();

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
          scale: { 0: 1 },
          duration: 2000,
          delay: i * 400,
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

    // クリックハンドラーを設定
    const handleCareerClick = () => {
      careerBurst.replay();
      setTimeout(() => onNavigate('career'), 300);
    };

    const handleSkillsClick = () => {
      skillsBurst.replay();
      setTimeout(() => onNavigate('skills'), 300);
    };

    careerBtnRef.current.addEventListener('click', handleCareerClick);
    skillsBtnRef.current.addEventListener('click', handleSkillsClick);

    // クリーンアップ
    return () => {
      circle.stop();
      circles.forEach(c => c.stop());
      careerBtnRef.current?.removeEventListener('click', handleCareerClick);
      skillsBtnRef.current?.removeEventListener('click', handleSkillsClick);
    };
  }, [onNavigate]);

  return (
    <div className="hero-section">
      <div ref={animDomRef} className="animation-background"></div>
      <div className="hero-content">
        <h1 className="hero-title">Portfolio</h1>
        <p className="hero-subtitle">Web Developer</p>
        <div className="hero-buttons">
          <div ref={careerBtnRef} className="animated-link">
            Career
          </div>
          <div ref={skillsBtnRef} className="animated-link">
            Skills
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
