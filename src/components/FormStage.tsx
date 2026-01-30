import { useEffect, useRef, useState } from 'react';
import { fadeSlideIn } from '../utils/animations';
import { useFortuneStore } from '../store/fortuneStore';
import { castByQuestion } from '../types/hexagram';

export function FormStage() {
  const { 
    question, setQuestion, 
    birthDate, setBirthDate, 
    birthTime, setBirthTime,
    setHexagram, setStage 
  } = useFortuneStore();
  
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (formRef.current) {
      fadeSlideIn(formRef.current, { delay: 100 });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim() || !birthDate) {
      return;
    }

    setIsSubmitting(true);
    
    // 起卦
    const hex = castByQuestion(question);
    setHexagram(hex);
    
    // 短暫延遲後進入起卦動畫
    setTimeout(() => {
      setStage('casting');
    }, 300);
  };

  return (
    <div className="stage form-stage">
      <div className="stars-bg" />
      
      <div ref={formRef} className="form-card" style={{ opacity: 0 }}>
        <h2 className="form-title">你想問什麼？</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="輸入你的問題...（例如：今天適合告白嗎？）"
              className="question-input"
              rows={3}
              maxLength={200}
            />
            <div className="char-count">{question.length}/200</div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>📅 出生日期 *</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="date-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label>🕐 出生時間（選填）</label>
              <input
                type="time"
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="time-input"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={!question.trim() || !birthDate || isSubmitting}
          >
            {isSubmitting ? '正在起卦...' : '🔮 開始占卜'}
          </button>
        </form>

        <p className="disclaimer">僅供娛樂，不構成任何專業建議</p>
      </div>
    </div>
  );
}
