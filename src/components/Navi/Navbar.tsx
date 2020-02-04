import * as React from 'react'
import { Link } from 'react-router-dom'

class Navbar extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Link className="column button  button-clear" to="/">
            Home
          </Link>
          <Link className="column button button-clear" to="/About">About</Link>
          <Link className="column button button-clear" to="/Career">Career</Link>
        </div>
      </div>
    )
  }
}

export default Navbar;