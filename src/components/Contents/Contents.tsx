import * as React from "react";
import "./Contents.scss";
import { CssBaseline, Typography,Container } from "@material-ui/core/"


interface IProps {
}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
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
