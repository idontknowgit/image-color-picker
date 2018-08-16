import React, { Component } from "react";
import axios from "axios";
import { isImageUrl } from "../util";

const uploadIcon = (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg">
    <title>upload</title>
    <path d="M8 12h4v-6h3l-5-5-5 5h3v6zM19.338 13.532c-0.21-0.224-1.611-1.723-2.011-2.114-0.265-0.259-0.644-0.418-1.042-0.418h-1.757l3.064 2.994h-3.544c-0.102 0-0.194 0.052-0.24 0.133l-0.816 1.873h-5.984l-0.816-1.873c-0.046-0.081-0.139-0.133-0.24-0.133h-3.544l3.063-2.994h-1.756c-0.397 0-0.776 0.159-1.042 0.418-0.4 0.392-1.801 1.891-2.011 2.114-0.489 0.521-0.758 0.936-0.63 1.449l0.561 3.074c0.128 0.514 0.691 0.936 1.252 0.936h16.312c0.561 0 1.124-0.422 1.252-0.936l0.561-3.074c0.126-0.513-0.142-0.928-0.632-1.449z" />
  </svg>
);

class UploadImage extends Component {
  state = { url: "" };
  invalidFileError = "Please provide a valid image URL or file.";

  handleFileChange = e => {
    let file = e.target.files[0];

    if (!file) {
      return;
    }

    let reader = new FileReader();

    this.props.setError(null);
    this.props.setLoading(true);

    if (/image/.test(file.type)) {
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        this.props.changeImage(reader.result);
        this.setState({ url: "" });
      };

      reader.onerror = () => {
        this.props.setError("There was a problem reading your file.");
      };
    } else {
      this.props.setError(this.invalidFileError);
    }
  };

  handleURLChange = e => {
    this.setState({ url: e.target.value });
  };

  handleURLSubmit = () => {
    let { url } = this.state;

    if (url.length) {
      if (!isImageUrl(url)) {
        return this.props.setError(this.invalidFileError);
      }
      this.props.setError(null);
      this.props.setLoading(true);

      axios
        .get("https://cors-anywhere.herokuapp.com/" + url, {
          responseType: "blob"
        })
        .then(res => {
          if (res.data && /image/.test(res.data.type)) {
            this.props.changeImage(window.URL.createObjectURL(res.data));
            this.fileInput.value = "";
          } else {
            this.props.setError(this.invalidFileError);
          }
        })
        .catch(err =>
          this.props.setError(
            `There was a problem loading image data from ${url}`
          )
        );
    }
  };

  render() {
    return (
      <div className="upload-image">
        <div className="upload-image__url">
          <input
            type="text"
            value={this.state.url}
            onChange={this.handleURLChange}
            placeholder="Upload an image via URL"
          />
          <span onClick={this.handleURLSubmit}>{uploadIcon}</span>
        </div>
        <div className="upload-image__file">
          <input
            id="file"
            type="file"
            onChange={this.handleFileChange}
            ref={ref => (this.fileInput = ref)}
          />

          <label htmlFor="file">
            {uploadIcon}
            Upload an image file
          </label>
        </div>
      </div>
    );
  }
}

export default UploadImage;
