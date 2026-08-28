import Head from 'next/head';
import { useEffect, useState, useRef } from 'react';
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
import { happyMessages } from '../../../../data/happyMessages';

// ── Static Paths & Props ──────────────────────────────────
export async function getStaticPaths() {
  const paths = [];
  for (const lang of supportedLangs) {
    for (let m = 1; m <= 12; m++) {
      const daysInMonth = new Date(2024, m, 0).getDate();
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
  const happyMsg = happyMessages[key] || null;

  return {
    props: { lang, month: m, day: d, zodiac, stone, flower, famous, history, happyMsg },
  };
}

// ── Happy Message Button Component ────────────────────────
function HappyMessageBox({ happyMsg, lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const layerRef = useRef(null);

  const EMOJIS = ['🌸','⭐','🌼','💛','🌺','✨','🌻','💕','🌷','💫','🌟','🎀'];

  const btnLabels = {
    ja: '🎁 あなただけの幸せメッセージ',
    en: '🎁 Your Special Happy Message',
    es: '🎁 Tu Mensaje Especial de Felicidad',
    zh: '🎁 属于你的幸福留言',
    ko: '🎁 당신만을 위한 행복 메시지',
    pt: '🎁 Sua Mensagem Especial de Felicidade',
  };

  const msgLabel = {
    ja: '✦ あなたへのメッセージ ✦',
    en: '✦ YOUR HAPPY MESSAGE ✦',
    es: '✦ TU MENSAJE FELIZ ✦',
    zh: '✦ 专属于你的留言 ✦',
    ko: '✦ 당신을 위한 메시지 ✦',
    pt: '✦ SUA MENSAGEM FELIZ ✦',
  };

  function spawnParticles() {
    const layer = layerRef.current;
    if (!layer) return;
    layer.innerHTML = '';
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        if (!layer) return;
        const el = document.createElement('div');
        const size = Math.random() * 8 + 10;
        const duration = Math.random() * 2.5 + 2;
        const delay = Math.random() * 1.5;
        el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
        el.style.cssText = `
          position:absolute;
          left:${Math.random()*100}%;
          top:-30px;
          font-size:${size}px;
          animation:happyFall ${duration}s ${delay}s linear forwards;
          opacity:0;
          pointer-events:none;
        `;
        el.addEventListener('animationend', () => el.remove());
        layer.appendChild(el);
      }, i * 30);
    }
  }

  function toggle() {
    const next = !isOpen;
    setIsOpen(next);
    if (next) spawnParticles();
  }

  if (!happyMsg) return null;

  return (
    <>
      <style>{`
        @keyframes happyFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .happy-btn {
          width: 100%;
          padding: 18px;
          border-radius: 16px;
          border: 1.5px solid rgba(232,200,74,0.4);
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          font-size: 15px;
          font-weight: 500;
          color: #f5f0e8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
          font-family: 'Noto Sans JP', sans-serif;
          margin-bottom: 0;
        }
        .happy-btn:hover { border-color: #e8c84a; background: rgba(232,200,74,0.06); }
        .happy-btn.open  { border-color: #e8c84a; background: rgba(232,200,74,0.06); }
        .happy-chevron { transition: transform 0.4s; font-size: 12px; color: #8a8aaa; }
        .happy-chevron.open { transform: rotate(180deg); }
        .happy-box {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: max-height 0.7s ease, opacity 0.5s ease, margin 0.3s ease;
          margin-top: 0;
        }
        .happy-box.open {
          max-height: 600px;
          opacity: 1;
          margin-top: 16px;
        }
        .happy-inner {
          padding: 32px 28px;
          border-radius: 16px;
          border: 1px solid rgba(232,200,74,0.35);
          background: rgba(255,255,255,0.04);
          text-align: center;
        }
        .happy-icon { font-size: 40px; margin-bottom: 14px; animation: float 3s ease-in-out infinite; }
        .happy-label { font-size: 11px; letter-spacing: 0.2em; color: #e8c84a; margin-bottom: 18px; }
        .happy-main { font-size: 15px; line-height: 2.2; color: #f5f0e8; margin-bottom: 14px; }
        .happy-sub  { font-size: 12px; color: #8a8aaa; line-height: 1.9; margin-bottom: 8px; }
      `}</style>

      <div style={{ position: 'relative', marginBottom: 48 }}>
        {/* パーティクルレイヤー */}
        <div
          ref={layerRef}
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}
        />

        <button className={`happy-btn${isOpen ? ' open' : ''}`} onClick={toggle}>
          <span>{btnLabels[lang] || btnLabels.en}</span>
          <span className={`happy-chevron${isOpen ? ' open' : ''}`}>▼</span>
        </button>

        <div className={`happy-box${isOpen ? ' open' : ''}`}>
          <div className="happy-inner">
            <div className="happy-icon">🌟</div>
            <div className="happy-label">{msgLabel[lang] || msgLabel.en}</div>
            <div className="happy-main">{happyMsg[lang] || happyMsg.en}</div>
            {lang !== 'en' && happyMsg.en && (
              <div className="happy-sub">{happyMsg.en}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
// ── ShareSection コンポーネント ────────────────────────────
// [day].js の shareArea 部分をこれに置き換える

function ShareSection({ lang, month, day, happyMsg }) {
  const [userMsg, setUserMsg] = useState('');

  const monthEn = ['','January','February','March','April','May','June','July','August','September','October','November','December'];
  const monthJa = ['','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  const dateLabel = lang === 'ja'
    ? `${monthJa[month]}${day}日`
    : `${monthEn[month]} ${day}`;

  const pageUrl = `https://birthday-world-theta.vercel.app/birthday/${lang}/${String(month).padStart(2,'0')}/${String(day).padStart(2,'0')}`;

  // 言語別テキスト
  const ui = {
    ja: {
      placeholder: '一言メッセージを入れてみよう（例：誕生日おめでとう！）',
      sendLabel: 'あなたも誰かの誕生日を祝ってあげましょう🎂',
      lineBtn: '💚 LINEで送る',
      xBtn: '𝕏 Xでシェア',
      lineMsg: (msg) =>
        `🎂 ${dateLabel}生まれのあなたへ\n\n${msg ? msg + '\n\n' : ''}✨ 誕生花・誕生石・今日生まれの有名人、そして特別なメッセージが届いています🌸\n\n▶ ${pageUrl}\n\n#誕生日おめでとう #HappyBirthday`,
      xMsg: (msg) =>
        `🎂 ${dateLabel}生まれのあなたへ${msg ? '\n\n' + msg : ''}\n\n誕生花・誕生石・今日生まれの有名人✨\n▶ ${pageUrl}\n\n#誕生日おめでとう #HappyBirthday #BirthdayWorld`,
    },
    en: {
      placeholder: 'Add a personal message (e.g. Happy Birthday! Thinking of you!)',
      sendLabel: 'Share the love with someone born today 🎂',
      lineBtn: '💚 Send via LINE',
      xBtn: '𝕏 Share on X',
      lineMsg: (msg) =>
        `🎂 To someone born on ${dateLabel}\n\n${msg ? msg + '\n\n' : ''}✨ Birth flower, birthstone & famous people born today — plus a special message 🌸\n\n▶ ${pageUrl}\n\n#HappyBirthday #BirthdayWorld`,
      xMsg: (msg) =>
        `🎂 Happy Birthday to everyone born on ${dateLabel}!${msg ? '\n\n' + msg : ''}\n\nBirthstone, birth flower & famous people ✨\n▶ ${pageUrl}\n\n#HappyBirthday #BirthdayWorld`,
    },
    es: {
      placeholder: 'Añade un mensaje personal (ej: ¡Feliz cumpleaños!)',
      sendLabel: 'Comparte el amor con alguien que cumple años hoy 🎂',
      lineBtn: '💚 Enviar por LINE',
      xBtn: '𝕏 Compartir en X',
      lineMsg: (msg) =>
        `🎂 Para alguien nacido el ${dateLabel}\n\n${msg ? msg + '\n\n' : ''}✨ Flor, piedra natal y famosos nacidos hoy — más un mensaje especial 🌸\n\n▶ ${pageUrl}\n\n#FelizCumpleaños #HappyBirthday`,
      xMsg: (msg) =>
        `🎂 ¡Feliz cumpleaños a todos los nacidos el ${dateLabel}!${msg ? '\n\n' + msg : ''}\n\nFlor, piedra natal y famosos ✨\n▶ ${pageUrl}\n\n#FelizCumpleaños #HappyBirthday`,
    },
    zh: {
      placeholder: '添加一句祝福（例：生日快乐！祝你幸福！）',
      sendLabel: '把祝福送给今天生日的人吧 🎂',
      lineBtn: '💚 用LINE发送',
      xBtn: '𝕏 分享到X',
      lineMsg: (msg) =>
        `🎂 致${dateLabel}出生的你\n\n${msg ? msg + '\n\n' : ''}✨ 生日花、诞生石和今天出生的名人，还有专属的幸福留言🌸\n\n▶ ${pageUrl}\n\n#生日快乐 #HappyBirthday`,
      xMsg: (msg) =>
        `🎂 祝所有${dateLabel}出生的人生日快乐！${msg ? '\n\n' + msg : ''}\n\n诞生石、生日花和名人 ✨\n▶ ${pageUrl}\n\n#生日快乐 #HappyBirthday`,
    },
    ko: {
      placeholder: '한마디 메시지를 추가해보세요 (예: 생일 축하해! 항상 응원해!)',
      sendLabel: '오늘 생일인 누군가에게 축하를 전해보세요 🎂',
      lineBtn: '💚 LINE으로 보내기',
      xBtn: '𝕏 X에서 공유',
      lineMsg: (msg) =>
        `🎂 ${dateLabel}에 태어난 당신에게\n\n${msg ? msg + '\n\n' : ''}✨ 탄생화, 탄생석, 오늘 태어난 유명인, 그리고 특별한 메시지가 있어요🌸\n\n▶ ${pageUrl}\n\n#생일축하해 #HappyBirthday`,
      xMsg: (msg) =>
        `🎂 ${dateLabel}에 태어난 모든 분들, 생일 축하합니다!${msg ? '\n\n' + msg : ''}\n\n탄생석, 탄생화, 유명인 ✨\n▶ ${pageUrl}\n\n#생일축하해 #HappyBirthday`,
    },
    pt: {
      placeholder: 'Adicione uma mensagem pessoal (ex: Feliz aniversário! Te amo!)',
      sendLabel: 'Compartilhe o amor com alguém que faz aniversário hoje 🎂',
      lineBtn: '💚 Enviar pelo LINE',
      xBtn: '𝕏 Compartilhar no X',
      lineMsg: (msg) =>
        `🎂 Para quem nasceu em ${dateLabel}\n\n${msg ? msg + '\n\n' : ''}✨ Flor do nascimento, pedra natal e famosos nascidos hoje — mais uma mensagem especial 🌸\n\n▶ ${pageUrl}\n\n#FelizAniversário #HappyBirthday`,
      xMsg: (msg) =>
        `🎂 Feliz aniversário a todos nascidos em ${dateLabel}!${msg ? '\n\n' + msg : ''}\n\nPedra natal, flor e famosos ✨\n▶ ${pageUrl}\n\n#FelizAniversário #HappyBirthday`,
    },
  };

  const u = ui[lang] || ui.en;

  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(u.lineMsg(userMsg))}`;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(u.xMsg(userMsg))}`;

  return (
    <>
      <style>{`
        .share-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(232,200,74,0.25);
          border-radius: 12px;
          padding: 14px 18px;
          color: #f5f0e8;
          font-size: 14px;
          font-family: 'Noto Sans JP', sans-serif;
          resize: none;
          outline: none;
          transition: border-color 0.2s;
          line-height: 1.7;
        }
        .share-input::placeholder { color: #6a6a8a; }
        .share-input:focus { border-color: rgba(232,200,74,0.6); }
        .share-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 16px;
        }
        .btn-line {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: linear-gradient(135deg, rgba(0,185,0,0.15), rgba(0,185,0,0.08));
          border: 1px solid rgba(0,185,0,0.4);
          border-radius: 100px;
          color: #00c300;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: all 0.2s;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .btn-line:hover { background: rgba(0,185,0,0.2); transform: scale(1.03); }
        .btn-x {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: linear-gradient(135deg, rgba(232,200,74,0.13), rgba(232,107,138,0.13));
          border: 1px solid rgba(232,200,74,0.3);
          border-radius: 100px;
          color: #e8c84a;
          font-size: 14px;
          text-decoration: none;
          letter-spacing: 0.05em;
          transition: all 0.2s;
          font-family: 'Noto Sans JP', sans-serif;
        }
        .btn-x:hover { background: rgba(232,200,74,0.2); transform: scale(1.03); }
      `}</style>

      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
          {u.sendLabel}
        </p>

        {/* 一言メッセージ入力 */}
        <textarea
          className="share-input"
          rows={2}
          placeholder={u.placeholder}
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          maxLength={100}
        />

        {/* シェアボタン */}
        <div className="share-btns">
          <a href={lineUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
            {u.lineBtn}
          </a>
          <a href={xUrl} target="_blank" rel="noopener noreferrer" className="btn-x">
            {u.xBtn}
          </a>
        </div>
      </div>
    </>
  );
}

// ── [day].js の shareArea 部分を以下に置き換える ──────────
// 変更前：
//   <div style={styles.shareArea}>
//     <p ...>{lang === 'ja' ? 'あなたも...' : 'Share...'}</p>
//     <a href={shareUrl} ...>{t.shareBtn}</a>
//   </div>
//
// 変更後：
//   <ShareSection lang={lang} month={month} day={day} happyMsg={happyMsg} />
//
// ※ useStateのインポートはすでにある前提
// ── Component ─────────────────────────────────────────────
export default function BirthdayPage({ lang, month, day, zodiac, stone, flower, famous, history, happyMsg }) {
  const t = messages[lang] || messages['en'];
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const monthJa = ['','1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];
  const monthEn = ['','January','February','March','April','May','June','July','August','September','October','November','December'];

  const dateLabel = lang === 'ja'
    ? `${monthJa[month]}${day}日`
    : `${monthEn[month]} ${day}`;

  const shareText = encodeURIComponent(t.shareText(month, day));
  const shareUrl  = `https://twitter.com/intent/tweet?text=${shareText}`;

  const famousList = famous || defaultFamous;

  const pageTitle = `${dateLabel} | Birthday World`;
  const pageDesc  = lang === 'ja'
    ? `${dateLabel}生まれのあなたへ。誕生石・星座・今日生まれの有名人も。`
    : `Happy Birthday to you born on ${dateLabel}! Discover your birthstone, zodiac, and famous people.`;

  const ogpImage = 'https://birthday-world-theta.vercel.app/ogp.png';
  const canonicalUrl = `https://birthday-world-theta.vercel.app/birthday/${lang}/${String(month).padStart(2,'0')}/${String(day).padStart(2,'0')}`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image" content={ogpImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="Birthday World" />
        <meta property="og:locale" content={lang === 'ja' ? 'ja_JP' : lang === 'zh' ? 'zh_CN' : lang === 'ko' ? 'ko_KR' : lang === 'pt' ? 'pt_BR' : lang === 'es' ? 'es_ES' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={ogpImage} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Noto+Sans+JP:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
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

      {mounted && <StarField />}

      <div style={styles.wrap}>

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

        <div style={styles.infoGrid}>
          <InfoCard icon="✨" label={t.zodiacLabel} value={`${zodiac[lang] || zodiac.en} ${zodiac.symbol}`} note={zodiac.en} />
          <InfoCard icon="💎" label={t.stoneLabel}  value={stone?.[lang] || stone?.en} note={stone?.en} />
          <InfoCard icon={flower?.emoji || '🌸'} label={t.flowerLabel} value={flower?.ja || flower?.en} note={flower?.en} />
          <InfoCard icon="🌍" label={t.celebLabel}  value={t.celebValue} note={t.celebNote} />
        </div>

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
            <div style={styles.birthdayClosing}>{t.birthdayClosing}</div>
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

        {/* ★ 幸せメッセージ（AdSenseの下） */}
        <HappyMessageBox happyMsg={happyMsg} lang={lang} />

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
              <span>생명은 축복입니다</span><span>·</span>
              <span>生命是奇迹</span><span>·</span>
              <span>A vida é um milagre</span><span>·</span>
              <span>La vie est un miracle</span>
            </div>
          </div>
        </div>

       <ShareSection lang={lang} month={month} day={day} happyMsg={happyMsg} />
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
                <p style={{ marginTop: 6 }}>
  <a href="/about" style={{ color: '#44445a', textDecoration: 'none' }}>
    Birthday Worldについて / About
  </a>
</p>
          </p>
          <p style={{ marginTop: 6 }}>
            <a href="/contact" style={{ color: '#44445a', textDecoration: 'none' }}>
              お問い合わせ / Contact
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
    <canvas id="starfield" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />
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
  wrap: { position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 24px 80px' },
  langNav: { display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', padding: '20px 0 0' },
  langBtn: { padding: '4px 12px', borderRadius: 100, border: '1px solid rgba(232,200,74,0.2)', color: '#8a8aaa', fontSize: 12, textDecoration: 'none', transition: 'all 0.2s' },
  langBtnActive: { color: '#e8c84a', borderColor: '#e8c84a', background: 'rgba(232,200,74,0.08)' },
  hero: { textAlign: 'center', padding: '60px 0 56px' },
  datePill: { display: 'inline-block', fontSize: 11, letterSpacing: '0.25em', color: '#e8c84a', textTransform: 'uppercase', border: '1px solid rgba(232,200,74,0.18)', padding: '6px 20px', borderRadius: 100, marginBottom: 36 },
  candles: { fontSize: 52, lineHeight: 1, marginBottom: 28, display: 'block', animation: 'float 3s ease-in-out infinite' },
  h1: { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400, lineHeight: 1.2, marginBottom: 12, background: 'linear-gradient(135deg, #e8c84a, #e86b8a, #6baee8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  sub: { fontSize: 14, color: '#8a8aaa', letterSpacing: '0.08em', marginBottom: 40 },
  messageBox: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,200,74,0.18)', borderRadius: 16, padding: '32px', fontSize: 15, lineHeight: 2, color: '#d8d0f0', textAlign: 'left' },
  infoGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 48 },
  infoCard: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,200,74,0.18)', borderRadius: 14, padding: '24px 20px', transition: 'transform 0.2s' },
  infoLabel: { fontSize: 10, letterSpacing: '0.2em', color: '#a8893a', textTransform: 'uppercase', marginBottom: 6 },
  infoValue: { fontSize: 17, fontWeight: 500, color: '#f5f0e8' },
  infoNote: { fontSize: 12, color: '#8a8aaa', marginTop: 4, lineHeight: 1.5 },
  famousList: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48, padding: 0 },
  famousItem: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(232,200,74,0.18)', borderRadius: 10, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14, fontSize: 14 },
  famousYear: { fontSize: 11, color: '#a8893a', width: 36, flexShrink: 0, textAlign: 'center', background: 'rgba(232,200,74,0.08)', borderRadius: 6, padding: '4px 0' },
  famousName: { fontWeight: 500, color: '#f5f0e8' },
  famousRole: { color: '#8a8aaa', fontSize: 12, marginTop: 2 },
  giftSection: { marginBottom: 48 },
  giftHeader: { display: 'flex', alignItems: 'center', gap: 16, background: 'linear-gradient(135deg, rgba(232,200,74,0.08), rgba(232,107,138,0.08))', border: '1px solid rgba(232,200,74,0.18)', borderRadius: '16px 16px 0 0', padding: '24px 28px' },
  giftTitle: { fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#e8c84a', marginBottom: 4 },
  giftSub: { fontSize: 13, color: '#8a8aaa', lineHeight: 1.6 },
  adBlock: { background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderTop: 'none', borderRadius: '0 0 16px 16px', padding: '32px', textAlign: 'center', color: '#8a8aaa', fontSize: 12, minHeight: 100 },
  birthdayClosing: { background: 'linear-gradient(135deg, rgba(232,200,74,0.08), rgba(107,174,232,0.08))', border: '1px solid rgba(232,200,74,0.25)', borderRadius: 14, padding: '20px 24px', fontSize: 15, color: '#f5f0e8', lineHeight: 1.8, textAlign: 'center', marginBottom: 48 },
  miracleSection: { marginBottom: 48 },
  miracleInner: { background: 'linear-gradient(160deg, rgba(107,174,232,0.07), rgba(232,107,138,0.07), rgba(232,200,74,0.07))', border: '1px solid rgba(107,174,232,0.25)', borderRadius: 20, padding: '40px 32px', textAlign: 'center' },
  miracleTitle: { fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: '#6baee8', marginBottom: 24, letterSpacing: '0.05em' },
  miracleText: { fontSize: 15, lineHeight: 2.2, color: '#d8d0f0', marginBottom: 24 },
  miracleLangs: { display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 12, color: '#6a6a8a', letterSpacing: '0.05em' },
  shareArea: { textAlign: 'center', marginBottom: 48 },
  shareBtn: { display: 'inline-block', padding: '14px 32px', background: 'linear-gradient(135deg, rgba(232,200,74,0.13), rgba(232,107,138,0.13))', border: '1px solid rgba(232,200,74,0.18)', borderRadius: 100, color: '#e8c84a', fontSize: 14, cursor: 'pointer', textDecoration: 'none', letterSpacing: '0.05em' },
  footer: { textAlign: 'center', fontSize: 11, color: '#44445a', paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.05)' },
};
