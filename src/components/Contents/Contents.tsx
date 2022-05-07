import * as React from "react";
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
          <Route path="/official/" element={<Home />} />
          <Route path="/official/Career" element={<Career />} />
          <Route path="/official/About" element={<About />} />
        </Router>
      </section>
    );
  }
}
