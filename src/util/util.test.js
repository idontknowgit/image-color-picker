import { rgbToHex } from "./index";

describe("utility", () => {
  describe("rgbaToHex", () => {
    it("returns correct hex value", () => {
      let inputs = [[255, 255, 255], [0, 0, 0], [115, 127, 217], [104, 44, 76]];
      let outputs = ["#ffffff", "#000000", "#737fd9", "#682c4c"];

      for (let i = 0; i < inputs.length; i++) {
        expect(rgbToHex(inputs[i])).toEqual(outputs[i]);
      }
    });
  });
});
