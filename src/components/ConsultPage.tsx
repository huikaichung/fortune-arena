'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { StarField } from './three/StarField';
import styles from './ConsultPage.module.css';

const PERSPECTIVES = [
  { id: 'meihua', emoji: '🌸', name: '梅花易數', checked: true },
  { id: 'ziwei', emoji: '💜', name: '紫微斗數', checked: true },
  { id: 'bazi', emoji: '🔥', name: '八字命理', checked: true },
  { id: 'astro', emoji: '⭐', name: '西洋占星', checked: true },
  { id: 'humandesign', emoji: '🔺', name: '人類圖', checked: true },
];

export function ConsultPage() {
  const router = useRouter();
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | ''>('');
  const [perspectives, setPerspectives] = useState(PERSPECTIVES);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePerspectiveToggle = (id: string) => {
    setPerspectives(prev => 
      prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p)
    );
  };

  const validateForm = (): string | null => {
    if (!birthDate) return '請填寫出生日期';
    
    const date = new Date(birthDate);
    const now = new Date();
    if (date > now) return '出生日期不能是未來';
    if (date.getFullYear() < 1900) return '出生日期無效';
    
    const selectedPerspectives = perspectives.filter(p => p.checked);
    if (selectedPerspectives.length === 0) return '請至少選擇一個視角';
    
    // 人類圖需要精確時間
    if (perspectives.find(p => p.id === 'humandesign')?.checked && !birthTime) {
      return '人類圖需要精確的出生時間，請填寫或取消勾選人類圖';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      // TODO: 呼叫 API 生成使用說明書
      // const response = await generateManual({ ... });
      
      // 暫時模擬載入
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 導航到結果頁
      router.push('/manual/demo');
    } catch (err) {
      setError('生成失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <StarField />
      
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← 返回
        </Link>
        <h1>生成你的使用說明書</h1>
      </header>

      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={`card ${styles.form}`}>
          {error && (
            <div className={styles.error}>
              ❌ {error}
            </div>
          )}

          {/* 出生日期 */}
          <div className={styles.field}>
            <label htmlFor="birthDate">出生日期 *</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* 出生時間 */}
          <div className={styles.field}>
            <label htmlFor="birthTime">
              出生時間
              <span className={styles.hint}>（人類圖需要精確時間）</span>
            </label>
            <input
              type="time"
              id="birthTime"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>

          {/* 出生地點 */}
          <div className={styles.field}>
            <label htmlFor="birthPlace">出生地點</label>
            <input
              type="text"
              id="birthPlace"
              value={birthPlace}
              onChange={(e) => setBirthPlace(e.target.value)}
              placeholder="例：台北市"
            />
          </div>

          {/* 性別 */}
          <div className={styles.field}>
            <label>性別</label>
            <div className={styles.radioGroup}>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                <span>男</span>
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
                <span>女</span>
              </label>
            </div>
          </div>

          {/* 進階選項 */}
          <button
            type="button"
            className={styles.advancedToggle}
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? '▼' : '▶'} 進階選項：選擇視角
          </button>

          {showAdvanced && (
            <div className={styles.perspectives}>
              {perspectives.map((p) => (
                <label key={p.id} className={styles.perspectiveCheckbox}>
                  <input
                    type="checkbox"
                    checked={p.checked}
                    onChange={() => handlePerspectiveToggle(p.id)}
                  />
                  <span className={`tag tag-${p.id}`}>
                    {p.emoji} {p.name}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* 提交按鈕 */}
          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                生成中...
              </>
            ) : (
              '✨ 生成使用說明書'
            )}
          </button>

          <p className={styles.privacy}>
            🔒 你的資料不會被儲存，僅用於即時分析
          </p>
        </form>
      </main>
    </div>
  );
}
