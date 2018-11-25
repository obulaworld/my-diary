// react-libraries
import React, { Component } from "react";

// components
import Header from "./Header";
import Carousel from "./Carousel";
import Feature from "./Feature";
import Footer from "./Footer";

import book1 from "../../public/images/book1.jpg";
import book2 from "../../public/images/book2.jpg";
import book3 from "../../public/images/book3.jpg";
import book4 from "../../public/images/book4.jpg";
import diary from "../../public/images/diary.jpg";



class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Carousel />
        <div className="middle-h" align="center">
          <h1>Awsome Features of MyDiary.com</h1>
        </div>
        <section id="boxes">
          <div className="container">
            <Feature
              body="It doesn’t have a fancy or sophisticated web interface, but it is extremely user-friendly and easy-to-use and it has Access from anywhere with internet"
              header="Easy"
              imageUrl={book1}
            />
            <Feature
              body="It doesn’t have a fancy or sophisticated web interface, but it is extremely user-friendly and easy-to-use and it has Access from anywhere with internet"
              header="Easy"
              imageUrl={book2}
            />
            <Feature
              body="It doesn’t have a fancy or sophisticated web interface, but it is extremely user-friendly and easy-to-use and it has Access from anywhere with internet"
              header="Easy"
              imageUrl={book3}
            />
            <Feature
              body="It doesn’t have a fancy or sophisticated web interface, but it is extremely user-friendly and easy-to-use and it has Access from anywhere with internet"
              header="Easy"
              imageUrl={book4}
            />
            <Feature
              body="It doesn’t have a fancy or sophisticated web interface, but it is extremely user-friendly and easy-to-use and it has Access from anywhere with internet"
              header="Easy"
              imageUrl={diary}
            />
            <Feature
              body="It doesn’t have a fancy or sophisticated web interface, but it is extremely user-friendly and easy-to-use and it has Access from anywhere with internet"
              header="Easy"
              imageUrl={diary}
            />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default App;
