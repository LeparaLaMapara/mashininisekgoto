import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "AI Researcher",
          "Principal/Lead Data Scientist",
          "Distributed Systems Engineer",
          "Machine Learning Architect",
          "Open Source Framework Builder",
          "Founder of Ubunye AI Ecosystem",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
