import React from 'react';
import Navigation from './Components/Navigation/Navigation';
import Rank from './Components/Rank/Rank';
import Logo from './Components/Logo/Logo';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '3ffe907ccccd4b53bdc039893c9e01c2'
});

  const particlesOptions = {
    particles: {
      number:{
        value: 100,
        density: {
          enable:true,
          value_area: 800
        }
      }
    }
  }

  class App extends React.Component {

    constructor(){
      super();
      this.state = {
        input: '',
        imageUrl: '',

      }
  }

  onInputChange = event => {
    this.setState({input: event.target.value});
  }

  onSubmit = () =>{
    this.setState({imageUrl: this.state.input});
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(
    function(response) {
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
    },
    function(err) {
      console.log(err);
    }
  );
  }

  render() {
    return (
      <div className="App">
      <Particles className='particles'
                  params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
  
}

export default App;
