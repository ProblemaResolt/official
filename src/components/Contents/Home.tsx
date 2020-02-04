
import * as React from "react";
import * as ReactDOM from "react-dom";
import "../../styles/Contents.scss";

interface IProps {}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <section className="contents">
          <h2>職業</h2>
          <p>Web Director　だったエンジニアでもない何か</p>
        </section>
      </React.Fragment>
    );
  }
}
