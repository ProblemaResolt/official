import * as React from 'react'
import { NavLink } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <NavLink className="column button button-clear" to="/official/">Home</NavLink>
          <NavLink className="column button button-clear" to="/official/About">About</NavLink>
          <NavLink className="column button button-clear" to="/official/Career">Career</NavLink>
        </div>
      </div>
    )
  }
}

export default Navbar;