import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>

            <p className="home-about-body">
              I'm a{" "}
              <span className="purple">
                Lead Data Scientist, AI Researcher, and Systems Engineer
              </span>{" "}
              specialising in distributed machine learning, probabilistic
              modelling, and large-scale data engineering. My work focuses on
              designing intelligent systems that are reliable, scalable, and
              built for real-world impact.
              <br />
              <br />
              I’ve built mission-critical AI platforms across{" "}
              <span className="purple">telecoms, banking, education and research</span> —
              including Vodacom’s national Smart Generator Optimisation engine,
              IBM’s Environmental Intelligence Suite components, and ABSA’s
              Databricks-based enterprise ML transformation. I enjoy working at the
              intersection of{" "}
              <span className="purple">
                machine learning, research , distributed systems, MLOPs and real-time data
                architectures
              </span>
              .
              <br />
              <br />
              I’m proficient in
              <i>
                <b className="purple">
                  {" "}
                  Python, C++, Rust, Go, JavaScript, PySpark, Flink, and
                  cloud-native ML frameworks{" "}
                </b>
              </i>
              and I love building end-to-end solutions from data pipelines, ML/AI solutions and
              scoring engines to visual interfaces and deployment workflows.
              <br />
              <br />
      Outside of research and engineering, I’m a serial founder. Through 
<span className="purple"> ThabangVision Studio Labs</span>, 
I run a full-stack creative technology studio spanning photography, film, gear design and rental, visual design, and deep-tech R&D. 
I also build open-source AI and computer vision frameworks — such as 
<span className="purple"> UAIE</span> and <span className="purple"> Tfilterspy</span> — 
and consult for international startups on large-scale AI systems, data engineering, and cloud architecture.

            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;
