import React, { Component } from "react";

class Feature extends Component {
  render() {
    const { header, body, imageUrl } = this.props;
    return (
      <div className="box">
        <img className="box-images" src={imageUrl} alt="background" />
        <h4>{header}</h4>
        <p>{body}</p>
      </div>
    );
  }
}

export default Feature;
