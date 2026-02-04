'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css';

const PERSPECTIVES = [
  { id: 'astro', emoji: '⭐', name: '占星', color: '#60A5FA' },
  { id: 'bazi', emoji: '🔥', name: '八字', color: '#FB923C' },
  { id: 'ziwei', emoji: '💜', name: '紫微', color: '#A78BFA' },
  { id: 'meihua', emoji: '🌸', name: '梅花', color: '#F472B6' },
  { id: 'humandesign', emoji: '🔺', name: '人類圖', color: '#34D399' },
];

export function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      {/* Ambient background */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />
      <div className={styles.bgOrb3} />

      <main className={`${styles.hero} ${loaded ? styles.visible : ''}`}>
        {/* Badge */}
        <div className={styles.badge}>
          <span className={styles.badgeDot} />
          結合命理 × 心理學的自我探索工具
        </div>

        {/* Title */}
        <h1 className={styles.title}>
          你的<span className={styles.titleAccent}>使用說明書</span>
        </h1>

        <p className={styles.subtitle}>
          輸入出生資訊，從五大視角生成專屬於你的深度人格分析
        </p>

        {/* Perspective pills */}
        <div className={styles.perspectives}>
          {PERSPECTIVES.map((p, i) => (
            <div
              key={p.id}
              className={styles.pill}
              style={{
                '--pill-color': p.color,
                animationDelay: `${i * 0.08}s`,
              } as React.CSSProperties}
            >
              <span>{p.emoji}</span>
              <span>{p.name}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/consult" className={`btn btn-primary ${styles.cta}`}>
          開始探索自己
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>

        {/* Social proof / trust */}
        <p className={styles.trust}>
          ✦ 免費使用 · 無需註冊 · 資料不儲存
        </p>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        僅供自我探索參考，不構成專業建議
      </footer>
    </div>
  );
}
