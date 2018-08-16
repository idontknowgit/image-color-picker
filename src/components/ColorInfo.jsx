import React from "react";
import { rgbToHex, rgbToHsl } from "../util";

const ColorInfo = props => {
  const { rgbValues } = props;
  const [R, G, B] = rgbValues;
  const hex = rgbToHex(rgbValues);
  const hslValues = rgbToHsl(rgbValues);

  const fontColor = () => {
    let l = (0.299 * R + 0.587 * G + 0.114 * B) / 255;

    if (l > 0.5) {
      return "rgba(0, 0, 0, 0.8)";
    }

    return "rgba(255,255,255,0.8)";
  };

  return (
    <div
      className="color-info"
      style={{ backgroundColor: hex, color: fontColor() }}
    >
      <div className="color-info__content">
        <div>
          rgb(
          {rgbValues[0]}, {rgbValues[1]}, {rgbValues[2]})
        </div>
        <div>{hex}</div>
        <div>
          hsl(
          {hslValues[0]}, {hslValues[1]}
          %, {hslValues[2]}
          %)
        </div>
      </div>
    </div>
  );
};

export default ColorInfo;
