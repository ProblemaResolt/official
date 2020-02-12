
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
          <ul>
            <li>
              <FaDev size={iconSize} className="linksIcon" />
              <a
                href="https://dev.to/problemaresolt"
                className="button button-clear links"
              >
                Dev.to
              </a>
            </li>
            <li>
              <FaGithubSquare size={iconSize} className="linksIcon" />
              <a
                href="https://github.com/ProblemaResolt"
                className="button button-clear links"
              >
                GitHub
              </a>
            </li>
            <li>
              <FaTwitterSquare size={iconSize} className="linksIcon" />
              <a
                href="https://twitter.com/ProblemaResolt"
                className="button button-clear links"
              >
                Twitter
              </a>
            </li>
          </ul>
        </section>
      </React.Fragment>
    );
  }
}
