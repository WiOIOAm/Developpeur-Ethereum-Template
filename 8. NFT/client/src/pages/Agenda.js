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
import { Link, useNavigate } from "react-router-dom";
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

// context
import useEth from "contexts/EthContext/useEth";

export default function ProductPage() {
  const navigate = useNavigate();
  const {
    state: {
      errorMessage,
      isLoading,
      experiences,
      networkID,
      artifact,
      contract,
      figoContract,
      me,
    },
    dispatch,
  } = useEth();
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
  const sport = ["Handall", "RollerDerby", "Enduro", "Escalade"];
  const handleRegister = async (experienceId, price) => {
    if (!isLoading && me) {
      try {
        dispatch({ type: "LOADING", data: true });
        const figoAddress = artifact.networks[networkID].address;
        const approve = await figoContract.methods
          .approve(figoAddress, parseInt(price))
          .send({ from: me.address });

        console.log("APPROVE", approve);
        const res = await contract.methods
          .registerParticipant(experienceId)
          .send({ from: me.address });

        dispatch({ type: "SUCCESS", data: res.status });
        navigate("/dashboard");
      } catch (error) {
        console.error("handleRegister", error);
        dispatch({
          type: "ERROR",
          data: error.message,
        });
      }
      dispatch({ type: "LOADING", data: false });
    }
  };
  return (
    <>
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
              {errorMessage}
            </Col>
            <Row>
              {experiences?.map((experience) => (
                <Col lg="3" md="6">
                  <Card
                    className="card-product"
                    onClick={() =>
                      handleRegister(experience.experienceId, experience.price)
                    }
                  >
                    <div className="card-image">
                      <Link to={"/experience/${experienceId}"}>
                        <img
                          alt="..."
                          className="img rounded"
                          src={require("assets/images/sprint.jpg")}
                        />
                      </Link>
                    </div>
                    <CardBody>
                      <h6 className="category text-warning">
                        {sport[experience.experienceType.toString()]}
                      </h6>
                      <CardTitle tag="h4">
                        <CardLink
                          className="text-white"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          {experience.name}
                        </CardLink>
                      </CardTitle>
                      <div className="card-description">
                        {experience.meetingPlace}
                        <br />
                        {experience.nbTicketsSold} vendus
                        {" / "}
                        {experience.nbTickets} places
                      </div>
                      <CardFooter>
                        <div className="price-container">
                          <span className="price">
                            {experience.price} $FIGO
                          </span>
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
                          Récompense :{experience.reward} $FIGO
                        </UncontrolledTooltip>
                      </CardFooter>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
