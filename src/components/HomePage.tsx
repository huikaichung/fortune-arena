'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './HomePage.module.css';

const DISCOVERIES = [
  { title: '今年的你', desc: '運勢走向與關鍵轉折' },
  { title: '隱藏的天賦', desc: '你可能還不知道的潛能' },
  { title: '核心優勢與盲點', desc: '最真實的你' },
  { title: '感情藍圖', desc: '你在愛裡的樣子' },
  { title: '職業密碼', desc: '天生適合做什麼' },
  { title: '幸運指南', desc: '屬於你的顏色、數字、方位' },
];

export function HomePage() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      {/* Soft background orbs */}
      <div className={styles.meshBg}>
        <div className={styles.orbPurple} />
        <div className={styles.orbRose} />
      </div>

      <main className={`${styles.hero} ${loaded ? styles.visible : ''}`}>
        {/* Title */}
        <h1 className={styles.title}>你的使用說明書</h1>

        <p className={styles.subtitle}>
          從出生的那一刻起，你就是獨一無二的。<br />
          我們幫你把那份獨特，變成看得見的文字。
        </p>

        {/* Discoveries section */}
        <div className={styles.discoveries}>
          <h2 className={styles.discoveriesTitle}>你將會發現</h2>
          <div className={styles.discoveriesGrid}>
            {DISCOVERIES.map((item, i) => (
              <div
                key={item.title}
                className={styles.discoveryItem}
                style={{ animationDelay: `${0.3 + i * 0.08}s` }}
              >
                <span className={styles.discoveryTitle}>{item.title}</span>
                <span className={styles.discoveryDash}> — </span>
                <span className={styles.discoveryDesc}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link href="/consult" className={styles.cta}>
          開始認識自己
        </Link>

        {/* Trust line */}
        <p className={styles.trust}>
          免費使用 · 無需註冊 · 資料不儲存
        </p>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        僅供自我探索參考，不構成專業建議
      </footer>
    </div>
  );
}
