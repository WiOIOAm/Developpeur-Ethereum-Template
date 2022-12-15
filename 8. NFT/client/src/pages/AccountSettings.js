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
// nodejs library that concatenates classes
import classnames from "classnames";
import { Link } from "react-router-dom";

// reactstrap components
import {
  NavItem,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// parts
import CreateExperienceForm from "components/Forms/CreateExperienceForm.js";
import CreatedExperiences from "components/Lists/CreatedExperiences.js";
import truncateEthAddress from "utils/truncate-eth-address";

// context
import useEth from "contexts/EthContext/useEth";
import Participations from "components/Lists/Participations";

export default function AccountSettings() {
  const {
    state: { me },
  } = useEth();

  const [profileTabs, setProfileTabs] = React.useState(1);
  const wrapper = React.useRef(null);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    wrapper.current.scrollTop = 0;
    document.body.classList.add("account-settings");
    return function cleanup() {
      document.body.classList.remove("account-settings");
    };
  }, []);

  return (
    <>
      <div className="wrapper" ref={wrapper}>
        <div className="section">
          <Container>
            <Row>
              <Col md="3">
                <div className="section">
                  {/* User Information */}
                  <section className="text-center">
                    <h3 className="title">
                      {me
                        ? truncateEthAddress(me.address)
                        : "connectez votre wallet"}
                    </h3>
                  </section>
                  {/* User Information */}
                  {/* Profile Sidebar */}
                  <section>
                    <br />
                    <Nav className="flex-column nav-tabs-info" role="tablist">
                      <NavItem>
                        <Link
                          className={classnames({
                            active: profileTabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(1);
                          }}
                          to="#pablo"
                        >
                          <i className="tim-icons icon-single-02" /> Créer une
                          expérience
                        </Link>
                      </NavItem>
                      <hr className="line-info" />
                      <NavItem>
                        <Link
                          className={classnames({
                            active: profileTabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(2);
                          }}
                          to="#pablo"
                        >
                          <i className="tim-icons icon-credit-card" /> Mes
                          expériences créées
                        </Link>
                      </NavItem>
                      <hr className="line-info" />
                      <NavItem>
                        <Link
                          className={classnames({
                            active: profileTabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(3);
                          }}
                          to="#pablo"
                        >
                          <i className="tim-icons icon-lock-circle" /> Mes
                          participations
                        </Link>
                      </NavItem>
                      <hr className="line-info" />
                    </Nav>
                  </section>
                  {/* End Profile Sidebar */}
                </div>
              </Col>
              <Col className="ml-auto" md="8">
                <div className="section">
                  <TabContent activeTab={"profile" + profileTabs}>
                    <TabPane tabId="profile1">
                      <CreateExperienceForm setProfileTabs={setProfileTabs} />
                    </TabPane>
                    <TabPane tabId="profile2">
                      <CreatedExperiences />
                    </TabPane>
                    <TabPane tabId="profile3">
                      <Participations />
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
