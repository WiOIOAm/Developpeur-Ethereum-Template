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
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  Button,
} from "reactstrap";

// context
import useEth from "contexts/EthContext/useEth";

import truncateEthAddress from "utils/truncate-eth-address";

export default function ColorNavbar() {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const {
    state: { me },
    dispatch,
  } = useEth();

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeNavbarColor);
    };
  }, []);

  const changeNavbarColor = () => {
    if (
      document.documentElement.scrollTop > 299 ||
      document.body.scrollTop > 299
    ) {
      setNavbarColor("bg-success");
    } else if (
      document.documentElement.scrollTop < 300 ||
      document.body.scrollTop < 300
    ) {
      setNavbarColor("navbar-transparent");
    }
  };
  const handleClick = () => {
    dispatch({
      type: "ASK_CONNECTION",
    });
  };
  return (
    <>
      <Navbar className={"fixed-top " + navbarColor} expand="lg">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand to="/" tag={Link} id="tooltip6619950104">
              <span>FILLGOOD •</span> Booster d'évènements sportifs
            </NavbarBrand>
            <UncontrolledTooltip delay={0} target="tooltip6619950104">
              Certification Alyra RINKEBY
            </UncontrolledTooltip>
            <button className="navbar-toggler" id="navigation">
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <UncontrolledCollapse navbar toggler="#navigation">
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <Link to="/">
                    FILLGOOD •<span> Booster d'évènements sportifs</span>
                  </Link>
                </Col>
                <Col className="collapse-close text-right" xs="6">
                  <button className="navbar-toggler" id="navigation">
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav className="ml-auto" navbar>
              <NavItem className="active">
                <Link to="/">Accueil</Link>
              </NavItem>
              <NavItem className="active">
                <Link to="/sports">Sport</Link>
              </NavItem>
              <NavItem className="active">
                <Link to="/agenda">Agenda</Link>
              </NavItem>
              <NavItem className="active">
                <Link to="/a-propos">A propos</Link>
              </NavItem>
              <NavItem>
                <Link to="/dashboard">
                  <Button className="nav-link" color="default" size="sm">
                    <p>Dashboard</p>
                  </Button>
                </Link>
              </NavItem>
              <NavItem>
                <Button
                  className="nav-link"
                  color="primary"
                  size="sm"
                  onClick={handleClick}
                >
                  {me?.address
                    ? truncateEthAddress(me.address)
                    : "Connect Wallet"}
                  <br />
                  {me?.figo || 0} $FIGO
                </Button>
              </NavItem>
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </>
  );
}
