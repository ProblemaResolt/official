
import * as React from "react";
import "../../styles/Contents.scss";
import { Link } from "react-scroll";

interface IProps { }

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <section id="topWrap">
          <h2>Career</h2>
          <ul>
            <li>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                to="vallabo"
              >
                直近
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                to="cygaems"
              >
                さいきん
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                to="toyotamedia"
              >
                そのまえ
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                spy={true}
                smooth={true}
                offset={-70}
                duration={800}
                to="hankoya"
              >
                もうすこしまえ
              </Link>
            </li>
          </ul>
          <h3 id="vallabo">直近</h3>
          <table>
            <thead>
              <tr>
                <th>企業名</th>
                <td>Val研究所</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>業態</th>
                <td>常駐委託</td>
              </tr>
              <tr>
                <th>期間</th>
                <td> 2019年10月 〜 2022年5月</td>
              </tr>
            </tbody>
          </table>
          <h3 id="cygaems">さいきん</h3>
          <table>
            <thead>
              <tr>
                <th>企業名</th>
                <td>Cygames</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>業態</th>
                <td>常駐委託</td>
              </tr>
              <tr>
                <th>期間</th>
                <td> 2018年1月 〜 2019年9月</td>
              </tr>
              <tr>
                <th>業務内容</th>
                <td>
                  <dl>
                    <dt>社内サービス開発</dt>
                    <dd>
                      勤怠管理システムやフロアマップ作成、機材管理ツールのフロントエンド担当
                      主に製作者と社内調整を行い、社内の要望や改善点をまとめ制作の提案から制作まで行っていました。
                    </dd>
                  </dl>
                </td>
              </tr>
              <tr>
                <th>使用言語</th>
                <td>HTML,CSS2,CSS3,C#,PHP,Javascript,jQuery,React,Vue,MySQL</td>
              </tr>
              <tr>
                <th>Frame Work</th>
                <td>Laravel</td>
              </tr>
              <tr>
                <th>OS</th>
                <td> CentOS,Ubuntu,Windows</td>
              </tr>
              <tr>
                <th>Server</th>
                <td>Nginx, Apache</td>
              </tr>
              <tr>
                <th>使用ツール</th>
                <td>
                  VSCode,VisualStadio,Photoshop,Git,XAMPP,Docker,Webpack,Gulp
                </td>
              </tr>
              <tr>
                <th>情報共有ツール</th>
                <td>JIRA,Confluence,RedMine,Slack</td>
              </tr>
              <tr>
                <th>コード管理</th>
                <td>GitHub/GitHub Enterprise</td>
              </tr>
            </tbody>
          </table>
          <h3 id="toyotamedia">そのまえ</h3>
          <table>
            <thead>
              <tr>
                <th>企業名</th>
                <td>トヨタメディアサービス</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>業態</th>
                <td>派遣社員</td>
              </tr>
              <tr>
                <th>期間</th>
                <td> 2015年9月 〜 2017年9月</td>
              </tr>
              <tr>
                <th>業務内容</th>
                <td>
                  ディレクタ業、コーダー業
                  お客様のご要望やビジネスゴールをお伺いし、市場調査や将来予測の分析を行った上でターゲットに最適なコンテンツやUI/UX等のデザイン、システム、運用プランなどを立案
                  ユーザーの行動履歴を分析し、趣味趣向にあったコミュニケーション施策・仕組みをご提案
                  主にハウスメーカーの広告運用・企画、ランディングページ作成、フロントエンド担当、外注折衝
                </td>
              </tr>
              <tr>
                <th>使用言語</th>
                <td>HTML,CSS2,CSS3,PHP,Javascript,jQuery,MySQL</td>
              </tr>
              <tr>
                <th>Frame Work</th>
                <td> CakePHP,ASP.Net FrameWork</td>
              </tr>
              <tr>
                <th>OS</th>
                <td> Red Hat Enterprise Linux</td>
              </tr>
              <tr>
                <th>Server</th>
                <td>Apache,IIS</td>
              </tr>
              <tr>
                <th>使用ツール</th>
                <td>DreamWeaver,Photoshop,Git,XAMPP</td>
              </tr>
              <tr>
                <th>情報共有ツール</th>
                <td>サイボウズ,Salesforce</td>
              </tr>
              <tr>
                <th>コード管理</th>
                <td>Git,SVN</td>
              </tr>
            </tbody>
          </table>

          <h3 id="hankoya">もうすこしまえ</h3>
          <table>
            <thead>
              <tr>
                <th> 企業名</th>
                <td>ハンコヤドットコム</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>業態</th>
                <td>契約</td>
              </tr>
              <tr>
                <th>在籍期間</th>
                <td>2011年5月 〜 2015年8月</td>
              </tr>
              <tr>
                <th>業務内容</th>
                <td>
                  社内SEOを中心にサーバ保守、サイトコーディング、企画運営
                  他部署との連携など幅広く業務を行っておりました 実績
                  Google手動対応の解除
                  新入社員研修にて短期間で担当していただいたページの売上を2倍にしたこと
                  コンサル企業の売上を1.5倍まで上げて継続させたこと プロセス
                  社内で仕事をすることが多く、業務内容のほとんどが改善プロジェクトでした。
                  その中でまず担当者の方がどこで悩まれているか、プロジェクトの中で解決すべき問題点はなにかなどを、洗い出し、実際にどのようなスケジュールで行うか、具体的な例を示し、Googleアナリティクスを用いて細かく分析を行い、プロジェクトの目標を達成することができました。
                </td>
              </tr>
              <tr>
                <th>使用言語</th>
                <td>HTML5,CSS2,CSS3,PHP,Javascript,jQuery,MySQL,SQL Server</td>
              </tr>
              <tr>
                <th>OS</th>
                <td> CentOS,Windows,WindowsServer2008</td>
              </tr>
              <tr>
                <th>Server</th>
                <td> Apache,IIS</td>
              </tr>
              <tr>
                <th>使用ツール</th>
                <td>DreamWeaver,Photoshop,Git,XAMPP</td>
              </tr>
              <tr>
                <th>情報共有ツール</th>
                <td>JIRA,Confluence,HipChat</td>
              </tr>
              <tr>
                <th>コード管理</th>
                <td>Bit Bucket</td>
              </tr>
            </tbody>
          </table>

          <Link
            activeClass="active"
            spy={true}
            smooth={true}
            offset={-70}
            duration={800}
            to="topWrap"
          >
            上に戻る
          </Link>
        </section>
      </React.Fragment>
    );
  }
}
