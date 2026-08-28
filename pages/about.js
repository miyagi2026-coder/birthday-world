import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function About() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <Head>
        <title>Birthday Worldについて | About Birthday World</title>
        <meta name="description" content="Birthday Worldは、世界中の誕生日の方へ6言語でお祝いを届けるサイトです。どんな日に生まれても、あなたの命は奇跡です。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://birthday-world-theta.vercel.app/about" />
        <meta property="og:title" content="Birthday Worldについて | About Birthday World" />
        <meta property="og:description" content="世界中の誕生日の方へ6言語でお祝いを届けるサイト、Birthday Worldの想いをご紹介します。" />
        <meta property="og:url" content="https://birthday-world-theta.vercel.app/about" />
        <meta property="og:image" content="https://birthday-world-theta.vercel.app/ogp.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Noto+Sans+JP:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style global jsx>{`
        :root {
          --night: #0d0d1a;
          --gold: #e8c84a;
          --gold-dim: #a8893a;
          --rose: #e86b8a;
          --sky: #6baee8;
          --cream: #f5f0e8;
          --muted: #8a8aaa;
          --border: rgba(232,200,74,0.18);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: var(--night);
          color: var(--cream);
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 300;
          min-height: 100vh;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(0.8); }
          to { opacity: 0.9; transform: scale(1.2); }
        }
      `}</style>

      {mounted && <StarField />}

      <div style={styles.wrap}>

        {/* ヘッダー */}
        <div style={styles.hero}>
          <div style={styles.candles}>🎂</div>
          <h1 style={styles.h1}>Birthday World について</h1>
          <p style={styles.h1en}>About Birthday World</p>
        </div>

        {/* セクション1：サイトの想い */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🌍 このサイトの想い</h2>
          <div style={styles.card}>
            <p style={styles.p}>
              世界中のどこかで、今日も誰かが誕生日を迎えています。
            </p>
            <p style={styles.p}>
              Birthday Worldは、その一人ひとりに「生まれてきてくれてありがとう」という気持ちを届けたくて作られたサイトです。
            </p>
            <p style={styles.p}>
              どんな日に生まれても、どんな場所で生まれても、あなたがこの世界に存在することは、変わらない奇跡です。
            </p>
            <p style={styles.p}>
              有名人が生まれた日も、歴史的な出来事があった日も、あなたが生まれた日は、あなたにとって特別な日です。それは誰にも変えられません。
            </p>
          </div>
        </section>

        {/* セクション2：6言語の理由 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🌐 6言語で届ける理由</h2>
          <div style={styles.card}>
            <p style={styles.p}>
              Birthday Worldは、日本語・英語・スペイン語・中国語・韓国語・ポルトガル語の6言語に対応しています。
            </p>
            <p style={styles.p}>
              「おめでとう」という気持ちに、国境はありません。世界中の誕生日の方に、その方の言葉でお祝いを届けたい。それが6言語対応の理由です。
            </p>
            <div style={styles.langGrid}>
              {[
                { lang: '日本語', word: 'お誕生日おめでとう', flag: '🇯🇵' },
                { lang: 'English', word: 'Happy Birthday!', flag: '🇺🇸' },
                { lang: 'Español', word: '¡Feliz Cumpleaños!', flag: '🇪🇸' },
                { lang: '中文', word: '生日快乐！', flag: '🇨🇳' },
                { lang: '한국어', word: '생일 축하해요！', flag: '🇰🇷' },
                { lang: 'Português', word: 'Feliz Aniversário!', flag: '🇧🇷' },
              ].map((item) => (
                <div key={item.lang} style={styles.langCard}>
                  <div style={{ fontSize: 28 }}>{item.flag}</div>
                  <div style={{ fontSize: 12, color: 'var(--gold-dim)', marginTop: 6 }}>{item.lang}</div>
                  <div style={{ fontSize: 14, color: 'var(--cream)', marginTop: 4, fontWeight: 500 }}>{item.word}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* セクション3：コンテンツの紹介 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>✨ Birthday Worldでわかること</h2>
          <div style={styles.card}>
            <p style={styles.p}>あなたの誕生日を入力すると、以下の情報をご覧いただけます。</p>
            <div style={styles.featureGrid}>
              {[
                { icon: '⭐', title: '星座', desc: '生まれた日付から星座を表示します。' },
                { icon: '💎', title: '誕生石', desc: '生まれた月の誕生石をご紹介します。' },
                { icon: '🌸', title: '誕生花', desc: '生まれた月の誕生花をご紹介します。' },
                { icon: '🌟', title: '今日生まれの有名人', desc: '同じ誕生日の偉人・著名人をご紹介します。' },
                { icon: '📜', title: '今日の歴史的出来事', desc: 'その日に起きた出来事をご紹介します。' },
                { icon: '💌', title: 'あなたへのメッセージ', desc: '誕生日の方へ特別なメッセージをお届けします。' },
              ].map((item) => (
                <div key={item.title} style={styles.featureCard}>
                  <div style={{ fontSize: 32 }}>{item.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--gold)', marginTop: 10 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 6, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* セクション4：運営者について */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>👤 運営者について</h2>
          <div style={styles.card}>
            <p style={styles.p}>
              Birthday Worldは、<strong style={{ color: 'var(--gold)' }}>KAZUMIYA</strong>が個人で運営するサイトです。
            </p>
            <p style={styles.p}>
              「世界中の誕生日の人を毎日祝いたい」という想いから、このサイトを作りました。誰かの誕生日を祝うことで、世界が少しだけ温かくなると信じています。
            </p>
            <p style={styles.p}>
              運営に関するお問い合わせは、<a href="/contact" style={styles.link}>お問い合わせページ</a>よりご連絡ください。
            </p>
          </div>
        </section>

        {/* セクション5：ユニセフへの寄付 */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🌍 ユニセフへの寄付について</h2>
          <div style={{ ...styles.card, borderColor: 'rgba(107,174,232,0.3)' }}>
            <p style={styles.p}>
              Birthday Worldは、広告収益の一部を<strong style={{ color: 'var(--sky)' }}>ユニセフ（UNICEF）</strong>に寄付しています。
            </p>
            <p style={styles.p}>
              世界には、誕生日を祝ってもらえない環境で生きている子どもたちがいます。すべての命が等しく大切にされる世界を目指して、収益の一部を子どもたちの未来のために使います。
            </p>
            <p style={styles.p}>
              Birthday Worldをご覧いただくことが、世界中の子どもたちへの支援につながっています。ありがとうございます。
            </p>
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <a
                href="https://www.unicef.org"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.unicefBtn}
              >
                🌍 UNICEF 公式サイト
              </a>
            </div>
          </div>
        </section>

        {/* セクション6：誕生日ページへのリンク */}
        <section style={{ ...styles.section, textAlign: 'center' }}>
          <h2 style={styles.sectionTitle}>🎂 今日の誕生日ページを見る</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 24 }}>
            今日が誕生日のあなたへ、特別なメッセージをお届けします。
          </p>
          <a href="/birthday" style={styles.mainBtn}>
            今日の誕生日ページへ →
          </a>
        </section>

        <footer style={styles.footer}>
          <p>Happy Birthday to Everyone Born Today © 2026 KAZUMIYA</p>
          <p style={{ marginTop: 6 }}>
            <a href="/privacy" style={styles.footerLink}>プライバシーポリシー</a>
            {' / '}
            <a href="/contact" style={styles.footerLink}>お問い合わせ</a>
          </p>
        </footer>

      </div>
    </>
  );
}

function StarField() {
  useEffect(() => {
    const canvas = document.getElementById('starfield-about');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + 0.3,
      speed: Math.random() * 0.006 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));
    let raf;
    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const op = 0.1 + 0.6 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed * 100 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${op})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return (
    <canvas id="starfield-about" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
  );
}

const styles = {
  wrap: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 720,
    margin: '0 auto',
    padding: '0 24px 80px',
  },
  hero: {
    textAlign: 'center',
    padding: '60px 0 40px',
  },
  candles: {
    fontSize: 52,
    lineHeight: 1,
    marginBottom: 24,
    display: 'block',
    animation: 'float 3s ease-in-out infinite',
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(24px, 5vw, 40px)',
    fontWeight: 400,
    background: 'linear-gradient(135deg, #e8c84a, #e86b8a, #6baee8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 8,
  },
  h1en: {
    fontSize: 14,
    color: 'var(--muted)',
    letterSpacing: '0.15em',
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 400,
    color: 'var(--gold)',
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(232,200,74,0.18)',
    borderRadius: 16,
    padding: '28px 28px',
  },
  p: {
    fontSize: 15,
    lineHeight: 2,
    color: '#d8d0f0',
    marginBottom: 14,
  },
  langGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: 12,
    marginTop: 20,
  },
  langCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(232,200,74,0.15)',
    borderRadius: 12,
    padding: '16px 12px',
    textAlign: 'center',
  },
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
    marginTop: 20,
  },
  featureCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(232,200,74,0.15)',
    borderRadius: 12,
    padding: '20px 16px',
    textAlign: 'center',
  },
  link: {
    color: 'var(--gold)',
    textDecoration: 'none',
  },
  unicefBtn: {
    display: 'inline-block',
    padding: '12px 28px',
    background: 'rgba(107,174,232,0.1)',
    border: '1px solid rgba(107,174,232,0.3)',
    borderRadius: 100,
    color: 'var(--sky)',
    fontSize: 14,
    textDecoration: 'none',
    letterSpacing: '0.05em',
  },
  mainBtn: {
    display: 'inline-block',
    padding: '16px 36px',
    background: 'linear-gradient(135deg, rgba(232,200,74,0.15), rgba(232,107,138,0.15))',
    border: '1px solid rgba(232,200,74,0.3)',
    borderRadius: 100,
    color: 'var(--gold)',
    fontSize: 15,
    textDecoration: 'none',
    letterSpacing: '0.05em',
  },
  footer: {
    textAlign: 'center',
    fontSize: 11,
    color: '#44445a',
    paddingTop: 32,
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
  footerLink: {
    color: '#44445a',
    textDecoration: 'none',
  },
};
