'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StarField } from './three/StarField';
import styles from './ManualPage.module.css';

// 假資料 - 之後換成 API
const DEMO_MANUAL = {
  profile: {
    coreLabel: '🔥 火象投射者 🔺',
    oneLiner: '照亮他人的引路人，用智慧點燃希望',
  },
  chapters: [
    {
      id: 'identity',
      title: '你是誰',
      summary: '你是一位天生的領導者與啟發者，擁有強烈的直覺和深刻的洞察力。',
      points: [
        {
          insight: '你有強烈的「發光」特質',
          explanation: '天生適合站在舞台上，影響和啟發他人。你的存在本身就能帶給周圍的人能量。',
          psychology: '心理學上，這對應到「魅力型領導力」(Charismatic Leadership) 的特質。',
          sources: ['八字', '占星', '人類圖'],
        },
        {
          insight: '你需要被邀請才能發揮最大價值',
          explanation: '作為投射者，你的智慧需要被看見和認可。主動推銷自己可能事倍功半。',
          psychology: '這呼應了「專家效應」— 專業知識需要被請教才能展現價值。',
          sources: ['人類圖'],
        },
      ],
    },
    {
      id: 'strengths',
      title: '你的優勢',
      summary: '你的優勢在於洞察力、影響力，以及引導他人找到方向的能力。',
      points: [
        {
          insight: '敏銳的洞察力',
          explanation: '你能看穿事物的本質，理解他人沒注意到的模式和連結。',
          psychology: '這可能與較高的「模式識別」(Pattern Recognition) 能力相關。',
          sources: ['紫微', '人類圖'],
        },
        {
          insight: '語言表達的天賦',
          explanation: '你善於用言語啟發他人，把複雜的概念說得清楚易懂。',
          sources: ['八字', '占星'],
        },
      ],
    },
    {
      id: 'challenges',
      title: '你的挑戰',
      summary: '你的挑戰在於學會等待，以及管理自己的能量。',
      points: [
        {
          insight: '容易過度付出',
          explanation: '你傾向於主動幫助他人，但沒被邀請的幫助可能不被珍惜。',
          psychology: '這與「助人者症候群」(Helper Syndrome) 相關，需要學會設立界線。',
          sources: ['人類圖'],
        },
      ],
    },
    {
      id: 'relationships',
      title: '你的關係',
      summary: '在關係中，你需要被看見、被欣賞，而非被改變。',
      points: [
        {
          insight: '你需要深度連結',
          explanation: '表面的社交無法滿足你，你渴望真正理解你的人。',
          sources: ['占星', '人類圖'],
        },
      ],
    },
    {
      id: 'career',
      title: '你的事業',
      summary: '適合需要洞察力、引導他人的工作，如顧問、教練、講師。',
      points: [
        {
          insight: '你是天生的顧問',
          explanation: '你的價值在於提供洞見，而非執行細節。',
          sources: ['人類圖', '紫微'],
        },
      ],
    },
    {
      id: 'energy',
      title: '你的能量',
      summary: '你的能量不是無限的，需要聰明地管理。',
      points: [
        {
          insight: '你需要充足的休息',
          explanation: '作為投射者，你不適合長時間高強度工作。品質比數量重要。',
          psychology: '這呼應了「能量管理」(Energy Management) 的概念。',
          sources: ['人類圖'],
        },
      ],
    },
  ],
};

interface Props {
  manualId: string;
}

export function ManualPage({ manualId }: Props) {
  const [activeChapter, setActiveChapter] = useState('identity');
  const manual = DEMO_MANUAL; // TODO: 從 API 取得

  const currentChapter = manual.chapters.find(c => c.id === activeChapter);

  return (
    <div className={styles.container}>
      <StarField />

      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← 返回
        </Link>
        <h1>你的使用說明書</h1>
        <button className={styles.shareBtn}>📤</button>
      </header>

      <main className={styles.main}>
        {/* 封面卡片 */}
        <div className={`card ${styles.coverCard}`}>
          <h2 className={styles.coreLabel}>{manual.profile.coreLabel}</h2>
          <p className={styles.oneLiner}>「{manual.profile.oneLiner}」</p>
        </div>

        {/* 章節導航 */}
        <nav className={styles.chapterNav}>
          {manual.chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={`${styles.chapterTab} ${activeChapter === chapter.id ? styles.active : ''}`}
              onClick={() => setActiveChapter(chapter.id)}
            >
              {chapter.title}
            </button>
          ))}
        </nav>

        {/* 章節內容 */}
        {currentChapter && (
          <div className={`card ${styles.chapterContent}`}>
            <h3>{currentChapter.title}</h3>
            <p className={styles.chapterSummary}>{currentChapter.summary}</p>

            <div className={styles.points}>
              {currentChapter.points.map((point, index) => (
                <div key={index} className={styles.point}>
                  <h4>{point.insight}</h4>
                  <p>{point.explanation}</p>
                  
                  {point.psychology && (
                    <div className={styles.psychology}>
                      <span className={styles.psychologyLabel}>🧠 心理學視角</span>
                      <p>{point.psychology}</p>
                    </div>
                  )}

                  <div className={styles.sources}>
                    {point.sources.map((source) => (
                      <span key={source} className={`tag tag-${source.toLowerCase()}`}>
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 對話 CTA */}
        <Link href="/chat" className={`btn btn-primary ${styles.chatCta}`}>
          💬 與 AI 顧問對話
        </Link>
      </main>
    </div>
  );
}
