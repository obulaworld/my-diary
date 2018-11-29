// react libraries
import React, { Component } from "react";

//third party libraries
import { css } from "react-emotion";
import { PropagateLoader } from "react-spinners";

// scss
import "../../../public/scss/dashboard.scss";
import "../../../public/scss/_dash.scss";

// components
import MainHeader from "../MainHeader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

/**
 * @desc renders home page
 */
class Dashboard extends Component {
  state = {
    loading: true
  };

  componentDidMount = () => {
    this.props.fetch();
  };

  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <div>
          <section id="boxes">
            {this.props.entries.entries.length ? (
              this.props.entries.entries.reverse().map((entry, index) => (
                <div className="container" id="box2" key={index}>
                  <div className="box2">
                    <h4>${entry.title}</h4>
                    <p> ${entry.content.substring(1, 50)}</p>
                    <div className="recent">
                      <button className="button_1" onClick={this.getEntry(entry.id)}>
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div id="box3">
                <h4>No Entry Yet</h4>
                <p>You currently have no entries......</p>
                <div className="recent">
                  <a href="/entry-add">
                    <button className="button_1">Create Entry</button>
                  </a>
                </div>
              </div>
            )}
          </section>
          <footer>
            <p>My Diary, Copright &copy; 2018</p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}
export default Dashboard;
