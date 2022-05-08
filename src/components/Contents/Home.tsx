
import * as React from "react";
import {FaDev, FaTwitterSquare, FaGithubSquare} from 'react-icons/fa';
import { 
  DiJavascript1,
  DiUbuntu,DiWindows,
  DiSass,DiReact,DiLaravel,DiNodejs,
  DiVisualstudio,DiDreamweaver,
  DiJira,DiAtlassian,DiGithub,DiGit 
} from 'react-icons/di';
import "../../styles/Contents.scss";

const  iconSize = 32
interface IProps {
}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
  <section className="Box">
    <h1>自己紹介</h1>
    <p>主にWeb広告分析、Web広告コンサルタント＆ページ作成を行っておりました。</p>
    <p>Webページのフロントエンドの作成を主にページ解析やユーザーの流入改善、問題提起と企画</p>
  </section>
    );
  }
}
