'use client';

import Link from 'next/link';
import styles from './ChatPage.module.css';

export function ChatPage() {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h2 className={styles.title}>對話功能即將推出</h2>
        <p className={styles.description}>
          我們正在打造更深入的對話體驗，讓你可以和自己的說明書互動。
        </p>
        <Link href="/" className="btn btn-ghost">
          返回首頁
        </Link>
      </div>
    </div>
  );
}
