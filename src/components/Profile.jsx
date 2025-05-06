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
                フロントエンド開発が中心のエンジニアとして、要件定義から詳細設計までの開発経験を持ち、
                SEO・マーケティングの知識も兼ね備えています。23年のIT業界での経験を活かし、
                プロジェクトマネジメントにも従事。
              </p>
              
              <h3 className="profile-heading">経験・知識・技術</h3>
              <div className="profile-item">
                <h4>マーケティング</h4>
                <p>
                  ECサイトにて主にGoogleAnalyticsを使用しサイトの流入改善を行いコンテンツの作成・改善を行い製品の売り上げアップの経験があり、
                  それを応用しサイトやブランドの認知度アップなどを行ってまいりました。
                  一部単一ワードは10年たった現在も上位を保っています。
                  リスティング広告を行いランディングページを作成した際はサイト解析をもとにABテストを行い売り上げのアップに貢献いたしました。
                </p>
              </div>
              
              <div className="profile-item">
                <h4>プロジェクトマネジメント</h4>
                <p>
                  Webディレクタとしてスケジュール管理・進捗管理を経験しています。
                  現場によって外部協力会社や他チームと連携を行いスムーズなサイト作成を遂行を行ってまいりました。
                  またチームメンバーの困りごとなどを拾い上げ、チームパフォーマンスの最適解を常に求めていました。
                </p>
              </div>
              
              <div className="profile-item">
                <h4>業務知識・開発経験</h4>
                <p>
                  サイトの制作開発に関しましてフロントエンド開発を主に従事しバックエンドのAPI開発なども同時並行で行っておりました。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Profile;