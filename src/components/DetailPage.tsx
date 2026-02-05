'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getManual, type UserManual } from '@/lib/api';
import styles from './DetailPage.module.css';

interface Props {
  manualId: string;
}

export function DetailPage({ manualId }: Props) {
  const [manual, setManual] = useState<UserManual | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getManual(manualId);
        setManual(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '載入失敗');
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [manualId]);

  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          <div className={styles.loadingOrb} />
          <p>載入中...</p>
        </div>
      </div>
    );
  }

  if (error || !manual) {
    return (
      <div className={styles.page}>
        <div className={styles.errorState}>
          <h2>找不到資料</h2>
          <p className={styles.errorMsg}>{error || '可能已過期，請重新生成'}</p>
          <Link href="/consult" className="btn btn-primary">重新生成</Link>
        </div>
      </div>
    );
  }

  const western = manual.deep_data?.western;
  const chinese = manual.deep_data?.chinese;
  const hd = manual.deep_data?.human_design;

  return (
    <div className={styles.page}>
      <div className={styles.meshBg}>
        <div className={styles.orbPurple} />
      </div>

      {/* Header */}
      <header className={styles.header}>
        <Link href={`/manual/${manualId}`} className={styles.back}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12 15l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          返回說明書
        </Link>
      </header>

      <main className={styles.main}>
        {/* Page title */}
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>詳細資料</h1>
          <p className={styles.subtitle}>
            {manual.profile.label} 的命盤解讀
          </p>
        </div>

        {/* Western Astrology */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>西洋占星</h2>
          <div className={styles.dataGrid}>
            <DataRow label="太陽星座" value={`${western?.sun_sign || manual.deep_data.zodiac_name} (${western?.sun_element || manual.deep_data.zodiac_element})`} />
            {western?.moon_sign && <DataRow label="月亮星座" value={western.moon_sign} />}
            {western?.rising_sign && <DataRow label="上升星座" value={western.rising_sign} />}
          </div>
          {western?.sun_traits && (
            <p className={styles.cardNote}>{western.sun_traits}</p>
          )}
          <div className={styles.cardExplain}>
            <h3>這代表什麼？</h3>
            <ul>
              <li><strong>太陽星座</strong> — 你的核心自我，外在表現出的性格</li>
              {western?.moon_sign && <li><strong>月亮星座</strong> — 你的情感模式，內在真實的需求</li>}
              {western?.rising_sign && <li><strong>上升星座</strong> — 別人第一眼看到的你，你的社交面具</li>}
            </ul>
          </div>
        </section>

        {/* Chinese Astrology */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>東方命理</h2>
          <div className={styles.dataGrid}>
            <DataRow label="生肖" value={`${chinese?.element || manual.deep_data.chinese_element}${chinese?.zodiac || manual.deep_data.chinese_zodiac}`} />
            {chinese?.bazi_day_master && <DataRow label="八字日主" value={chinese.bazi_day_master} />}
          </div>
          {chinese?.bazi_summary && (
            <p className={styles.cardNote}>{chinese.bazi_summary}</p>
          )}
          <div className={styles.cardExplain}>
            <h3>這代表什麼？</h3>
            <ul>
              <li><strong>生肖五行</strong> — 你出生年份對應的動物與元素能量</li>
              {chinese?.bazi_day_master && <li><strong>八字日主</strong> — 你的命格核心，代表你最本質的能量屬性</li>}
            </ul>
          </div>
        </section>

        {/* Human Design */}
        {hd && hd.type && (
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>人類圖</h2>
            <div className={styles.dataGrid}>
              <DataRow label="類型" value={hd.type} />
              {hd.strategy && <DataRow label="策略" value={hd.strategy} />}
              {hd.authority && <DataRow label="內在權威" value={hd.authority} />}
              {hd.profile && <DataRow label="人生角色" value={hd.profile} />}
            </div>
            <div className={styles.cardExplain}>
              <h3>這代表什麼？</h3>
              <ul>
                <li><strong>類型</strong> — 你在世界中運作的基本方式</li>
                {hd.strategy && <li><strong>策略</strong> — 最適合你的決策與行動方式</li>}
                {hd.authority && <li><strong>內在權威</strong> — 你做重大決定時該聽從的內在聲音</li>}
                {hd.profile && <li><strong>人生角色</strong> — 你在人生中扮演的角色模式</li>}
              </ul>
            </div>
          </section>
        )}

        {/* Spectrum data */}
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>性格光譜數值</h2>
          <div className={styles.spectrumBars}>
            <SpectrumBar label="行動力" value={manual.spectrum.action} />
            <SpectrumBar label="社交力" value={manual.spectrum.social} />
            <SpectrumBar label="創造力" value={manual.spectrum.creativity} />
            <SpectrumBar label="分析力" value={manual.spectrum.analysis} />
            <SpectrumBar label="直覺力" value={manual.spectrum.intuition} />
            <SpectrumBar label="韌性" value={manual.spectrum.resilience} />
          </div>
        </section>

        {/* Disclaimer */}
        <p className={styles.disclaimer}>
          以上為根據出生資訊的推估結果，精確解讀建議諮詢專業命理師
        </p>

        {/* Back to manual */}
        <div className={styles.backAction}>
          <Link href={`/manual/${manualId}`} className="btn btn-ghost">
            返回說明書
          </Link>
        </div>
      </main>
    </div>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.dataRow}>
      <span className={styles.dataLabel}>{label}</span>
      <span className={styles.dataValue}>{value}</span>
    </div>
  );
}

function SpectrumBar({ label, value }: { label: string; value: number }) {
  return (
    <div className={styles.barRow}>
      <span className={styles.barLabel}>{label}</span>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${value}%` }} />
      </div>
      <span className={styles.barValue}>{value}</span>
    </div>
  );
}
