'use client';

import Link from 'next/link';

export function ChatPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <p style={{ fontSize: '2rem' }}>💬</p>
      <h2>AI 顧問（即將推出）</h2>
      <p style={{ color: '#8B95A9' }}>
        對話功能正在開發中，敬請期待
      </p>
      <Link href="/" className="btn btn-ghost">
        ← 返回首頁
      </Link>
    </div>
  );
}
