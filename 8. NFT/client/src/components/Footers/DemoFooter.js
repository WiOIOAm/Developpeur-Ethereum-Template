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
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function DemoFooter() {
  return (
    <>
      <footer className="footer">
        <Container>
          <Row>
            <Col md="2">
              <h1 className="title">FILLGOOD</h1>
            </Col>
            <Col md="2" xs="6">
              <Nav>
                <NavItem>
                  <Link to="/landing-page" tag={Link}>
                    contact
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/register-page" tag={Link}>
                    whitepaper
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/profile-page" tag={Link}>
                    Dossier de presse
                  </Link>
                </NavItem>
              </Nav>
            </Col>
            <Col md="2" xs="6">
              <Nav>
                <NavItem>
                  <Link to="/cgv" target="_blank">
                    CGV
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/cookies" target="_blank">
                    Cookies
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/mentions-legales" target="_blank">
                    Mentions légales
                  </Link>
                </NavItem>
              </Nav>
            </Col>
            <Col md="2" xs="6">
              <Nav>
                <NavItem>
                  <Link to="/" tag={Link}>
                    Accueil
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/mon-compte" target="_blank">
                    mon compte
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/cagnotte" target="_blank">
                    Dépenser ma cagnotte
                  </Link>
                </NavItem>
              </Nav>
            </Col>
            <Col md="2" xs="6">
              <Nav>
                <NavItem>
                  <Link to="/foire-aux-questions" target="_blank">
                    FAQ
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="/devenir-partenaire" target="_blank">
                    Devenir partenaire
                  </Link>
                </NavItem>
                <NavItem>
                  <Link to="mailto:support@fillgood.xyz" target="_blank">
                    Remonter un bug
                  </Link>
                </NavItem>
              </Nav>
            </Col>
            <Col md="2">
              <h3 className="title">Suivez nous :</h3>
              <div className="btn-wrapper profile text-left">
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="#"
                  id="tooltip39661217"
                  target="_blank"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip39661217">
                  Twitter
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple ml-1"
                  color="default"
                  href="#"
                  id="tooltip206037619"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip206037619">
                  Facebook
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple ml-1"
                  color="default"
                  href="#"
                  id="tooltip750293512"
                  target="_blank"
                >
                  <i className="fab fa-telegram" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip750293512">
                  Telegram
                </UncontrolledTooltip>
              </div>
              <div className="btn-wrapper profile text-left">
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="#"
                  id="tooltip39661217"
                  target="_blank"
                >
                  <i className="fab fa-youtube" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip39661217">
                  Youtube
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple ml-1"
                  color="default"
                  href="#"
                  id="tooltip206037619"
                  target="_blank"
                >
                  <i className="fab fa-tiktok" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip206037619">
                  TikTok
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple ml-1"
                  color="default"
                  href="#"
                  id="tooltip750293512"
                  target="_blank"
                >
                  <i className="fab fa-linkedin" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip750293512">
                  Linkedin
                </UncontrolledTooltip>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}
