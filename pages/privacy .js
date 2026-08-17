import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>プライバシーポリシー | Birthday World</title>
        <meta name="description" content="Birthday Worldのプライバシーポリシーです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style global jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          background: #0d0d1a;
          color: #f5f0e8;
          font-family: 'Noto Sans JP', sans-serif;
          font-weight: 300;
          min-height: 100vh;
          line-height: 1.8;
        }
      `}</style>

      <div style={styles.wrap}>
        <a href="/birthday/" style={styles.backLink}>← Birthday World トップへ</a>

        <h1 style={styles.h1}>プライバシーポリシー</h1>
        <p style={styles.updated}>最終更新日：2026年8月17日</p>

        <Section title="1. 基本方針">
          <p>Birthday World（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーでは、当サイトにおける情報の収集・利用方法についてご説明します。</p>
        </Section>

        <Section title="2. 運営者情報">
          <p>サイト名：Birthday World</p>
          <p>運営：KAZUMIYA</p>
          <p>お問い合わせ：下記「お問い合わせ」セクションをご参照ください。</p>
        </Section>

        <Section title="3. 収集する情報">
          <p>当サイトは、以下の情報を自動的に収集する場合があります：</p>
          <ul style={styles.ul}>
            <li>アクセスログ（IPアドレス、ブラウザの種類、アクセス日時）</li>
            <li>Cookie情報（広告配信・アクセス解析のため）</li>
            <li>ブラウザの言語設定（表示言語の自動判定のため）</li>
          </ul>
          <p>当サイトは、氏名・住所・電話番号などの個人を特定できる情報を収集しておりません。</p>
        </Section>

        <Section title="4. Google AdSenseについて">
          <p>当サイトでは、Google AdSenseによる広告配信を行っています。Google AdSenseは、ユーザーの興味に応じた広告を表示するためにCookieを使用します。</p>
          <ul style={styles.ul}>
            <li>GoogleはCookieを使用して、ユーザーがそのサイトや他のサイトに以前アクセスした際の情報に基づいて広告を配信します。</li>
            <li>ユーザーはGoogleの広告設定ページにてパーソナライズ広告を無効にできます。</li>
            <li>また、<a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer" style={styles.link}>www.aboutads.info</a>にアクセスすることで、第三者配信事業者がCookieを使用することを無効にできます。</li>
          </ul>
          <p>詳細は<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={styles.link}>Googleのポリシーと規約</a>をご確認ください。</p>
        </Section>

        <Section title="5. Cookieについて">
          <p>当サイトは、Google AdSense・アクセス解析のためにCookieを使用しています。Cookieはブラウザの設定から無効にすることができます。ただし、Cookieを無効にした場合、一部の機能が正常に動作しない場合があります。</p>
        </Section>

        <Section title="6. アクセス解析ツールについて">
          <p>当サイトでは、サービス改善のためにアクセス解析ツールを使用する場合があります。アクセス解析ツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。</p>
        </Section>

        <Section title="7. 第三者へのリンクについて">
          <p>当サイトには、外部サイトへのリンクが含まれる場合があります。リンク先のサイトのプライバシーポリシーについては、各サイトにてご確認ください。当サイトは、リンク先のサイトについて責任を負いません。</p>
        </Section>

        <Section title="8. ユニセフへの寄付について">
          <p>当サイトの広告収益の一部は、UNICEF（国連児童基金）への寄付に充てられます。寄付にあたってユーザーの個人情報が第三者に提供されることはありません。</p>
        </Section>

        <Section title="9. プライバシーポリシーの変更">
          <p>当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当ページに掲載した時点より効力を生じるものとします。</p>
        </Section>

        <Section title="10. お問い合わせ">
          <p>本プライバシーポリシーに関するお問い合わせは、当サイトのXアカウントまたは下記メールアドレスにてお受けしております。</p>
          <p style={{ marginTop: 8 }}>運営：KAZUMIYA（個人名非公開）</p>
        </Section>

        <footer style={styles.footer}>
          <p>© 2026 Birthday World / KAZUMIYA</p>
          <p style={{ marginTop: 6 }}>
            <a href="/birthday/" style={styles.link}>← Birthday World トップへ戻る</a>
          </p>
        </footer>
      </div>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section style={styles.section}>
      <h2 style={styles.h2}>{title}</h2>
      <div style={styles.content}>{children}</div>
    </section>
  );
}

const styles = {
  wrap: {
    maxWidth: 720,
    margin: '0 auto',
    padding: '40px 24px 80px',
  },
  backLink: {
    display: 'inline-block',
    color: '#e8c84a',
    textDecoration: 'none',
    fontSize: 13,
    marginBottom: 40,
    opacity: 0.8,
  },
  h1: {
    fontSize: 28,
    fontWeight: 400,
    color: '#f5f0e8',
    marginBottom: 8,
  },
  updated: {
    fontSize: 12,
    color: '#8a8aaa',
    marginBottom: 48,
  },
  section: {
    marginBottom: 40,
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    paddingBottom: 40,
  },
  h2: {
    fontSize: 16,
    fontWeight: 500,
    color: '#e8c84a',
    marginBottom: 16,
    letterSpacing: '0.05em',
  },
  content: {
    fontSize: 14,
    color: '#c8c0d8',
    lineHeight: 1.9,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  ul: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  link: {
    color: '#6baee8',
    textDecoration: 'none',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#44445a',
    paddingTop: 40,
    marginTop: 40,
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
};
