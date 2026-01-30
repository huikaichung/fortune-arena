import { useEffect, useRef, useState } from 'react';
import { TaijiScene } from './three/TaijiScene';
import { fadeSlideIn } from '../utils/animations';
import { useFortuneStore } from '../store/fortuneStore';

export function IntroStage() {
  const setStage = useFortuneStore((s) => s.setStage);
  const [sceneReady, setSceneReady] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sceneReady && contentRef.current) {
      fadeSlideIn(contentRef.current, { delay: 300 });
    }
  }, [sceneReady]);

  const handleEnter = () => {
    setStage('form');
  };

  return (
    <div className="stage intro-stage">
      <TaijiScene onReady={() => setSceneReady(true)} />
      
      <div 
        ref={contentRef}
        className="intro-content"
        style={{ opacity: 0 }}
      >
        <h1 className="intro-title">命運的交匯點</h1>
        <p className="intro-subtitle">四大流派命理大師，為你揭示天機</p>
        
        <div className="master-tags">
          <span className="master-tag meihua">☰ 梅花易數</span>
          <span className="master-tag astro">⭐ 西洋占星</span>
          <span className="master-tag ziwei">🏛 紫微斗數</span>
          <span className="master-tag bazi">📿 八字命理</span>
        </div>

        <button className="enter-btn" onClick={handleEnter}>
          進入
        </button>
      </div>
    </div>
  );
}
