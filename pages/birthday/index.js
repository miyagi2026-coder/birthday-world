import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supportedLangs } from '../../data/birthdays';

export default function BirthdayIndex() {
  const router = useRouter();

  useEffect(() => {
    // ブラウザ言語を検出
    const browserLang = (navigator.language || 'en').toLowerCase().split('-')[0];
    const lang = supportedLangs.includes(browserLang) ? browserLang : 'en';

    // 今日の日付を取得
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day   = String(now.getDate()).padStart(2, '0');

    router.replace(`/birthday/${lang}/${month}/${day}`);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0d1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#f5f0e8',
      fontFamily: 'sans-serif',
      fontSize: '18px',
    }}>
      🎂 Loading your birthday page...
    </div>
  );
}
