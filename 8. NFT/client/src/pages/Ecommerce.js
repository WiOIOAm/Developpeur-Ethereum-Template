/*!

=========================================================
* BLK Design System PRO React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/blk-design-system-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Slick from "react-slick";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Input,
} from "reactstrap";

export default function Ecommerce() {
  const [transform, setTransform] = React.useState(
    "translate3d(0," +
      (window.innerWidth >= 768 ? window.pageYOffset / 3 : 0) +
      "px,0)"
  );

  const wrapper = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add("ecommerce-page");
    if (window.innerWidth >= 768) {
      var windowScrollTop = window.pageYOffset / 3;
      setTransform("translate3d(0," + windowScrollTop + "px,0)");
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      document.body.classList.remove("ecommerce-page");
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  }, []);
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };

  // custom previous button for the slick component
  const PrevButton = (props) => {
    return (
      <Button
        className="btn-round btn-icon btn-simple slick-prev slick-arrow"
        color="primary"
        aria-label="Previous"
        type="button"
        onClick={props.onClick}
      >
        <i className="tim-icons icon-minimal-left" />
      </Button>
    );
  };
  // custom next button for the slick component
  const NextButton = (props) => {
    return (
      <Button
        className="btn-round btn-icon btn-simple slick-next slick-arrow"
        color="primary"
        aria-label="Next"
        type="button"
      >
        <i className="tim-icons icon-minimal-right" onClick={props.onClick} />
      </Button>
    );
  };
  let slickHeader3Settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
    className: "center slider slick-buttons-under",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ],
  };
  return (
    <>
      <div className="wrapper" ref={wrapper}>
        <div className="header header-1">
          <div className="page-header header-filter">
            <div
              className="page-header-image"
              style={{
                backgroundImage:
                  "url(" + require("assets/images/sports-yellow.jpg") + ")",
                transform: transform,
              }}
            />
            <Container>
              <Row>
                <Col className="mr-auto text-left" lg="6" md="7">
                  <h1 className="title">
                    BOUGEZ, AMUSEZ-VOUS ET GAGNEZ DES CRYPTOS
                  </h1>
                  <br />
                  <div className="buttons">
                    <Button
                      className="btn-round mr-3 pulse"
                      color="success"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      <i className="tim-icons icon-bag-16" />
                    </Button>
                    <p>
                      Participez aux expériences sportives FILLGOOD et remportez
                      vos premiers $FIGO !
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
        <div className="main">
          <div className="header header-3">
            <div className="page-header header-filter">
              <div className="content-center">
                <Row>
                  <Col
                    className="ml-auto mr-auto positioned"
                    lg="5"
                    md="8"
                    xs="12"
                  >
                    <h1 className="title">Gagnez des $FIGO !</h1>
                    <p className="description">
                      FIILGOOD , la plateforme communautaire qui finance et
                      rémunère votre activité physique. Scannez votre preuve de
                      participation et recevez une récompense.
                    </p>
                    <p></p>
                    <Button
                      color="primary"
                      href="/scanner"
                      onClick={(e) => e.preventDefault()}
                      size="lg"
                    >
                      Recevoir ma récompense
                    </Button>
                  </Col>
                  <Col md="12">
                    <Slick {...slickHeader3Settings}>
                      <div>
                        <img
                          alt="..."
                          height="500"
                          src={require("assets/images/qrcode-web3.jpg")}
                          width="450"
                        />
                      </div>
                      <div>
                        <img
                          alt="..."
                          height="500"
                          src={require("assets/images/scan-qrcode.png")}
                          width="450"
                        />
                      </div>
                      <div>
                        <img
                          alt="..."
                          height="500"
                          src={require("assets/images/vertical-run.jpg")}
                          width="450"
                        />
                      </div>
                      <div>
                        <img
                          alt="..."
                          height="500"
                          src={require("assets/images/nigth-ligts.jpg")}
                          width="450"
                        />
                      </div>
                      <div>
                        <img
                          alt="..."
                          height="500"
                          src={require("assets/images/attendency.jpg")}
                          width="450"
                        />
                      </div>
                    </Slick>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {/* section */}
          <Container className="text-center">
            <Row>
              <Col className="mx-auto text-center mt-5" md="10">
                <h3 className="section-title">
                  Faites votre choix parmi les milliers d’expériences sportives
                  référencées sur FILLGOOD
                </h3>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <Card
                  className="card-blog card-background"
                  data-animation={true}
                >
                  <div
                    className="full-background"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/images/handball.jpg") + ")",
                    }}
                  />
                  <CardBody>
                    <div className="content-bottom">
                      <h6 className="card-category">Equipe</h6>
                      <Link to="/agenda?filter=sport&value=handball">
                        <CardTitle tag="h3">HandBall</CardTitle>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6">
                <Card
                  className="card-blog card-background"
                  data-animation={true}
                >
                  <div
                    className="full-background"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/images/swimrun.jpg") + ")",
                    }}
                  />
                  <CardBody>
                    <div className="content-bottom">
                      <h6 className="card-category">Individuel</h6>
                      <Link to="/agenda?filter=sport&value=handball">
                        <CardTitle tag="h3">Swim and run</CardTitle>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md="4">
                <Card
                  className="card-blog card-background"
                  data-animation={true}
                >
                  <div
                    className="full-background"
                    style={{
                      backgroundImage:
                        "url(" +
                        require("assets/images/roller-derby.jpg") +
                        ")",
                    }}
                  />
                  <CardBody>
                    <div className="content-bottom">
                      <h6 className="card-category">Mixtes</h6>
                      <Link to="/agenda?filter=sport&value=handball">
                        <CardTitle tag="h3">Roller Derby</CardTitle>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col md="8">
                <Card
                  className="card-blog card-background"
                  data-animation={true}
                >
                  <div
                    className="full-background"
                    style={{
                      backgroundImage:
                        "url(" + require("assets/images/vtt.jpg") + ")",
                    }}
                  />
                  <CardBody>
                    <div className="content-bottom">
                      <h6 className="card-category">Individuel</h6>
                      <Link to="/agenda?filter=sport&value=handball">
                        <CardTitle tag="h3">VTT Enduro</CardTitle>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>

          {/* section */}
        </div>
        <div className="page-header">
          <div className="content-center">
            <Container>
              <Row className="align-items-center text-left">
                <Col lg="6" xs="12">
                  <h1 className="title">
                    Vous aussi <br />
                    <strong className="text-info">
                      proposez vos expériences sportives à la communauté
                      FILLGOOD
                    </strong>
                  </h1>
                  <p className="description">
                    Nous vous recontactons pour vous présenter la puissance et
                    les avantages de la communauté sportive connectée Fillgood{" "}
                  </p>
                  <Row className="row-input">
                    <Col className="mt-1" sm="8" xs="12">
                      <Input
                        aria-label="Your email"
                        id="signupSrEmail"
                        name="email"
                        placeholder="votre email pro"
                        type="email"
                      />
                    </Col>
                    <Col sm="4" xs="12">
                      <Button block color="info">
                        je veux des infos
                      </Button>
                    </Col>
                  </Row>
                </Col>
                <Col lg="6" xs="12">
                  <img
                    alt="..."
                    className="path path3"
                    src={require("assets/images/shape-s.png")}
                  />
                  {/* SVG Illustration */}
                  <figure className=" header-shape">
                    <svg
                      className=" injected-svg js-svg-injector"
                      style={{ enableBackground: "new 10 12 878.9 907" }}
                      viewBox="10 12 878.9 907"
                      x="0px"
                      y="0px"
                      xmlSpace="preserve"
                    >
                      <g>
                        <defs>
                          <path
                            d="M300.34,75.35C379.42-7.43,305.86,185.78,540.87,98.95,647.68,46,677,219,674.65,258.55c-11,185-132.32,65-13.89,317.66,56.86,121.32-94.88,256-155.89,151.41-55.11-94.48-151.56-85.1-189-90.54-311-45.27-9.33-148.52-125.21-256.78C9.7,211.2,190.5,100.86,306.34,70.35Z"
                            id="shape1"
                          />
                        </defs>
                        <clipPath id="shape2">
                          <use
                            style={{ overflow: "visible" }}
                            xlinkHref="#shape1"
                          />
                        </clipPath>
                        <g clipPath="url(#shape2)">
                          <image
                            height="900"
                            id="imageShape1"
                            style={{ overflow: "visible" }}
                            transform="matrix(0.9488 0 0 0.9488 25 53.1187)"
                            width="800"
                            xlinkHref={require("assets/images/sprint.jpg")}
                          />
                        </g>
                      </g>
                      <g>
                        <defs>
                          <path
                            d="M186.26,647.36c7,1,14,1.87,21.11,2.4,42.73,3.24,173.84,9.32,234.51,60.15,72.83,61,105.38,80.19,37.4,96.45C388.73,828,438.49,724,312,749.28c-167.3,33.46-210.61-70.86-181.08-90.54C151.8,644.8,174.69,645.67,186.26,647.36Z"
                            id="shape3"
                          />
                        </defs>
                        <clipPath id="shape4">
                          <use
                            style={{ overflow: "visible" }}
                            xlinkHref="#shape3"
                          />
                        </clipPath>
                        <g
                          clipPath="url(#shape4)"
                          transform="matrix(1 0 0 1 0 0)"
                        >
                          <image
                            height="900"
                            id="imageShape2"
                            style={{ overflow: "visible" }}
                            transform="matrix(0.9488 0 0 0.9488 25 53.1187)"
                            width="900"
                            xlinkHref={require("assets/images/sprint.jpg")}
                          />
                        </g>
                      </g>
                    </svg>
                  </figure>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
}
