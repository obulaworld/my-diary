// react libraries
import React, { Component } from "react";

//third party libraries
import { css } from "react-emotion";
import { FadeLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  text-align: center
  border-color: red;
`;

// components
import MainHeader from "../MainHeader";
import Footer from "../Footer";

// scss
import "../../../public/scss/entry-add.scss";
import "../../../public/scss/_entry-ad.scss";

/**
 * @desc renders home page
 */
class CreateEntry extends Component {
  state = {
    title: "",
    category: "",
    subCategory: "",
    content: "",
    loading: false
  };

  onChange = event => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state);
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const details = {
      title: this.state.title,
      category: this.state.category,
      subCategory: this.state.subCategory,
      content: this.state.content
    };
    this.props.createEntry(details);
  };

  render() {
    return (
      <React.Fragment>
        <MainHeader />
        <section id="boxes">
          <div className="container">
            <div className="box2">
              <div className="success-check" role="alert" id="success" />
              <div className="right-card">
                <form onSubmit={this.onSubmit}>
                  <div>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                      id="title"
                      name="title"
                      required
                      onChange={this.onChange}
                    />
                    <div>
                      <p id="successT" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="category">Category:</label>
                    <br />
                    <select
                      id="category"
                      name="category"
                      onChange={this.onChange}
                    >
                      <option defaultValue="">Choose Category</option>
                      <option defaultValue="Education">Education</option>
                      <option defaultValue="Religion">Religion</option>
                      <option defaultValue="Family">Family</option>
                      <option defaultValue="World">World</option>
                      <option defaultValue="Experience">Experience</option>
                      <option defaultValue="Accomplishment">
                        Accomplishment
                      </option>
                      <option defaultValue="Thoughts">Thoughts</option>
                    </select>
                    <div>
                      <p id="successC" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subCategory">Sub Category:</label>
                    <br />
                    <select
                      id="subCategory"
                      name="subCategory"
                      onChange={this.onChange}
                    >
                      <option defaultValue="">Choose sub-category</option>
                      <option defaultValue="My church">My church</option>
                      <option defaultValue="Other church">Other church</option>
                      <option defaultValue="Gift">Gift</option>
                      <option defaultValue="Today">Today</option>
                      <option defaultValue="Work">Work</option>
                      <option defaultValue="My school">My school</option>
                      <option defaultValue="Award">Award</option>
                      <option defaultValue="Teacher">Teacher</option>
                      <option defaultValue="Friend">Friend</option>
                      <option defaultValue="Other">Other</option>
                    </select>
                    <div>
                      <p id="successS" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="content">Text:</label>
                    <br />
                    <textarea
                      id="content"
                      name="content"
                      required
                      rows="100"
                      cols="70"
                      defaultValue=""
                      onChange={this.onChange}
                    />
                    <div>
                      <p id="successTe" />
                    </div>
                  </div>
                  <div>
                    <FadeLoader
                      className={override}
                      sizeUnit={"px"}
                      size={15}
                      color={"#e8491d"}
                      loading={this.state.loading}
                    />
                  </div>
                  <div>
                    <button  id="add" type="submit">
                      Add Entry
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </React.Fragment>
    );
  }
}
export default CreateEntry;
