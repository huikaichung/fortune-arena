'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { StarField } from './three/StarField';
import { getManual, type UserManual, type Chapter } from '@/lib/api';
import styles from './ManualPage.module.css';

interface Props {
  manualId: string;
}

export function ManualPage({ manualId }: Props) {
  const [manual, setManual] = useState<UserManual | null>(null);
  const [activeChapter, setActiveChapter] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadManual() {
      // Demo mode
      if (manualId === 'demo') {
        setManual(DEMO_MANUAL as unknown as UserManual);
        setActiveChapter('identity');
        setIsLoading(false);
        return;
      }
      
      try {
        const data = await getManual(manualId);
        setManual(data);
        // 設定第一個章節為 active
        const firstChapter = Object.keys(data.chapters)[0];
        if (firstChapter) setActiveChapter(firstChapter);
      } catch (err) {
        setError(err instanceof Error ? err.message : '載入失敗');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadManual();
  }, [manualId]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <StarField />
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>載入中...</p>
        </div>
      </div>
    );
  }

  if (error || !manual) {
    return (
      <div className={styles.container}>
        <StarField />
        <div className={styles.error}>
          <p>❌ {error || '找不到使用說明書'}</p>
          <Link href="/consult" className="btn btn-primary">
            重新生成
          </Link>
        </div>
      </div>
    );
  }

  // 處理章節資料
  const chapters = manual.chapters 
    ? Object.entries(manual.chapters).map(([id, chapter]) => ({
        id,
        ...chapter,
      }))
    : (manual as any).chapters || [];
  
  const currentChapter = chapters.find((c: any) => c.id === activeChapter);

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
          <h2 className={styles.coreLabel}>
            {manual.profile?.core_label || (manual as any).profile?.coreLabel}
          </h2>
          <p className={styles.oneLiner}>
            「{manual.profile?.one_liner || (manual as any).profile?.oneLiner}」
          </p>
        </div>

        {/* 章節導航 */}
        <nav className={styles.chapterNav}>
          {chapters.map((chapter: any) => (
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
              {currentChapter.points?.map((point: any, index: number) => (
                <div key={index} className={styles.point}>
                  <h4>{point.insight}</h4>
                  <p>{point.explanation}</p>
                  
                  {(point.psychology || point.psychology_perspective) && (
                    <div className={styles.psychology}>
                      <span className={styles.psychologyLabel}>🧠 心理學視角</span>
                      <p>{point.psychology || point.psychology_perspective}</p>
                    </div>
                  )}

                  <div className={styles.sources}>
                    {point.sources?.map((source: string) => (
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
        <Link href={`/chat?manual=${manualId}`} className={`btn btn-primary ${styles.chatCta}`}>
          💬 與 AI 顧問對話
        </Link>
      </main>
    </div>
  );
}

// Demo 資料
const DEMO_MANUAL = {
  id: 'demo',
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
  ],
};
