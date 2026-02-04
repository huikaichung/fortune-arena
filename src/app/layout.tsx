import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '你的使用說明書 | 從多重視角認識自己',
  description: '結合占星、八字、紫微、人類圖與心理學，生成專屬於你的人格分析報告。免費、不儲存資料。',
  keywords: ['人格分析', '命理', '人類圖', '紫微斗數', '八字', '占星', '使用說明書', '自我認識', '心理學'],
  authors: [{ name: 'SelfKit' }],
  openGraph: {
    title: '你的使用說明書',
    description: '從多重視角認識真正的自己',
    type: 'website',
    locale: 'zh_TW',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
