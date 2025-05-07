import React from 'react';

const Profile = () => (
  <section id="profile" className="section">
    <div className="container">
      <h2 className="section-title">プロフィール</h2>
      <div className="row">
        <div className="column">
          <div className="profile-card">
            <div className="profile-content">
              <h3 className="profile-heading">職務要約</h3>
              <p>
                フロントエンド開発が中心のエンジニアとして、要件定義から詳細設計までの開発経験を持ち、<br />
                SEO・マーケティングの知識も兼ね備えています。23年のIT業界での経験を活かし、<br />
                プロジェクトマネジメントにも従事。
              </p>
              
              <h3 className="profile-heading">経験・知識・技術</h3>
              <div className="profile-item">
                <h4>マーケティング</h4>
                <p>
                  ECサイトにて主にGoogleAnalyticsを使用しサイトの流入改善を行いコンテンツの作成・改善を行い製品の売り上げアップの経験があり、
                  それを応用しサイトやブランドの認知度アップなどを行ってまいりました。<br />
                  一部単一ワードは10年たった現在も上位を保っています。<br />
                  リスティング広告を行いランディングページを作成した際はサイト解析をもとにABテストを行い売り上げのアップに貢献いたしました。
                </p>
              </div>
              
              <div className="profile-item">
                <h4>プロジェクトマネジメント</h4>
                <p>
                  Webディレクタとしてスケジュール管理・進捗管理を経験しています。<br />
                  現場によって外部協力会社や他チームと連携を行いスムーズなサイト作成を遂行を行ってまいりました。<br />
                  またチームメンバーの困りごとなどを拾い上げ、チームパフォーマンスの最適解を常に求めていました。<br />
                </p>
              </div>
              
              <div className="profile-item">
                <h4>業務知識・開発経験</h4>
                <p>
                  サイトの制作開発に関しましてフロントエンド開発を主に従事しバックエンドのAPI開発なども同時並行で行っておりました。
                </p>
              </div>

              <div className="social-links">
                <a href="https://www.linkedin.com/in/takahiro-yamamoto-07614391/" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/ProblemaResolt" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://x.com/ProblemaResolt" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <h2 className="section-title">自己PR</h2>
      <div className="pr-content">
        <div className="pr-item">
          <h3>マーケティングについて</h3>
          <p>
            SEOを中心としたサイト改善、コンテンツ作成など会社の魅力拡大については自信があります。<br />
            エンドユーザーがポジティブなイメージを持ってもらえることにより売り上げが上がった経験があります。<br />
            フロントエンドの開発などを経験しマーケティング自体にブランクはありますがキャッチアップなど行ってまいります。<br />
          </p>
        </div>
        <div className="pr-item">
          <h3>実装開発スキルについて</h3>
          <p>
            先述のマーケティングを行う際に当時は開発経験が少なく広い範囲でのサイト制作、<br />
            運営を行いたいという考えをもとに
            主にJavascriptやPHPを中心としたWebアプリケーションの開発を経験しています。<br />
            具体的には、ReactやVue.jsを使用したフロントエンド開発、<br />
            Laravel/CakePHPといったフレームワークを使用しての開発経験もあり、<br />
            SQLの知識を有していると自負しております。
          </p>
        </div>
      </div>
    
    <h2 className="section-title">自己PR</h2>
      <div className="pr-content">
        <div className="pr-item">
          <h3>【チームリーダー事例】進捗遅延メンバーの支援</h3>
          <p>
          進捗が遅れていたメンバーに対し、1on1で原因を聞き取り、設計意図の再確認と技術サポートを実施。<br />
          進行の遅れはチーム全体への影響が大きかったが、切り捨てず支援する方針をとった。<br />
          最終的に作業速度は改善し、スケジュール内で完了した。
          </p>
        </div>
        <div className="pr-item">
          <h3>【ディレクタ事例1】部門間のコミュニケーション支援</h3>
          <p>
          デザイナーとエンジニア間で仕様のすり合わせが不十分だったため、間に入り要件を整理。<br />
          伝達ミスによるリワークを削減し、両者の確認コストを下げた。。
          </p>
        </div>
        <div className="pr-item">
          <h3>【ディレクタ事例2】初学者メンバーのフォロー</h3>
          <p>
          デザイナーとエンジニア間で仕様のすり合わせが不十分だったため、間に入り要件を整理。<br />
          伝達ミスによるリワークを削減し、両者の確認コストを下げた。。
          </p>
        </div>
        <div className="pr-item">
          <h3>【マーケティング事例1】SEOペナルティ対応</h3>
          <p>
          原因不明だったSEO手動ペナルティに対し、施策を見直し再申請。<br />
          解除までのフローを整備し、他案件にも応用可能な社内ノウハウとして展開した。
          </p>
        </div>
        <div className="pr-item">
          <h3>【マーケティング事例2】SEO流入増加</h3>
          <p>
          ECサイトSEOの単体キーワード2014年より上位1，2位継続。<br />
          またコンテンツを作成。顧客のお悩みキーワードを選定しCTRとコンバージョンを増加。
          </p>
        </div>
      </div>
  </section>
);

export default Profile;