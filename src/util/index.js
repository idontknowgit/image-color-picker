const toHex = v => {
  v = parseInt(v).toString(16);

  return v.length === 1 ? "0" + v : v;
};

const round = (num, decimals = 2) => {
  return Number(Math.round(num + `e${decimals}`) + `e-${decimals}`);
};

export const rgbToHex = values => {
  let hex = "#";

  for (let v of values) {
    hex += toHex(v);
  }

  return hex;
};

export const rgbToHsl = values => {
  let r = values[0] / 255;
  let g = values[1] / 255;
  let b = values[2] / 255;

  let min = Math.min(r, g, b);
  let max = Math.max(r, g, b);

  let l = (min + max) / 2;
  let s;
  let h;

  if (min === max) {
    s = 0;
  } else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2.0 - max - min);
    }
  }

  if (r === max) {
    h = (g - b) / (max - min);
  } else if (g === max) {
    h = 2.0 + (b - r) / (max - min);
  } else if (b === max) {
    h = 4.0 + (r - g) / (max - min);
  }

  if (!h) {
    h = 0;
  }
  h *= 60;

  if (h < 0) {
    h += 360;
  }

  return [round(h, 0), round(s * 100, 0), round(l * 100, 0)];
};

export const isImageUrl = src => /\.(png|jpe?g|gif|svg)/i.test(src);
