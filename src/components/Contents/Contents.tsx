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
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          > Carrer
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Carrer />
          </ExpansionPanelDetails>
        </ExpansionPanel>
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
