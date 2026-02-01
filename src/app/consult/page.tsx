import { Metadata } from 'next';
import { ConsultPage } from '@/components/ConsultPage';

export const metadata: Metadata = {
  title: '生成使用說明書 | 你的使用說明書',
  description: '輸入出生資料，生成專屬於你的人生使用說明書',
};

export default function Consult() {
  return <ConsultPage />;
}
