import * as React from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import "./Header.scss";
import { theme } from "../../styles/theme";

interface IProps {
  name: string;
}

export default class Header extends React.Component<IProps> {
  public render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <h1 className="title">
            <span className="title__text">Problema {this.props.name}!</span>
          </h1>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}
