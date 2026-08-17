export default function PrivacyPolicy() {
  return (
    <>
      <head>
        <title>プライバシーポリシー | Birthday World</title>
        <meta name="description" content="Birthday Worldのプライバシーポリシーです。" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>

      <div style={wrap}>
        <a href="/birthday/" style={backLink}>← Birthday World トップへ</a>
        <h1 style={h1}>プライバシーポリシー</h1>
        <p style={updated}>最終更新日：2026年8月17日</p>

        <S title="1. 基本方針">
          当サイト「Birthday World」は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。本プライバシーポリシーでは、当サイトにおける情報の収集・利用方法についてご説明します。
        </S>

        <S title="2. 運営者情報">
          サイト名：Birthday World<br/>
          運営：KAZUMIYA<br/>
          お問い合わせ：下記「10. お問い合わせ」をご参照ください。
        </S>

        <S title="3. 収集する情報">
          当サイトは以下の情報を自動的に収集する場合があります：<br/><br/>
          ・アクセスログ（IPアドレス、ブラウザの種類、アクセス日時）<br/>
          ・Cookie情報（広告配信・アクセス解析のため）<br/>
          ・ブラウザの言語設定（表示言語の自動判定のため）<br/><br/>
          当サイトは、氏名・住所・電話番号などの個人を特定できる情報を収集しておりません。
        </S>

        <S title="4. Google AdSenseについて">
          当サイトではGoogle AdSenseによる広告配信を行っています。Google AdSenseは、ユーザーの興味に応じた広告を表示するためにCookieを使用します。<br/><br/>
          ・GoogleはCookieを使用して、ユーザーの過去のアクセス情報に基づいて広告を配信します。<br/>
          ・ユーザーはGoogleの広告設定ページにてパーソナライズ広告を無効にできます。<br/>
          ・詳細はGoogleのポリシーと規約（https://policies.google.com/technologies/ads）をご確認ください。
        </S>

        <S title="5. Cookieについて">
          当サイトは、Google AdSense・アクセス解析のためにCookieを使用しています。Cookieはブラウザの設定から無効にすることができます。ただし、Cookieを無効にした場合、一部の機能が正常に動作しない場合があります。
        </S>

        <S title="6. アクセス解析ツールについて">
          当サイトでは、サービス改善のためにアクセス解析ツールを使用する場合があります。アクセス解析ツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
        </S>

        <S title="7. 第三者へのリンクについて">
          当サイトには外部サイトへのリンクが含まれる場合があります。リンク先のサイトのプライバシーポリシーについては、各サイトにてご確認ください。当サイトはリンク先について責任を負いません。
        </S>

        <S title="8. ユニセフへの寄付について">
          当サイトの広告収益の一部は、UNICEF（国連児童基金）への寄付に充てられます。寄付にあたってユーザーの個人情報が第三者に提供されることはありません。
        </S>

        <S title="9. プライバシーポリシーの変更">
          当サイトは、必要に応じて本プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当ページに掲載した時点より効力を生じるものとします。
        </S>

        <S title="10. お問い合わせ">
          本プライバシーポリシーに関するお問い合わせは、当サイトのXアカウントにてお受けしております。<br/><br/>
          運営：KAZUMIYA（個人名非公開）
        </S>

        <div style={footer}>
          <p>© 2026 Birthday World / KAZUMIYA</p>
          <p style={{marginTop:6}}><a href="/birthday/" style={{color:'#6baee8',textDecoration:'none'}}>← Birthday World トップへ戻る</a></p>
        </div>
      </div>
    </>
  );
}

function S({ title, children }) {
  return (
    <div style={section}>
      <h2 style={h2}>{title}</h2>
      <p style={content}>{children}</p>
    </div>
  );
}

const wrap    = { maxWidth:720, margin:'0 auto', padding:'40px 24px 80px', fontFamily:"'Noto Sans JP',sans-serif", background:'#0d0d1a', minHeight:'100vh', color:'#f5f0e8' };
const backLink= { display:'inline-block', color:'#e8c84a', textDecoration:'none', fontSize:13, marginBottom:40, opacity:0.8 };
const h1      = { fontSize:28, fontWeight:400, color:'#f5f0e8', marginBottom:8 };
const updated = { fontSize:12, color:'#8a8aaa', marginBottom:48 };
const section = { marginBottom:40, borderBottom:'1px solid rgba(255,255,255,0.06)', paddingBottom:40 };
const h2      = { fontSize:16, fontWeight:500, color:'#e8c84a', marginBottom:16, letterSpacing:'0.05em' };
const content = { fontSize:14, color:'#c8c0d8', lineHeight:1.9 };
const footer  = { textAlign:'center', fontSize:12, color:'#44445a', paddingTop:40, marginTop:40, borderTop:'1px solid rgba(255,255,255,0.05)' };
