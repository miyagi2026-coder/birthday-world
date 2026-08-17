import Head from 'next/head';
import { useEffect, useState } from 'react';
import {
  getZodiac,
  birthstones,
  birthflowers,
  messages,
  famousPeople,
  historicalEvents,
  defaultFamous,
  supportedLangs,
  langNames,
} from '../../../../data/birthdays';

// ── Static Paths & Props ──────────────────────────────────
export async function getStaticPaths() {
  const paths = [];
  for (const lang of supportedLangs) {
    for (let m = 1; m <= 12; m++) {
      const daysInMonth = new Date(2024, m, 0).getDate(); // 2024 is a leap year
      for (let d = 1; d <= daysInMonth; d++) {
        paths.push({
          params: {
            lang,
            month: String(m).padStart(2, '0'),
            day:   String(d).padStart(2, '0'),
          },
        });
      }
    }
  }
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { lang, month, day } = params;
  const m = parseInt(month, 10);
  const d = parseInt(day, 10);
  const key = `${m}-${d}`;

  const zodiac  = getZodiac(m, d);
  const stone   = birthstones[m];
  const flower  = birthflowers[m];
  const famous  = famousPeople[key] || null;
  const history = historicalEvents[key] || null;

  return {
    props: { lang, month: m, day: d, zodiac, stone, flower, famous, history },
  };
}

