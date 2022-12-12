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
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardLink,
  CardTitle,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import ColorNavbar from "components/Navbars/ColorNavbar.js";
import { useContractRead } from "wagmi";

import DemoFooter from "components/Footers/DemoFooter.js";

import Fillgood from "contracts/Fillgood.json";

export default function ProductPage() {
  const { abi } = Fillgood;
  const { data, isError, isLoading, error } = useContractRead({
    address: "0x3430C709dE5dB20a4dF942A132418D511efBDe9F",
    abi,
    functionName: "experiences",
    args: [0],

    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });
  const wrapper = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add("product-page");
    return function cleanup() {
      document.body.classList.remove("product-page");
    };
  }, []);

  return (
    <>
      <ColorNavbar />
      <div className="wrapper" ref={wrapper}>
        <div className="section">
          <img
            alt="..."
            className="path shape"
            src={require("assets/images/shape-s.png")}
          />
          <Container>
            <Col md="8">
              <h2 className="title">Agenda</h2>
              {isLoading && <h3>Chargement en cours...</h3>}
            </Col>
            <Row>
              <Col lg="3" md="6">
                {!!data && (
                  <Card className="card-product">
                    <div className="card-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="img rounded"
                          src={require("assets/images/sprint.jpg")}
                        />
                      </a>
                    </div>
                    <CardBody>
                      <h6 className="category text-warning">
                        {data.experienceType}
                      </h6>
                      <CardTitle tag="h4">
                        <CardLink
                          className="text-white"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {data.name}
                        </CardLink>
                      </CardTitle>
                      <div className="card-description">
                        {data.meetingPlace}
                        {data.nbTicketsSold} vendus
                        {" / "}
                        {data.nbTickets} places
                      </div>
                      <CardFooter>
                        <div className="price-container">
                          <span className="price">{data.price.toNumber()}</span>
                        </div>
                        <Button
                          className="btn-simple btn-icon btn-round pull-right"
                          color="warning"
                          id="tooltip320714545"
                        >
                          <i className="tim-icons icon-heart-2" />
                        </Button>
                        <UncontrolledTooltip
                          delay={0}
                          placement="left"
                          target="tooltip320714545"
                        >
                          Récompense :{data.reward.toNumber()}
                        </UncontrolledTooltip>
                      </CardFooter>
                    </CardBody>
                  </Card>
                )}
              </Col>
            </Row>
          </Container>
        </div>
        <DemoFooter />
      </div>
    </>
  );
}
