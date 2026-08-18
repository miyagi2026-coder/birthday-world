// pages/birthday/index.js
// トップページ → 今日の日付・ブラウザ言語に自動リダイレクト

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supportedLangs } from '../../data/birthdays';

export default function BirthdayIndex() {
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

  return null;
}
