import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "../../styles/Contents.scss";
import Navbar from "../Navi/Navbar";
import Home from "./Home";
import Career from "./Career";
import About from "./About";

interface IProps {
}

export default class Contents extends React.Component<IProps> {
  public render() {
    return (
      <section>
        <Router basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Route exact path="/official/" component={Home} />
          <Route exact path="/official/Career" component={Career} />
          <Route exact path="/official/About" component={About} />
        </Router>
      </section>
    );
  }
}
