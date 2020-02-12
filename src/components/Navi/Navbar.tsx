import * as React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import "../../styles/Navbar.scss";
const isMenuOpen = function(state:any) {
  return state.isOpen;
};


class Navbar extends React.Component {
  showSettings (event:any) {
    event.preventDefault();
  }
  render() {
    return (
      <Menu
        pageWrapId={"page-wrap"}
        outerContainerId={"outer-container"}
        onStateChange={isMenuOpen}
      >
        <div className="row">
          <NavLink className="column button button-clear" to="/official/">
            Home
          </NavLink>
          <NavLink className="column button button-clear" to="/official/About">
            About
          </NavLink>
          <NavLink className="column button button-clear" to="/official/Career">
            Career
          </NavLink>
        </div>
      </Menu>
    );
  }
}

export default Navbar;