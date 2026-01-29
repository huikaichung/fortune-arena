import { useState } from 'react';
import type { FortuneRequest } from '../types/fortune';

interface Props {
  onSubmit: (request: FortuneRequest) => void;
  isLoading: boolean;
}

export function FortuneForm({ onSubmit, isLoading }: Props) {
  const [question, setQuestion] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      question,
      birth_info: {
        birth_date: birthDate,
        birth_time: birthTime || undefined,
        birth_place: birthPlace || undefined,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="fortune-form">
      <div className="form-group">
        <label htmlFor="question">✨ 你想問什麼？</label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="例如：我今年的感情運勢如何？這份工作適合我嗎？"
          required
          minLength={5}
          maxLength={500}
          rows={4}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="birthDate">📅 出生日期 *</label>
          <input
            type="date"
            id="birthDate"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="birthTime">🕐 出生時間（可選）</label>
          <input
            type="time"
            id="birthTime"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="birthPlace">📍 出生地點（可選）</label>
        <input
          type="text"
          id="birthPlace"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
          placeholder="例如：台北市"
        />
      </div>

      <button type="submit" disabled={isLoading} className="submit-btn">
        {isLoading ? '🔮 大師們正在會診中...' : '🔮 開始占卜'}
      </button>
    </form>
  );
}
