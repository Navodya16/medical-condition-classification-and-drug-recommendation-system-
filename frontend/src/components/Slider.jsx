import React, { useState } from "react";
//import styled from "styled-components";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
//import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import logo from "../med3.jpg";
//import { sliderItems } from "../data";

/*const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align - items: center;
background-color: #${(props) => props.bg};
`; */

/*const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
`;

const Image = styled.img`
  height: 80%;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  backgroung-color: transparent;
  cursor: pointer;
`;*/

/*const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg}>
            <ImgContainer>
              {/*<Image src={logo} alt="Logo" /> 
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title> {item.title} </Title>
              <Description> {item.desc}</Description>
              <Button>show now</Button>
          </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  );
};*/

const Slider = () => {
  const [comment, setComment] = useState("");
  const [prediction, setPrediction] = useState(null);

  const formData = new FormData();
  formData.append("comment", comment);

  const predictionConditionBtn = () => {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    axios
      .post("http://127.0.0.1:5000/", formData, config)
      .then((resp) => {
        console.log(resp);
        setPrediction(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container-fluid ">
      <br />
      <br />
      <div className="row">
        <div className="col-sm-6 ">
          <div className="img-container">
            <img
              src={logo}
              alt="Logo"
              className="img-fluid"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
        <div className="col-sm-6 mt-2">
          <h2>
            <b>CONDITION PREDICT AND DRUG RECOMMENDATION</b>
          </h2>
          <form>
            <div className="form-group">
              <br />
              <label>
                <h4>Enter the review about your condition: </h4>
              </label>
              <br />
              <textarea
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-control"
                style={{ maxWidth: "700px" }}
                aria-multiline="true"
                tabIndex="0"
              ></textarea>
            </div>
            <br />
            <div className="form-group">
              <button
                type="button"
                onClick={predictionConditionBtn}
                className="btn btn-primary"
              >
                SUBMIT
              </button>
            </div>
            <br />

            {prediction && (
              <div>
                <h5>{/*<b>Prediction Result:</b>*/}</h5>
                <h5>
                  Predicted Medical Condition : <b>{prediction.condition}</b>{" "}
                </h5>
                {prediction.predicted_sentiment === 1 ? (
                  <h5>
                    Your Sentiment prediction is : <b>Positive</b>
                  </h5>
                ) : (
                  <div>
                    <h5>
                      Your Sentiment prediction is : <b>Negative</b>
                    </h5>
                    <h5>Top Drugs:</h5>
                    <ul>
                      {prediction.top_drugs.map((drug, index) => (
                        <li key={index}>{drug}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Slider;
