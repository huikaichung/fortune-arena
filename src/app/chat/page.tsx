import { Metadata } from 'next';
import { Suspense } from 'react';
import { ChatPage } from '@/components/ChatPage';

export const metadata: Metadata = {
  title: 'AI 顧問 | 你的使用說明書',
  description: '與 AI 顧問對話，結合你的使用說明書獲得個人化建議',
};

function ChatLoading() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'white'
    }}>
      載入中...
    </div>
  );
}

export default function Chat() {
  return (
    <Suspense fallback={<ChatLoading />}>
      <ChatPage />
    </Suspense>
  );
}
