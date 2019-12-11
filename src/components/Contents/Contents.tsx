import * as React from "react";
import "./Contents.scss";

interface IProps {
}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <section className="contents">
        <h2>About Me</h2>
        <p>こうちくちゅうde。
        </p>
      </section>
    );
  }
}
