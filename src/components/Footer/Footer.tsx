import * as React from "react";
import "./Footer.scss";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {Twitter, GitHub} from "@material-ui/icons/";

interface IProps {
}

const TwitterLinks = [
  "//twitter.com/ProblemaResolt"
];
const GitHubLinks = [
  "//github.com/ProblemaResolt"
];

export default class Footer extends React.Component<IProps> {
  public render() {
    return (
      <footer>
        <Container maxWidth="xl">
          <Grid container spacing={0}>
            <Grid item xs={11}>
              © ProblemaResolt：2015 -{new Date().getFullYear()}
            </Grid>
            <Grid item xs={1} alignItems="flex-end">
              <Twitter />
              <GitHub />
            </Grid>
          </Grid>
        </Container>
      </footer>
    );
  }
}
