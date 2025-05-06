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
    },
    {
      title: "サービス開発（業務委託）",
      period: "2019年09月 ~ 2022年12月",
      description: "コーダーとして配属でしたが社内確認や同じチームのデザイナーとの仕様決めなどのディレクタ業務も行っていました。",
      tasks: [
        "社外デジタルサイネージ開発（主にフロントエンドを担当）",
        "車両位置情報管理ツール開発バックエンドのAPIが更新されると駅や病院へ到着する電車やバスの時刻表や現在の位置を表示",
        "簡単なCakePHPのコント―ローラ、モデル等の作成"
      ],
      environment: "HTML,CSS2,CSS3,VBA,PHP（Laravel),Javascript（jQuery),PostgreSQL",
      role: "メンバー (要員数：2名, PJ全体：7名)"
    },
    {
      title: "社内サービス開発（業務委託）",
      period: "2019年09月 ~ 2022年12月",
      description: "コーダーとして配属社内確認や同じチームのデザイナーとの仕様決めなど　ディレクタ業務も担当。",
      tasks: [
        "勤怠管理システムやフロアマップ作成、機材管理ツールのフロントエンド担当",
        "他部署との連携や社内調整を行い、社内の要望や改善点をまとめ制作の仕様決めから制作まで行っていました。"
      ],
      environment: "HTML,CSS2,CSS3,PHP（Laravel),Javascript（jQuery,React,Vue),MySQL",
      role: "メンバー (要員数：2名, PJ全体：13名)"
    },
    {
      title: "ハウスメーカーのコンサルティング担当（派遣社員）",
      period: "2015年9月～2017年9月",
      description: "キャンペーンなどを主に担当し前回までのデータを照らし合わせるだけの単純な施策のみだったものを、ヒートマップやABテストツールなどを導入し、時期や顧客の動向などを調査したうえで、LPなどのUI、UXの改善を行ったところ前年比の1.3倍の申し込み者数が増えまたサイト内改善を行い工数削減を達成。",
      tasks: [
        "サイト企画立案",
        "企画書作成",
        "外部協力会社の進捗管理",
        "制作ディレクション、アライアンス交渉・契約締結",
        "プロモーション戦略立案・実行",
        "マーケティング提案（ABテストツール導入）"
      ],
      environment: "DreamWerver、Photoshop、HTML、CSS、PHP、Javascript、Apache、MySQL",
      role: "メンバー (要員数：2名, PJ全体：13名)"
    },
    {
      title: "自社ECサイトのコンテンツ作成、マーケティング（SEO）担当",
      period: "2011年5月～2015年8月",
      description: "社内SEOを中心にサーバ保守、サイトコーディング、企画運営",
      tasks: [
        "社内インハウスSEO",
        "フロントエンドサイトコーディング",
        "新商品制作の際SEOページの企画運営",
        "他部署との連携",
        "サイト解析",
        "リスティング広告担当"
      ],
      environment: "DreamWerver、Photoshop、HTML、CSS、PHP、Javascript、Apache、MySQL",
      role: "メンバー (要員数：2名, PJ全体：15名)"
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title">直近のプロジェクト</h2>
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