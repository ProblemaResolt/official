import * as React from "react";
import "./Header.scss";

interface IProps {
  name: string;
}

export default class Header extends React.Component<IProps> {
  public render() {
    return (
      <header className="banner">
        <span className="banner__text">
          Ploblema {this.props.name}!
        </span>
      </header>
    );
  }
}
