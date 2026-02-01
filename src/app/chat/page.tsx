import { Metadata } from 'next';
import { ChatPage } from '@/components/ChatPage';

export const metadata: Metadata = {
  title: 'AI 顧問 | 你的使用說明書',
  description: '與 AI 顧問對話，結合你的使用說明書獲得個人化建議',
};

export default function Chat() {
  return <ChatPage />;
}
