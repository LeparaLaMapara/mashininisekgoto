import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi everyone! I’m{" "}
            <span className="purple">Thabang Mashinini-Sekgoto</span> from{" "}
            <span className="purple">Johannesburg, South Africa</span>.
            <br />
            I am a{" "}
            <span className="purple">PhD researcher</span> at{" "}
            <span className="purple">the University of the Witwatersrand</span>,
            where I explore machine learning, distributed systems, and
            probabilistic modelling.
            <br />
            <br />
            I also work as an{" "}
            <span className="purple">
              independent software developer and AI consultant
            </span>{" "}
            through my startup,{" "}
            <span className="purple">ThabangVision Studio Labs</span>. I spend a
            lot of my time building software, hardware, intelligent systems and
            occasionally the teams that make them possible.
            <br />
            <br />
            Outside of engineering and research, I love staying creative and
            inspired through:
          </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Photography & Filmmaking 🎥
            </li>
            <li className="about-activity">
              <ImPointRight /> Music Production 🎶
            </li>
            <li className="about-activity">
              <ImPointRight /> Calisthenics & Exploring New Places 🌍
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"
          </p>
          <footer className="blockquote-footer">
            Thabang Mashinini-Sekgoto
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
