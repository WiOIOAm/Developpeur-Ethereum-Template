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
// react plugin used to create DropdownMenu for selecting items
import Select from "react-select";

// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ColorNavbar from "components/Navbars/ColorNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import ImageUpload from "components/CustomUpload/ImageUpload.js";

// parts
import CreateExperienceForm from "components/Forms/CreateExperienceForm.js";
import CreatedExperiences from "components/Lists/CreatedExperiences.js";

export default function AccountSettings() {
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
      <ColorNavbar />
      <div className="wrapper" ref={wrapper}>
        <div className="section">
          <Container>
            <Row>
              <Col md="3">
                <div className="section">
                  {/* User Information */}
                  <section className="text-center">
                    <ImageUpload avatar addBtnColor="default" />
                    <h3 className="title">Charlie Bailey</h3>
                  </section>
                  {/* User Information */}
                  {/* Profile Sidebar */}
                  <section>
                    <br />
                    <Nav className="flex-column nav-tabs-info" role="tablist">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: profileTabs === 1,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(1);
                          }}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-single-02" /> Créer une
                          expérience
                        </NavLink>
                      </NavItem>
                      <hr className="line-info" />
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: profileTabs === 2,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(2);
                          }}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-credit-card" /> Mes
                          expériences créées
                        </NavLink>
                      </NavItem>
                      <hr className="line-info" />
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: profileTabs === 3,
                          })}
                          onClick={(e) => {
                            e.preventDefault();
                            setProfileTabs(3);
                          }}
                          href="#pablo"
                        >
                          <i className="tim-icons icon-lock-circle" /> Mes
                          participations
                        </NavLink>
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
                      <CreateExperienceForm />
                    </TabPane>
                    <TabPane tabId="profile2">
                      <CreatedExperiences />
                    </TabPane>
                    <TabPane tabId="profile3">
                      <div className="g-pos-rel h-100 g-brd-around g-brd-gray-light-v7 g-rounded-4 g-pa-15 g-pa-30--md">
                        <header>
                          <h2 className="text-uppercase g-font-size-12 g-font-size-default--md g-color-black mb-0">
                            Mes participations
                          </h2>
                        </header>
                        <hr className="line-info" />
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <DemoFooter />
      </div>
    </>
  );
}
