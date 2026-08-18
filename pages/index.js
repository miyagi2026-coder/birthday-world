// pages/index.js
// サイトルート（/）→ /birthday/ にリダイレクト

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supportedLangs } from '../data/birthdays';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // ブラウザ言語を取得
    const browserLang = navigator.language?.split('-')[0] || 'ja';
    const lang = supportedLangs.includes(browserLang) ? browserLang : 'ja';

    // 今日の日付を取得
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    // リダイレクト
    router.replace(`/birthday/${lang}/${month}/${day}`);
  }, []);

  // SEO用のローディング表示（一瞬だけ表示される）
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#e8c84a',
      fontSize: '24px',
    }}>
      🎂
    </div>
  );
}
