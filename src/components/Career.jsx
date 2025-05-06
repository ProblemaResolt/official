import React from 'react';

const Career = () => {
  const careers = [
    {
      company: "NTS Japan",
      position: "SESエンジニア",
      period: "2018年01月 〜 現在",
      duties: "フロントエンド開発が中心。要件定義から詳細設計などの開発を経験。"
    },
    {
      company: "スタッフサービスエンジニアリング株式会社",
      position: "フロントエンド開発・SEO・広告担当",
      period: "2015年09月 〜 2017年09月",
      duties: "GoogleAnalyticsなどのサイトの解析を元にキャンペーンの企画を立案など"
    },
    {
      company: "ハンコヤドットコム",
      position: "フロントエンド開発・SEO担当",
      period: "2011年05月 〜 2015年08月",
      duties: "Google手動対応の解除担当、SEOにて単一ワード複数上位獲得、製品の売り上げを1.5倍達成"
    },
    {
      company: "株式会社BMC",
      position: "Web広告担当",
      period: "2011年01月 〜 2011年04月",
      duties: "ナイトレジャーのWeb広告出稿、イベント企画などに従事"
    },
    {
      company: "株式会社スターリンク",
      position: "HTMLコーダー",
      period: "2008年05月 〜 2010年12月",
      duties: "HTMLコーディング業務"
    },
    {
      company: "有限会社ハイテクラボ",
      position: "電子基板作成",
      period: "2006年02月 〜 2008年05月",
      duties: "電子基板作成、電子基板ケース作成"
    },
    {
      company: "有限会社ゲーム",
      position: "HTMLコーダー",
      period: "2002年04月 〜 2005年12月",
      duties: "HTMLコーディング業務"
    }
  ];

  return (
    <section id="career" className="section">
      <div className="container">
        <h2 className="section-title">職務経歴</h2>
        <div className="timeline">
          {careers.map((career, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-info">
                <span className="timeline-period">{career.period}</span>
              </div>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-company">{career.company}</h3>
                <h4 className="timeline-position">{career.position}</h4>
                <p className="timeline-duties">{career.duties}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Career;