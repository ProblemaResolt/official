import * as React from "react";
import * as ReactDOM from "react-dom";
import "./Contents.scss";
import { CssBaseline,Container } from "@material-ui/core/";
import Carrer from "./Career";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";


interface IProps {
}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <React.Fragment>
        <Container maxWidth="xl">
          <h2>
            業務経歴
          </h2>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <h3>期間 2018年1月 〜 2019年9月</h3>

          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Carrer />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        </Container>
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
