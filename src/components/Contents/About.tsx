
import * as React from "react";
import "../../styles/Contents.scss";

interface IProps { }

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <section>
          <h2>About Me</h2>
          <p>Arch Linuxがさいきんすきです<br />
            Thinkpad見ると欲しくなります。</p>
          <h3> よくあるご質問に関しまして</h3>
          <p>ところどころ書く必要ないと思うかもしれませんが、実際あったので書いてます。</p>
          <dl>
            <dt>Q.Githubなど公開できるソースコードをお持ちの場合は　書類選考通過率を高めるためにいただけますでしょうか。</dt>
            <dd>A.GitHubで公開しているものに関しまして、環境構築用のDockerの設定ファイルぐらいしかなくソースコードという部分では無い状態です。
   https://github.com/ProblemaResolt/Problema
   基本個人開発のものはプライベートですし、チーム開発の場合はチームのGitを使います。
　ライブラリ開発など期待されている場合以外見せる理由が欲しいです。</dd>
          </dl>
          <dl>
            <dt>追記</dt>
            <dd>大したコードなどないんですけど、
                    大抵「見てらっしゃらない場合」 が多いので今後公開するつもりもないです。
          </dd>
          </dl>
          <dl>
            <dt>
              Q.ご経験されてきた技術について何点かご質問させてくださいませ。
画面HTMLをゼロから作成し、デザインデータをモックに反映することはできますか。</dt>
            <dd>
              A.デザインデータが何によるかになりますが、PhotoShopからHTMLとCSSで組むことはあります。ざっくりしてる質問が多いです、具体的または汎用的にどうしたいかという質問が欲しいです。
          </dd>
          </dl>
          <dl>
            <dt>
              Q.SPAの構築経験はありますか。またFWは何の経験がありますか。
          </dt>
            <dd>
              A.SPAに関しましては React + Redux とVue.jsに関しましては現在の現場で少し触っているぐらいで、ほとんどの業務はjQueryが主でした。状態管理とかは難しいです。Webpack や Parcel はようやく使い方がわかってきました...
      </dd>
          </dl>
          <dl>
            <dt>
              Q.jQueryを使用せずにJavaScriptでコーディングで行うことはできますか。</dt>
            <dd>
              A.Javascriptのバージョンによりますが、現在ES6以降は自信がありません。
                           ES2020とか全く分かりません。
　逆にjQueryをただただ毛嫌いしている現場の方との仕事は辛いです。</dd>
          </dl>
          <dl>
            <dt>
              Q.JSON、XML、CSVを扱った、通信に伴う処理を行うことができますか。</dt>
            <dd>
              A.Javascript Promise に関して全体像を把握しているかといわれると危ういです。
　<strong>Axios便利ですよね。</strong>
            </dd>
          </dl>
          <dl>
            <dt> Q.CSSプリプロセッサの使用経験はありますか。</dt>
            <dd>
              A.現場でSASS、SCSS、PostCssを使用しておりました。
                           チームで出来る人はSCSS、PostCssはリプレイスを行う際に利用しています。
　ただ大半の現場ではルール化ルール化とか言ってコロコロ変わるので曖昧な場合があると思ってます。</dd>
          </dl>
          <dl>
            <dt>
              Q.レスポンシブで画面制作できますか。</dt>
            <dd>
              A.よくこういう質問されます。
               レスポンシブに関しまして、CSSで制御かJSで制御かになりますが基本的にフレームワークに頼ります。
             デザイン次第だと思っています。</dd>
          </dl>
          <p>あえてめんどくさそうな人物に見える様に書きます。
            元々企業のブランディング戦略担当だったりなのですけど気づいたらフロントエンド業務ばかり紹介されます。本来はディレクタなんだけどな</p>
          <p>以上です。</p>        </section>
      </React.Fragment>
    );
  }
}
