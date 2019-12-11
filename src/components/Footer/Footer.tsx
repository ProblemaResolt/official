import * as React from "react";
import "./Footer.scss";

interface IProps {
}

export default class Footer extends React.Component<IProps> {
  public render() {
    return (
      <footer>
      <a href="https://twitter.com/ProblemaResolt?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">Follow @ProblemaResolt</a>
      <a className="github-button" href="https://github.com/ProblemaResolt" data-color-scheme="no-preference: dark; light: dark; dark: dark;" aria-label="Follow @ProblemaResolt on GitHub">Follow @ProblemaResolt</a>
       © ProblemaResolt：2015 - <span id="footerYear">.</span>
      </footer>
    );
  }
}
