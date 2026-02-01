import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '你的使用說明書 | 從五大視角認識自己',
  description: '結合梅花易數、紫微斗數、八字命理、西洋占星、人類圖，生成專屬於你的人生使用說明書。用心理學視角解讀，讓洞見更實用。',
  keywords: ['算命', '命理', '人類圖', '紫微斗數', '八字', '占星', '使用說明書', '自我認識'],
  authors: [{ name: 'SelfKit' }],
  openGraph: {
    title: '你的使用說明書',
    description: '從五大視角認識真正的自己',
    type: 'website',
    locale: 'zh_TW',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '你的使用說明書',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '你的使用說明書',
    description: '從五大視角認識真正的自己',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
