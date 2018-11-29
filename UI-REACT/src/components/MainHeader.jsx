import React, { Component } from "react";
import logo from "../../src/favicon.png";

class MainHeader extends Component {

  handleLogout = () => {

  }

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
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="change1">
                  <a href="/entry-add">Add Entry</a>
                </li>
                <li className="change1">
                  <a href="/view-entry">View All Entries</a>
                </li>
                <li className="change1">
                  <a href="/profile">My Profile</a>
                </li>
                <li className="change1" onClick={this.handleLogout}>
                  Logout
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

export default MainHeader;
