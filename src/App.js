import "./App.css";
import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Particles from "react-particles-js";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "52cd05dab8c34521a22be2c212408b85",
});
const particlesOptions = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: "top",
      out_mode: "out",
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "bubble",
      },
      onclick: {
        enable: true,
        mode: "repulse",
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    };
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({input: event.target.value})
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        // "d02b4508df58432fbb84e800597b8959",
        Clarifai.FACE_DETECT_MODEL,
        this.state.input
      )
      .then(
        function (response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function (error) {}
      );
    console.log("clicked");
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}
// function App() {}

export default App;
