import { useEffect, useRef, useState } from 'react';
import { BaguaScene } from './three/BaguaScene';
import { fadeSlideIn } from '../utils/animations';
import { useFortuneStore } from '../store/fortuneStore';
import { consultFortune } from '../api/fortune';

export function CastingStage() {
  const { hexagram, question, birthDate, birthTime, setResult, setError, setStage } = useFortuneStore();
  const [phase, setPhase] = useState<'casting' | 'interpreting'>('casting');
  const [statusText, setStatusText] = useState('正在為你起卦...');
  const infoRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (infoRef.current) {
      fadeSlideIn(infoRef.current, { delay: 500 });
    }
  }, []);

  // 起卦完成後，開始請求 API
  const handleCastingComplete = async () => {
    setPhase('interpreting');
    setStatusText('大師們正在解讀...');

    try {
      // 請求後端 API
      const response = await consultFortune({
        question,
        birth_date: birthDate,
        birth_time: birthTime || undefined,
        hexagram: hexagram ? {
          upper_trigram: hexagram.upperTrigram.name,
          lower_trigram: hexagram.lowerTrigram.name,
          changing_line: hexagram.changingLine,
          name: hexagram.name,
          changed_hexagram: hexagram.changedHexagram,
        } : undefined,
      });

      setResult(response);
      
      // 延遲一下再切換，讓用戶看到解讀完成
      setTimeout(() => {
        setStage('readings');
      }, 1000);
      
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : '發生錯誤，請重試');
      setStage('form');
    }
  };

  return (
    <div className="stage casting-stage">
      <BaguaScene hexagram={hexagram} onComplete={handleCastingComplete} />
      
      <div ref={infoRef} className="casting-info" style={{ opacity: 0 }}>
        <p ref={statusRef} className="casting-status">{statusText}</p>
        
        {hexagram && (
          <div className="hexagram-info">
            <div className="trigram-display">
              <span className="trigram upper">
                {hexagram.upperTrigram.symbol} {hexagram.upperTrigram.name}（{hexagram.upperTrigram.nature}）
              </span>
              <span className="trigram-divider">━━━</span>
              <span className="trigram lower">
                {hexagram.lowerTrigram.symbol} {hexagram.lowerTrigram.name}（{hexagram.lowerTrigram.nature}）
              </span>
            </div>
            
            <h3 className="hexagram-name">{hexagram.name}</h3>
            
            <p className="changing-line">
              動爻：第 {hexagram.changingLine} 爻
            </p>
          </div>
        )}

        {phase === 'interpreting' && (
          <div className="masters-loading">
            <div className="master-indicator meihua">梅花先生 解讀中...</div>
            <div className="master-indicator astro">星月大師 解讀中...</div>
            <div className="master-indicator ziwei">紫微真人 解讀中...</div>
            <div className="master-indicator bazi">八字老先生 解讀中...</div>
          </div>
        )}
      </div>
    </div>
  );
}
