import React, { Component } from "react";

import Canvas from "./Canvas";
import ColorInfo from "./ColorInfo";
import UploadImage from "./UploadImage";

class App extends Component {
  state = {
    rgbValues: [255, 255, 255],
    imgSrc:
      "https://llandscapes-ee1.kxcdn.com/wp-content/uploads/2015/01/navajo.jpg",
    loading: true,
    error: null
  };

  changeRGBValues = values => {
    this.setState({ rgbValues: values });
  };

  changeImage = src => {
    this.setState({ imgSrc: src });
  };

  setError = error => {
    if (this.state.error !== error) {
      this.setState({
        error: error,
        loading: false
      });
    }
  };

  setLoading = bool => this.setState({ loading: bool });

  render() {
    const { imgSrc, rgbValues, error, loading } = this.state;

    return (
      <div className="container">
        <div className="flex-container">
          <div className="canvas-container">
            <Canvas
              imgSrc={imgSrc}
              changeRGBValues={this.changeRGBValues}
              setError={this.setError}
              setLoading={this.setLoading}
            />
            {loading && (
              <div className="cover">
                <div className="loader" />
              </div>
            )}
            {!loading &&
              error && (
                <div className="cover">
                  <span className="error">{error}</span>
                </div>
              )}
          </div>
          <ColorInfo rgbValues={rgbValues} />

          <UploadImage
            changeImage={this.changeImage}
            setError={this.setError}
            setLoading={this.setLoading}
          />
          <div className="info">
            Upload an image and click on a pixel to see its color values :)
          </div>
        </div>
      </div>
    );
  }
}

export default App;
