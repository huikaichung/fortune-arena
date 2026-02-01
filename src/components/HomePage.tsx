'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { StarField } from './three/StarField';
import styles from './HomePage.module.css';

const PERSPECTIVES = [
  { id: 'meihua', emoji: '🌸', name: '梅花易數', desc: '當下能量、事件預測' },
  { id: 'ziwei', emoji: '💜', name: '紫微斗數', desc: '性格命盤、人生格局' },
  { id: 'bazi', emoji: '🔥', name: '八字命理', desc: '五行能量、時運節奏' },
  { id: 'astro', emoji: '⭐', name: '西洋占星', desc: '心理原型、行星能量' },
  { id: 'humandesign', emoji: '🔺', name: '人類圖', desc: '能量中心、策略權威' },
];

export function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredPerspective, setHoveredPerspective] = useState<string | null>(null);

  useEffect(() => {
    // 頁面載入動畫
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* Three.js 星空背景 */}
      <StarField />

      {/* 主要內容 */}
      <main className={`${styles.content} ${isLoaded ? styles.loaded : ''}`}>
        <h1 className={styles.title}>
          <span className={styles.sparkle}>✨</span>
          你的使用說明書
          <span className={styles.sparkle}>✨</span>
        </h1>
        
        <p className={styles.subtitle}>
          從五大視角，認識真正的自己
        </p>

        {/* 五大視角圖示 */}
        <div className={styles.perspectives}>
          {PERSPECTIVES.map((p) => (
            <div
              key={p.id}
              className={`${styles.perspective} ${styles[`perspective-${p.id}`]}`}
              onMouseEnter={() => setHoveredPerspective(p.id)}
              onMouseLeave={() => setHoveredPerspective(null)}
            >
              <span className={styles.perspectiveEmoji}>{p.emoji}</span>
              {hoveredPerspective === p.id && (
                <div className={styles.perspectiveTooltip}>
                  <strong>{p.name}</strong>
                  <span>{p.desc}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA 按鈕 */}
        <Link href="/consult" className={`btn btn-primary ${styles.ctaBtn}`}>
          🔮 開始探索
        </Link>

        {/* 底部說明 */}
        <p className={styles.disclaimer}>
          結合心理學視角，讓洞見更實用、更可理解
        </p>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>本服務僅供自我探索參考，不構成專業建議</p>
      </footer>
    </div>
  );
}
