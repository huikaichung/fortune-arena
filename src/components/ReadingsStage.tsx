import { useEffect, useRef, useState } from 'react';
import { staggerFadeIn, countUp, progressFill } from '../utils/animations';
import { useFortuneStore } from '../store/fortuneStore';

interface MasterCardProps {
  master: {
    id: string;
    name: string;
    title: string;
    icon: string;
    color: string;
  };
  reading: string;
  aspects?: Record<string, string>;
  isExpanded: boolean;
  onToggle: () => void;
}

function MasterCard({ master, reading, aspects, isExpanded, onToggle }: MasterCardProps) {
  return (
    <div 
      className={`master-card ${master.id} ${isExpanded ? 'expanded' : ''}`}
      style={{ '--master-color': master.color } as React.CSSProperties}
      onClick={onToggle}
    >
      <div className="master-header">
        <span className="master-icon">{master.icon}</span>
        <div className="master-info">
          <h4 className="master-name">{master.name}</h4>
          <p className="master-title">{master.title}</p>
        </div>
      </div>
      
      {isExpanded && (
        <div className="master-content">
          <p className="master-reading">{reading}</p>
          
          {aspects && (
            <div className="master-aspects">
              {Object.entries(aspects).map(([key, value]) => (
                <div key={key} className="aspect-item">
                  <span className="aspect-label">{key}</span>
                  <span className="aspect-value">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="card-hint">
        {isExpanded ? '點擊收起' : '點擊展開'}
      </div>
    </div>
  );
}

const MASTERS = {
  meihua: { id: 'meihua', name: '梅花先生', title: '梅花易數', icon: '☰', color: '#8b7355' },
  western_astrology: { id: 'western_astrology', name: '星月大師', title: '西洋占星', icon: '⭐', color: '#6366f1' },
  ziwei: { id: 'ziwei', name: '紫微真人', title: '紫微斗數', icon: '🏛', color: '#a855f7' },
  bazi: { id: 'bazi', name: '八字老先生', title: '八字命理', icon: '📿', color: '#22c55e' },
};

export function ReadingsStage() {
  const { result, hexagram, question, setStage, reset } = useFortuneStore();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const consensusRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 卡片依序彈入
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.master-card');
      staggerFadeIn(cards as unknown as HTMLElement[], { delay: 300, stagger: 150 });
    }

    // 共識區塊
    if (consensusRef.current) {
      staggerFadeIn(consensusRef.current, { delay: 1000 });
    }

    // 進度條和分數
    setTimeout(() => {
      if (progressRef.current && result?.consensus) {
        progressFill(progressRef.current, result.consensus.consensus_score);
      }
      if (scoreRef.current && result?.consensus) {
        countUp(scoreRef.current, result.consensus.consensus_score, { suffix: '%' });
      }
    }, 1200);
  }, [result]);

  if (!result) {
    return <div className="stage">載入中...</div>;
  }

  const handleReset = () => {
    reset();
    setStage('intro');
  };

  return (
    <div className="stage readings-stage">
      <div className="stars-bg" />
      
      <div className="readings-header">
        <h2>占卜結果</h2>
        <p className="question-echo">「{question}」</p>
        
        {hexagram && (
          <div className="hexagram-badge">
            {hexagram.upperTrigram.symbol}{hexagram.lowerTrigram.symbol} {hexagram.name}
          </div>
        )}
      </div>

      {/* 共識度 */}
      <div ref={consensusRef} className="consensus-section" style={{ opacity: 0 }}>
        <div className="consensus-header">
          <span>共識度</span>
          <span ref={scoreRef} className="consensus-score">0%</span>
        </div>
        <div className="consensus-bar">
          <div ref={progressRef} className="consensus-fill" style={{ width: 0 }} />
        </div>
        
        {result.consensus && (
          <p className="consensus-summary">{result.consensus.consensus_reading}</p>
        )}
      </div>

      {/* 四大師卡片 */}
      <div ref={cardsRef} className="masters-grid">
        {result.readings?.map((reading) => {
          const master = MASTERS[reading.master?.id as keyof typeof MASTERS] || {
            id: reading.master?.id || 'unknown',
            name: reading.master?.name || '大師',
            title: reading.master?.title || '',
            icon: '🔮',
            color: '#666',
          };
          
          return (
            <MasterCard
              key={master.id}
              master={master}
              reading={reading.reading || ''}
              aspects={reading.aspects}
              isExpanded={expandedCard === master.id}
              onToggle={() => setExpandedCard(
                expandedCard === master.id ? null : master.id
              )}
            />
          );
        })}
      </div>

      {/* 分歧 */}
      {result.consensus?.conflicts && result.consensus.conflicts.length > 0 && (
        <div className="conflicts-section">
          <h3>⚔️ 大師們的分歧</h3>
          <ul className="conflicts-list">
            {result.consensus.conflicts.map((conflict, i) => (
              <li key={i}>{conflict}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 行動按鈕 */}
      <div className="actions">
        <button className="action-btn secondary" onClick={handleReset}>
          🔄 再問一題
        </button>
        <button className="action-btn primary" onClick={() => {
          // TODO: 分享功能
          alert('分享功能開發中');
        }}>
          📤 分享結果
        </button>
      </div>

      <p className="disclaimer">僅供娛樂，不構成任何專業建議</p>
    </div>
  );
}
