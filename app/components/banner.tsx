import React from "react";
import WelcomeArt from "./text-art/welcome.art";
import Textart from "./text-art/textart";

function Banner() {
  return <Textart label="Welcome" text={WelcomeArt} />;
}

export default Banner;
