
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../../styles/Contents.scss";
import { Router } from "react-router-dom";

interface IProps { }

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <h2>職歴</h2>
        <dl>
          <dt>***</dt>
          <dd>期間: 2018年1月 〜 2019年9月</dd>
          <dt>業務内容</dt>
          <dd>
            コーダー業 社内サービス開発
            勤怠管理システムやフロアマップ作成、機材管理ツールのフロントエンド担当
            主に製作者と社内調整を行い、社内の要望や改善点をまとめ制作の仕様決めから制作まで行っていました。
          </dd>
          <dt>使用言語</dt>
          <dd>
            HTML,CSS2,CSS3,C#,PHP,Javascript,jQuery,React,Vue,MySQL
          </dd>
          <dt>Frame Work</dt><dd>Laravel</dd>
          <dt>OS</dt><dd> CentOS,Ubuntu,Windows Server</dd> <dt>使用ツール</dt><dd>
            VSCode,VisualStadio,Photoshop,Git,XAMPP,Docker,Webpack,Gulp</dd>
          <dt>情報共有ツール</dt><dd> 　JIRA,Confluence,RedMine,Slack
          </dd>
          <dt>コード管理</dt><dd>
            GitHub/GitHub Enterprise
          </dd>
        </dl>        <dl>
          <dt>トヨタメディアサービス 期間: 2015年9月 〜 2017年9月</dt>
        <dt>業務内容</dt><dd> ディレクタ業、コーダー業
          お客様のご要望やビジネスゴールをお伺いし、市場調査や将来予測の分析を行った上でターゲットに最適なコンテンツやUI/UX等のデザイン、システム、運用プランなどを立案
          ユーザーの行動履歴を分析し、趣味趣向にあったコミュニケーション施策・仕組みをご提案
          主にハウスメーカーの広告運用・企画、ランディングページ作成、フロントエンド担当、外注折衝
          </dd>
          <dt>使用言語</dt><dd> 　HTML,CSS2,CSS3,PHP,Javascript,jQuery,MySQL
          </dd> <dt>Frame
        Work</dt><dd> CakePHP,ASP.Net FrameWork
          </dd> <dt>OS</dt><dd> Red Hat Enterprise Linux
          </dd><dd> Apache,IIS
          </dd> <dt>使用ツール</dt><dd> 　DreamWeaver,Photoshop,Git,XAMPP
          </dd>
        <dt>情報共有ツール</dt><dd> 　サイボウズ,Salesforce
          </dd> <dt>コード管理</dt><dd> 　Git,SVN
          </dd>
        </dl>
        <dl>
         <dt> 企業名</dt><dd>ハンコヤドットコム 在籍期間: 2011年5月 〜 2015年8月</dd> <dt>業務内容</dt><dd>
            社内SEOを中心にサーバ保守、サイトコーディング、企画運営
            他部署との連携など幅広く業務を行っておりました 実績 Google手動対応の解除
            新入社員研修にて短期間で担当していただいたページの売上を2倍にしたこと
            コンサル企業の売上を1.5倍まで上げて継続させたこと プロセス
            社内で仕事をすることが多く、業務内容のほとんどが改善プロジェクトでした。
            その中でまず担当者の方がどこで悩まれているか、プロジェクトの中で解決すべき問題点はなにかなどを、洗い出し、実際にどのようなスケジュールで行うか、具体的な例を示し、Googleアナリティクスを用いて細かく分析を行い、プロジェクトの目標を達成することができました。
          </dd>
          <dt>使用言語</dt><dd> 　HTML5,CSS2,CSS3,PHP,Javascript,jQuery,MySQL,SQL Server
          </dd>
          <dt>OS</dt><dd> CentOS,Windows,WindowsServer2008</dd> <dt>Server</dt><dd> Apache,IIS</dd>
        <dt>使用ツール</dt><dd> 　DreamWeaver,Photoshop,Git,XAMPP
          </dd> <dt>情報共有ツール</dt><dd>
              JIRA,Confluence,HipChat
          </dd> <dt>コード管理</dt><dd> 　Bit Bucket
          </dd>
          </dl>
      </React.Fragment>
        );
      }
    }
