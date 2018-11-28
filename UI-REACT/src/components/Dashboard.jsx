// react libraries
import React, { Component } from "react";

//third party libraries
import { css } from 'react-emotion';
import { PropagateLoader
} from 'react-spinners';

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
  }

  render() {
    return (
      <div>
        <h1>Welcome to dashboard</h1>
        <PropagateLoader
          className={override}
          sizeUnit={"px"}
          size={15}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
export default Dashboard;
