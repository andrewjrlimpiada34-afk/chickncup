import cordonBleuImage from "../assets/images/cordon-bleu.svg";
import lumpiaImage from "../assets/images/chicken-lumpia.svg";
import lollipopImage from "../assets/images/chicken-lollipop.svg";
import wingsImage from "../assets/images/chicken-wings.svg";
import comboOneImage from "../assets/images/combo-1.svg";
import comboTwoImage from "../assets/images/combo-2.svg";

const imageByCode = {
  CB: cordonBleuImage,
  CL: lumpiaImage,
  CLP: lollipopImage,
  CW: wingsImage,
  "CM 01": comboOneImage,
  "CM 02": comboTwoImage,
  "CM 03": comboOneImage,
  "CM 04": comboTwoImage,
  "CM 05": comboOneImage,
  "CM 06": comboTwoImage,
};

export function resolveMenuImage(code, imageUrl) {
  if (imageUrl && /^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return imageByCode[code] || comboOneImage;
}
