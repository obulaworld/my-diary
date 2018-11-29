import React, { Component } from "react";
import logo from '../../src/favicon.png';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="">
          <div className="inner">
            <div id="branding">
              <a href="/">
                <img src={logo} alt="My diary Logo" />
              </a>
            </div>
            <div id="links">
              <ul>
                <li className=" change1">
                  <a href="/">Home</a>
                </li>
                <li className="change1">
                  <a href="login">Login</a>
                </li>
                <li className="change1">
                  <a href="register">Sign up</a>
                </li>
                <li className="change2">
                  <label htmlFor="offcanvas" className="toggler">
                    <span className="navicon" />
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
