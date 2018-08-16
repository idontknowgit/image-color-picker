import React, { Component } from "react";

class Canvas extends Component {
  componentDidMount() {
    this.canvasContainer = document.querySelector(".canvas-container");
    this.canvas = document.getElementById("image-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.img = new Image();
    this.img.crossOrigin = "Anonymous";

    this.resizeCanvas();

    this.loadImage();

    this.img.onload = () => {
      this.drawImage();
      this.props.setLoading(false);
    };

    this.img.onerror = () => {
      this.props.setError("There was a problem processing your image.");
    };

    window.addEventListener("resize", () => {
      this.resizeCanvas();
      this.drawImage();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.imgSrc !== prevProps.imgSrc) {
      this.loadImage();
    }
  }

  handleClick = e => {
    const { changeRGBValues } = this.props;
    let offset = this.canvas.getBoundingClientRect();
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;
    let imgData = this.ctx.getImageData(x, y, 1, 1).data;
    let rgbValues = [imgData[0], imgData[1], imgData[2]];

    changeRGBValues(rgbValues);
  };

  loadImage = () => {
    let { imgSrc } = this.props;

    this.clearCanvas();
    this.img.src = imgSrc;
  };

  clearCanvas = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  resizeCanvas = () => {
    this.canvas.width = this.canvasContainer.clientWidth;
    this.canvas.height = this.canvasContainer.clientHeight;
  };

  drawImage = () => {
    let w = this.canvas.width;
    let h = this.canvas.height;

    this.ctx.drawImage(this.img, 0, 0, w, h);
  };

  render() {
    return <canvas id="image-canvas" onClick={this.handleClick} />;
  }
}

export default Canvas;
