import { Metadata } from 'next';
import { ChatPage } from '@/components/ChatPage';

export const metadata: Metadata = {
  title: '對話 | 你的使用說明書',
};

export default function Chat() {
  return <ChatPage />;
}
