import { Metadata } from 'next';
import { HomePage } from '@/components/HomePage';

export const metadata: Metadata = {
  title: '你的使用說明書',
};

export default function Home() {
  return <HomePage />;
}
