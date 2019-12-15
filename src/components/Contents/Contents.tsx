import * as React from "react";
import * as ReactDOM from "react-dom";
import "./Contents.scss";
import { CssBaseline,Container } from "@material-ui/core/";
import Carrer from "./Career";


interface IProps {
}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <Carrer />
        <CssBaseline />
        <Container maxWidth="xl">
            <section className="contents">
              <h2>About Me</h2>
              <p>こうちくちゅうde。</p>
            </section>
        </Container>
      </React.Fragment>
    );
  }
}
