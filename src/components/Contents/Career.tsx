
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./Contents.scss";
import { CssBaseline, Container } from "@material-ui/core/";

interface IProps {}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="xl">
              <section className="contents">
                <h3>業務内容</h3>
                <p>
                  勤怠管理システムやフロアマップ作成、機材管理ツールのフロントエンド担当
                  主に製作者と社内調整を行い、社内の要望や改善点をまとめ制作の仕様決めから制作まで行っていました。
                </p>
                <h3>使用言語</h3>
                <p>HTML,CSS2,CSS3,C#,PHP,Javascript,MySQL</p>
                <h3>FrameWork</h3>
                <p>jQuery,React,Vue（Javaascript）, CodeIgniter,Laravel(PHP)</p>
                <h3>Server</h3>
                <p>CentOS6系</p>
                <h3>使用ツール</h3>
                <p>
                  VSCode,VisualStadio,Photoshop,Git,XAMPP,Docker,Webpack,Gulp
                </p>
                <h3>情報共有ツール</h3>
                <p>JIRA,Confluence,RedMine,Slack</p>
                <h3>コード管理</h3>
                <p>GitHub/GitHub Enterprise</p>
              </section>
        </Container>
      </React.Fragment>
    );
  }
}
