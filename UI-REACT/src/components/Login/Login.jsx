// React libraries
import React, { Component } from "react";

// components
import Header from "../Header";

// images
import fav from "../../../src/favicon.png";
import diary from "../../../public/images/diary.png";

// scss
import "../../../public/scss/login.scss";
import "../../../public/scss/_login.scss";

//third party libraries
import { css } from "react-emotion";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  text-align: center
  border-color: red;
`;

class Signup extends Component {
  state = {
    email: "",
    password: "",
    loading: false
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const details = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.login(details);
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <section className="container">
          <div className="card">
            <div className="inner-card">
              <div className="left-card">
                <a href="index.html">
                  <img src="./img/favicon.png" />
                </a>
                <h2>Login To MyDiary</h2>
                <div id="diary-image">
                  <img id="image-dairy" src={diary} />
                </div>
              </div>
              <div className="right-card">
                <form>
                  <div id="diary-image2">
                    <a href="/">
                      <img src={fav} />
                    </a>
                  </div>
                  <div>
                    <label htmlFor="email">E-Mail Address:</label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      onChange={this.onChange}
                    />
                  </div>
                  <div align="center" className="login-button">
                    <button type="button" id="login" onClick={this.onSubmit}>
                      Log In
                    </button>
                  </div>
                  <div>
                    <FadeLoader
                      className={override}
                      sizeUnit={"px"}
                      size={15}
                      color={"#e8491d"}
                      loading={this.state.loading}
                    />
                    {this.props.login.message != "" && (
                      <div className="alert-success">
                        {this.props.login.message}
                      </div>
                    )}
                    {this.props.login.error != "" && (
                      <div className="alert-danger">
                        {this.props.login.error}
                      </div>
                    )}
                  </div>
                </form>
                <h3>
                  <a href="" className="turn">
                    Forgot password?
                  </a>
                </h3>
                <hr />
                <h3>
                  New to MyDiary?{" "}
                  <a href="/register" className="turn">
                    SignUp Here
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Signup;