// ── Component ─────────────────────────────────────────────
export default function BirthdayPage({ lang, month, day, zodiac, stone, flower, famous, history }) {
  const t = messages[lang] || messages['en'];
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // 月名（日本語）
  const monthJa = ['','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const monthEn = ['','January','February','March','April','May','June','July','August','September','October','November','December'];

  const dateLabel = lang === 'ja'
    ? `${monthJa[month]}${day}日`
    : `${monthEn[month]} ${day}`;

  const shareText = encodeURIComponent(t.shareText(month, day));
  const shareUrl  = `https://twitter.com/intent/tweet?text=${shareText}`;

  const famousList = famous || defaultFamous;

  // OGP
  const pageTitle = `${dateLabel} | Birthday World`;
  const pageDesc  = lang === 'ja'
    ? `${dateLabel}生まれのあなたへ。誕生石・星座・今日生まれの有名人も。`
    : `Happy Birthday to you born on ${dateLabel}! Discover your birthstone, zodiac, and famous people.`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Noto+Sans+JP:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7572849961321548"
          crossOrigin="anonymous"
        />
      </Head>

      <style global jsx>{`
        :root {
          --night: #0d0d1a;
          --deep: #12102b;
          --gold: #e8c84a;
          --gold-dim: #a8893a;
          --rose: #e86b8a;
          --sky: #6baee8;
          --cream: #f5f0e8;
          --muted: #8a8aaa;
          --card: rgba(255,255,255,0.04);
          --border: rgba(232,200,74,0.18);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: var(--night);
          color: var(--cream);
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          overflow-x: hidden;
        }
        @keyframes twinkle {
          from { opacity: 0.1; transform: scale(0.8); }
          to   { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes flicker {
          0%   { opacity: 0.8; transform: scale(0.97); }
          100% { opacity: 1;   transform: scale(1.03); }
        }
      `}</style>

      {/* Stars canvas */}
      {mounted && <StarField />}

      <div style={styles.wrap}>

        {/* Language switcher */}
        <nav style={styles.langNav}>
          {supportedLangs.map(l => (
            <a
              key={l}
              href={`/birthday/${l}/${String(month).padStart(2,'0')}/${String(day).padStart(2,'0')}`}
              style={{ ...styles.langBtn, ...(l === lang ? styles.langBtnActive : {}) }}
            >
              {langNames[l]}
            </a>
          ))}
        </nav>

        {/* Hero */}
        <div style={styles.hero}>
          <div style={styles.datePill}>{dateLabel}</div>
          <div style={styles.candles}>🎂</div>
          <h1 style={styles.h1}>{t.heroTitle(month, day)}</h1>
          <p style={styles.sub}>{t.heroSub}</p>

          <div style={styles.messageBox}>
            <p>{t.msg1}</p>
            <p style={{ marginTop: 14 }}>{t.msg2}</p>
          </div>
        </div>

        <Divider />

        {/* Info cards */}
        <div style={styles.infoGrid}>
          <InfoCard icon="✨" label={t.zodiacLabel} value={`${zodiac[lang] || zodiac.en} ${zodiac.symbol}`} note={zodiac.en} />
          <InfoCard icon="💎" label={t.stoneLabel}  value={stone?.[lang] || stone?.en} note={stone?.en} />
          <InfoCard icon={flower?.emoji || '🌸'} label={t.flowerLabel} value={flower?.ja || flower?.en} note={flower?.en} />
          <InfoCard icon="🌍" label={t.celebLabel}  value={t.celebValue} note={t.celebNote} />
        </div>

        {/* Famous people */}
        <SectionTitle icon="🌟" title={t.famousTitle} />
        <ul style={styles.famousList}>
          {famousList.map((f, i) => (
            <li key={i} style={styles.famousItem}>
              <span style={styles.famousYear}>{f.year}</span>
              <div>
                <div style={styles.famousName}>{typeof f.name === 'object' ? (f.name[lang] || f.name.en) : f.name}</div>
                <div style={styles.famousRole}>{typeof f.role === 'object' ? (f.role[lang] || f.role.en) : f.role}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Historical events */}
        {history && history.length > 0 && (
          <>
            <SectionTitle icon="📜" title={t.historyTitle} />
            <ul style={{ ...styles.famousList, marginBottom: 16 }}>
              {history.map((ev, i) => (
                <li key={i} style={{ ...styles.famousItem, borderColor: ev.type === 'sad' ? 'rgba(232,107,138,0.2)' : 'rgba(107,232,107,0.2)' }}>
                  <span style={{ ...styles.famousYear, color: ev.type === 'sad' ? '#e86b8a' : '#6be88a' }}>{ev.year}</span>
                  <div style={styles.famousName}>{ev.text[lang] || ev.text.en}</div>
                </li>
              ))}
            </ul>
            <div style={styles.birthdayClosing}>
              {t.birthdayClosing}
            </div>
          </>
        )}

        {/* AdSense */}
        <div style={styles.giftSection}>
          <div style={styles.giftHeader}>
            <span style={{ fontSize: 36 }}>✨</span>
            <div>
              <div style={styles.giftTitle}>{t.giftTitle}</div>
              <div style={styles.giftSub}>{t.giftSub}</div>
            </div>
          </div>
          <div style={styles.adBlock}>
            {/* Google AdSense */}
            <ins
              className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-7572849961321548"
              data-ad-slot="7157775568"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>

        {/* Miracle message */}
        <div style={styles.miracleSection}>
          <div style={styles.miracleInner}>
            <div style={{ fontSize: 36, marginBottom: 16, animation: 'flicker 2.5s ease-in-out infinite alternate' }}>🕯️</div>
            <h2 style={styles.miracleTitle}>{t.miracleTitle}</h2>
            <p style={styles.miracleText}>
              {t.miracleText.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </p>
            <div style={styles.miracleLangs}>
              <span>생명은 축복입니다</span>
              <span>·</span>
              <span>生命是奇迹</span>
              <span>·</span>
              <span>A vida é um milagre</span>
              <span>·</span>
              <span>La vie est un miracle</span>
            </div>
          </div>
        </div>

        {/* Share */}
        <div style={styles.shareArea}>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
            {lang === 'ja' ? 'あなたも誰かの誕生日を祝ってあげましょう' : 'Share the love with someone born today!'}
          </p>
          <a href={shareUrl} target="_blank" rel="noopener noreferrer" style={styles.shareBtn}>
            {t.shareBtn}
          </a>
        </div>

        <footer style={styles.footer}>
          <p>Happy Birthday to Everyone Born Today © 2026 KAZUMIYA</p>
          <p style={{ marginTop: 6 }}>{t.footerText}</p>
          <p style={{ marginTop: 6, fontSize: 10 }}>
            <a href="https://www.unicef.org" target="_blank" rel="noopener noreferrer" style={{ color: '#44445a', textDecoration: 'none' }}>
              🌍 A portion of revenue is donated to UNICEF
            </a>
          </p>
          <p style={{ marginTop: 6 }}>
            <a href="/privacy" style={{ color: '#44445a', textDecoration: 'none' }}>
              プライバシーポリシー / Privacy Policy
            </a>
          </p>      
        </footer>

      </div>
    </>
  );
}

// ── Sub-components ────────────────────────────────────────

function StarField() {
  useEffect(() => {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.4 + 0.3,
      speed: Math.random() * 0.006 + 0.002,
      phase: Math.random() * Math.PI * 2,
    }));

    let raf;
    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const op = 0.15 + 0.7 * (0.5 + 0.5 * Math.sin(t * 0.001 * s.speed * 100 + s.phase));
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
    <canvas
      id="starfield"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

function Divider() {
  return (
    <div style={{ textAlign: 'center', margin: '48px 0', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
      <span style={{ background: 'var(--night)', padding: '0 16px', fontSize: 18, position: 'relative' }}>✦</span>
    </div>
  );
}

function SectionTitle({ icon, title }) {
  return (
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: 'var(--gold)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
      {icon} {title}
    </div>
  );
}

function InfoCard({ icon, label, value, note }) {
  return (
    <div style={styles.infoCard}>
      <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
      <div style={styles.infoLabel}>{label}</div>
      <div style={styles.infoValue}>{value}</div>
      <div style={styles.infoNote}>{note}</div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────
const styles = {
  wrap: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 720,
    margin: '0 auto',
    padding: '0 24px 80px',
  },
  langNav: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    padding: '20px 0 0',
  },
  langBtn: {
    padding: '4px 12px',
    borderRadius: 100,
    border: '1px solid rgba(232,200,74,0.2)',
    color: '#8a8aaa',
    fontSize: 12,
    textDecoration: 'none',
    transition: 'all 0.2s',
  },
  langBtnActive: {
    color: '#e8c84a',
    borderColor: '#e8c84a',
    background: 'rgba(232,200,74,0.08)',
  },
  hero: {
    textAlign: 'center',
    padding: '60px 0 56px',
  },
  datePill: {
    display: 'inline-block',
    fontSize: 11,
    letterSpacing: '0.25em',
    color: '#e8c84a',
    textTransform: 'uppercase',
    border: '1px solid rgba(232,200,74,0.18)',
    padding: '6px 20px',
    borderRadius: 100,
    marginBottom: 36,
  },
  candles: {
    fontSize: 52,
    lineHeight: 1,
    marginBottom: 28,
    display: 'block',
    animation: 'float 3s ease-in-out infinite',
  },
  h1: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 'clamp(28px, 5vw, 48px)',
    fontWeight: 400,
    lineHeight: 1.2,
    marginBottom: 12,
    background: 'linear-gradient(135deg, #e8c84a, #e86b8a, #6baee8)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  },
  sub: {
    fontSize: 14,
    color: '#8a8aaa',
    letterSpacing: '0.08em',
    marginBottom: 40,
  },
  messageBox: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(232,200,74,0.18)',
    borderRadius: 16,
    padding: '32px',
    fontSize: 15,
    lineHeight: 2,
    color: '#d8d0f0',
    textAlign: 'left',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 16,
    marginBottom: 48,
  },
  infoCard: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(232,200,74,0.18)',
    borderRadius: 14,
    padding: '24px 20px',
    transition: 'transform 0.2s',
  },
  infoLabel: {
    fontSize: 10,
    letterSpacing: '0.2em',
    color: '#a8893a',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 17,
    fontWeight: 500,
    color: '#f5f0e8',
  },
  infoNote: {
    fontSize: 12,
    color: '#8a8aaa',
    marginTop: 4,
    lineHeight: 1.5,
  },
  famousList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 48,
    padding: 0,
  },
  famousItem: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(232,200,74,0.18)',
    borderRadius: 10,
    padding: '16px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    fontSize: 14,
  },
  famousYear: {
    fontSize: 11,
    color: '#a8893a',
    width: 36,
    flexShrink: 0,
    textAlign: 'center',
    background: 'rgba(232,200,74,0.08)',
    borderRadius: 6,
    padding: '4px 0',
  },
  famousName: {
    fontWeight: 500,
    color: '#f5f0e8',
  },
  famousRole: {
    color: '#8a8aaa',
    fontSize: 12,
    marginTop: 2,
  },
  giftSection: {
    marginBottom: 48,
  },
  giftHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'linear-gradient(135deg, rgba(232,200,74,0.08), rgba(232,107,138,0.08))',
    border: '1px solid rgba(232,200,74,0.18)',
    borderRadius: '16px 16px 0 0',
    padding: '24px 28px',
  },
  giftTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    color: '#e8c84a',
    marginBottom: 4,
  },
  giftSub: {
    fontSize: 13,
    color: '#8a8aaa',
    lineHeight: 1.6,
  },
  adBlock: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px dashed rgba(255,255,255,0.1)',
    borderTop: 'none',
    borderRadius: '0 0 16px 16px',
    padding: '32px',
    textAlign: 'center',
    color: '#8a8aaa',
    fontSize: 12,
    minHeight: 100,
  },
  birthdayClosing: {
    background: 'linear-gradient(135deg, rgba(232,200,74,0.08), rgba(107,174,232,0.08))',
    border: '1px solid rgba(232,200,74,0.25)',
    borderRadius: 14,
    padding: '20px 24px',
    fontSize: 15,
    color: '#f5f0e8',
    lineHeight: 1.8,
    textAlign: 'center',
    marginBottom: 48,
  },
  miracleSection: {
    marginBottom: 48,
  },
  miracleInner: {
    background: 'linear-gradient(160deg, rgba(107,174,232,0.07), rgba(232,107,138,0.07), rgba(232,200,74,0.07))',
    border: '1px solid rgba(107,174,232,0.25)',
    borderRadius: 20,
    padding: '40px 32px',
    textAlign: 'center',
  },
  miracleTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 400,
    color: '#6baee8',
    marginBottom: 24,
    letterSpacing: '0.05em',
  },
  miracleText: {
    fontSize: 15,
    lineHeight: 2.2,
    color: '#d8d0f0',
    marginBottom: 24,
  },
  miracleLangs: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    fontSize: 12,
    color: '#6a6a8a',
    letterSpacing: '0.05em',
  },
  shareArea: {
    textAlign: 'center',
    marginBottom: 48,
  },
  shareBtn: {
    display: 'inline-block',
    padding: '14px 32px',
    background: 'linear-gradient(135deg, rgba(232,200,74,0.13), rgba(232,107,138,0.13))',
    border: '1px solid rgba(232,200,74,0.18)',
    borderRadius: 100,
    color: '#e8c84a',
    fontSize: 14,
    cursor: 'pointer',
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
};
