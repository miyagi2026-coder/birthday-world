export default function Contact() {
  return (
    <>
      <style>{`
        body {
          background: #0d0d1a;
          color: #f5f0e8;
          font-family: 'Noto Sans JP', sans-serif;
          margin: 0;
          padding: 0;
        }
        .wrap {
          max-width: 680px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }
        h1 {
          font-size: 28px;
          font-weight: 400;
          color: #e8c84a;
          margin-bottom: 8px;
        }
        .sub {
          font-size: 13px;
          color: #8a8aaa;
          margin-bottom: 40px;
        }
        .card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(232,200,74,0.18);
          border-radius: 16px;
          padding: 32px;
          margin-bottom: 32px;
        }
        .card p {
          font-size: 14px;
          line-height: 2;
          color: #d8d0f0;
          margin-bottom: 24px;
        }
        .form-frame {
          width: 100%;
          height: 553px;
          border: none;
          border-radius: 8px;
          background: white;
        }
        .back-link {
          display: inline-block;
          color: #e8c84a;
          font-size: 13px;
          text-decoration: none;
          margin-top: 16px;
        }
        .back-link:hover { text-decoration: underline; }
      `}</style>

      <div className="wrap">
        <h1>お問い合わせ / Contact</h1>
        <p className="sub">運営：KAZUMIYA — Birthday World</p>

        <div className="card">
          <p>
            ご意見・ご要望・不具合のご報告など、お気軽にお送りください。<br />
            Feel free to send us your feedback, suggestions, or bug reports.
          </p>
          <iframe
            className="form-frame"
            src="https://docs.google.com/forms/d/e/1FAIpQLScSo4G3WgApYfE3shOpkS01bCHuoLN_7mfTg-BJRKS-IgF4Vw/viewform?embedded=true"
            title="お問い合わせフォーム"
          >
            読み込んでいます…
          </iframe>
        </div>

        <a className="back-link" href="/">← トップに戻る / Back to Top</a>
      </div>
    </>
  );
}
