'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { StarField } from './three/StarField';
import styles from './ChatPage.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  '今日運勢如何？',
  '這件事該怎麼決定？',
  '幫我分析這段關係',
  '我最近為什麼這麼累？',
];

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！有什麼想聊的嗎？我已經讀過你的使用說明書了 ✨\n\n我可以結合你的命盤資訊，幫你分析問題、提供建議。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // TODO: 呼叫真實 API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `讓我從你的使用說明書來看這個問題...\n\n作為一位「投射者」，你在做決定時最重要的是「等待被邀請」和「獲得認可」。\n\n從你的問題來看，這可能是一個需要耐心等待的時機。你的情緒權威提醒你：不要在情緒高點或低點做重大決定。\n\n💡 建議：給自己 24-48 小時沈澱，感受身體的直覺反應。`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      // Error handling
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <StarField />

      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>☰</Link>
        <h1>AI 顧問</h1>
        <Link href="/manual/demo" className={styles.manualLink}>📖 說明書</Link>
      </header>

      <main className={styles.main}>
        <div className={styles.messages}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${styles[message.role]}`}
            >
              {message.role === 'assistant' && (
                <span className={styles.avatar}>🤖</span>
              )}
              <div className={styles.bubble}>
                <p>{message.content}</p>
              </div>
              {message.role === 'user' && (
                <span className={styles.avatar}>👤</span>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className={`${styles.message} ${styles.assistant}`}>
              <span className={styles.avatar}>🤖</span>
              <div className={styles.bubble}>
                <span className={styles.typing}>思考中...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className={styles.footer}>
        {/* Quick prompts */}
        <div className={styles.quickPrompts}>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              className={styles.quickPrompt}
              onClick={() => handleSend(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputWrapper}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="輸入你的問題..."
            rows={1}
            disabled={isLoading}
          />
          <button
            className={styles.sendBtn}
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
          >
            送出
          </button>
        </div>
      </footer>
    </div>
  );
}
