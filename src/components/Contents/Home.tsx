
import * as React from "react";
import * as ReactDOM from "react-dom";
import {FaDev, FaTwitterSquare, FaGithubSquare} from "react-icons/fa"
import "../../styles/Contents.scss";

interface IProps {}
const  iconSize = 32

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <section className="contents">
        <h2>Self-introduction</h2>
          <dl>
           <dt>skills/languages</dt>
            <dd>ギャルの画像を検索する能力</dd>
            <dt>learning/trying</dt>
            <dd>早寝(PM20:00)早起き(AM3:00)挑戦中</dd>
          </dl>
          <h2>Links</h2>
          <p className="row">
            <a href="https://dev.to/problemaresolt" className="column button button-clear"><FaDev size={iconSize} /></a>
            <a href="https://github.com/ProblemaResolt" className="column button button-clear"><FaGithubSquare size={iconSize} /></a>
            <a href="https://twitter.com/ProblemaResolt" className="column button button-clear"><FaTwitterSquare size={iconSize} /></a>
          </p>
        </section>
      </React.Fragment>
    );
  }
}
