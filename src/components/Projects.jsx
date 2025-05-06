import React, { useState } from 'react';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      title: "Windowインフラ管理業務",
      period: "2024年9月 ~ 現在",
      description: "LDAPサーバとActiveDirectoryを使用したOffice365のアカウントエラーの調査解消業務。",
      tasks: ["インシデント報告", "インシデント調査"],
      environment: "Windows PowerShell, SQL Management Studio, EXCEL, sakura Editor",
      role: "PL (要員数：1名, PJ全体：6名)"
    },
    {
      title: "学校CMS サイトリニューアル業務",
      period: "2024年06月 ~ 2024年08月",
      description: "公立学校が使用するCMSサービス フロントエンド改修業務。",
      tasks: [
        "フロントエンド改修業務", 
        "CMSフロントエンドのLivewireおよびjQuery、Alpine.js CSS の改修業務",
        "通常ライブラリにないコンポーネントの作成（DatePickerの作成）",
        "CSSの修正",
        "そのほか必要な独自ライブラリの作成など"
      ],
      environment: "HTML, CSS2, CSS3, Javascript（Livewires)、PHP（Laravel)",
      role: "メンバー (要員数：4名, PJ全体：20名)"
    },
    {
      title: "ホテル業務システム リニューアル業務",
      period: "2024年01月 ~ 2024年05月",
      description: "ホテル業務システムをVBAからJavaSpringbootへ改修業務。",
      tasks: [
        "Restful API 作成",
        "単体テストコード 作成",
        "仕様書作成（基本設計、詳細設計作成）",
        "テスト仕様書作成",
        "ドキュメント作成&整理"
      ],
      environment: "Javascript（angular), Java(JavaSpringBoot)",
      role: "メンバー (要員数：1名, PJ全体：20名)"
    },
    {
      title: "サイト運営＆改修業務",
      period: "2023年01月 ~ 2023年09月",
      description: "日本における開発の指示書の作成などを主に行っておりました。ディレクタチームのサブリーダーとしてオフショアのベトナムに要件の指示書などを作成や動作確認などを行っておりました。",
      tasks: [
        "オフショア（ベトナム）へディレクション業務",
        "ページ制作 指示書作成",
        "他チームとの連携や調整業務",
        "コードレビュー",
        "AWSパイプラインを用いステージングまでのデプロイ担当",
        "業務ドキュメント整理",
        "Figmaを使ったコンポーネント整理",
        "CXツール Karteなどを用いたサイト計測",
        "計測チーム＆マーケティングチームと連携しABテストやアンケート機能の実装"
      ],
      environment: "Javascript（jQuery), React(Next.js)",
      role: "メンバー (要員数：2名, PJ全体：40名)"
    },
    {
      title: "レジャープラットフォーム サイトリニューアル業務",
      period: "2022年08月 ~ 2022年12月",
      description: "サブリーダー兼教育係。未経験者が多い現場で、レビューや教育を主に行っておりました。",
      tasks: [
        "未経験者 コーダーの教育",
        "コードレビュー（HTML5,CSS3,ドキュメント作成指導）",
        "WBSを用いた進捗管理",
        "他チームとの連携や調整業務",
        "業務フロー作成",
        "業務ドキュメント整理",
        "要件定義（基本設計、詳細設計作成）",
        "コンポーネント作成",
        "Figmaを使ったコンポーネント整理"
      ],
      environment: "HTML5, Javascript, CSS3",
      role: "メンバー (要員数：15名, PJ全体：60名)"
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">主要プロジェクト</h2>
        <div className="project-nav">
          {projects.map((project, index) => (
            <button
              key={index}
              className={`button ${activeProject === index ? 'button-primary' : 'button-outline'}`}
              onClick={() => setActiveProject(index)}
            >
              {project.title}
            </button>
          ))}
        </div>
        <div className="project-detail">
          <h3>{projects[activeProject].title}</h3>
          <p className="project-period">{projects[activeProject].period}</p>
          <p className="project-description">{projects[activeProject].description}</p>
          <h4>担当業務:</h4>
          <ul className="project-tasks">
            {projects[activeProject].tasks.map((task, idx) => (
              <li key={idx}>{task}</li>
            ))}
          </ul>
          <div className="project-meta">
            <p><strong>環境:</strong> {projects[activeProject].environment}</p>
            <p><strong>役割:</strong> {projects[activeProject].role}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;