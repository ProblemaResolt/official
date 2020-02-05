
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../../styles/Contents.scss";

interface IProps {}

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
            <dd>ElixirとElmを挑戦中</dd>
          </dl>
        </section>
      </React.Fragment>
    );
  }
}
