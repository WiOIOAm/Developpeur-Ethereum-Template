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
import React, { useState } from "react";
import { useFormik } from "formik";
import convert from "ethereum-unit-converter";

// reactstrap components
import { Button, FormGroup, Input, Row, Col } from "reactstrap";
// core components
import ImageUpload from "components/CustomUpload/ImageUpload.js";

// context
import useEth from "contexts/EthContext/useEth";

export default function CreateExperienceForm({ setProfileTabs }) {
  const {
    state: { me, contract, errorMessage, isLoading, isSuccess },
    dispatch,
  } = useEth();
  const [tx, setTx] = useState(null);

  const resetStates = () => {
    setTx(null);
    dispatch({ type: "ERROR", data: null });
    dispatch({ type: "LOADING", data: false });
    dispatch({ type: "SUCCESS", data: false });
  };
  const formik = useFormik({
    initialValues: {
      nbTickets: "120",
      price: "10",
      reward: "1",
      date: "2023-01-01",
      name: "Mon experience sur Fillgood",
      sport: "0",
      location: "Parc Borely Marseille",
    },

    onSubmit: async (values) => {
      if (!isLoading) {
        resetStates();
        try {
          dispatch({ type: "LOADING", data: true });
          const formatData = [
            parseInt(formik.values.nbTickets),
            convert(parseInt(formik.values.price), "ether", "wei").toString(),
            convert(parseInt(formik.values.reward), "ether", "wei").toString(),
            parseInt(Date.parse(formik.values.date)),
            formik.values.name,
            formik.values.sport,
            formik.values.location,
          ];

          const res = await contract.methods
            .addExperience(...formatData)
            .send({ from: me.address });
          setTx(res);
          console.log("onSubmit", res);
          dispatch({ type: "SUCCESS", data: res.status });
          setProfileTabs(2);
        } catch (e) {
          console.error("onSubmit", e);
          dispatch({ type: "ERROR", data: e.message });
        }

        dispatch({ type: "LOADING", data: false });
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <header>
          <h2 className="text-uppercase">Créer une expérience</h2>
        </header>
        <hr className="line-info" />
        {!me && (
          <p>
            Connectez-vous avec votre wallet sur le réseau local ou sur polygon
            mumbai
          </p>
        )}
        <br />
        {me && (
          <div>
            <Row>
              <Col className="align-self-center" md="3">
                <label className="labels" htmlFor="#name">
                  Nom de votre expérience
                </label>
              </Col>
              <Col className="align-self-center" md="9">
                <FormGroup>
                  <Input
                    defaultValue="Découverte VTT Circuit Vert"
                    id="name"
                    name="name"
                    required="required"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="align-self-center" md="3">
                <label className="labels">Sport</label>
              </Col>
              <Col className="align-self-center" md="4">
                <FormGroup>
                  <select
                    className="react-select react-select-info"
                    classNamePrefix="react-select"
                    placeholder="Sport"
                    name="sport"
                    id="sport"
                    class="input-text"
                    onChange={formik.handleChange}
                    value={formik.values.sport}
                  >
                    <option value="Handall">Handall</option>
                    <option value="Triathlon">Triathlon</option>
                    <option value="RollerDerby">RollerDerby</option>
                    <option value="VTT Enduro">VTT Enduro</option>
                    <option value="Escalade">Escalade</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="align-self-center" md="3">
                <label className="labels" htmlFor="#location">
                  Lieu de l'événement
                </label>
              </Col>
              <Col className="align-self-center" md="9">
                <FormGroup>
                  <Input
                    defaultValue="Sydney, A"
                    id="location"
                    name="location"
                    required="required"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.location}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="align-self-center" md="3">
                <label className="labels">Date</label>
              </Col>
              <Col className="align-self-center" md="9">
                <FormGroup>
                  <Input
                    defaultValue="YYYY-MM-DD"
                    id="date"
                    name="date"
                    required="required"
                    type="text"
                    pattern="\d{4}\-\d{1,2}\-\d{1,2}"
                    onChange={formik.handleChange}
                    value={formik.values.date}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="align-self-center" md="3">
                <label className="labels" htmlFor="#nbTickets">
                  Nombre de tickets
                </label>
              </Col>
              <Col className="align-self-center" md="9">
                <FormGroup>
                  <Input
                    defaultValue="1"
                    id="nbTickets"
                    name="nbTickets"
                    required="required"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.nbTickets}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col className="align-self-center" md="3">
                <label className="labels" htmlFor="#price">
                  Prix en FIGO
                </label>
              </Col>
              <Col className="align-self-center" md="9">
                <FormGroup>
                  <Input
                    defaultValue="10"
                    id="price"
                    name="price"
                    required="required"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className="align-self-center" md="3">
                <label className="labels" htmlFor="#reward">
                  Récompense en FIGO
                </label>
              </Col>
              <Col className="align-self-center" md="9">
                <FormGroup>
                  <Input
                    defaultValue="1"
                    id="reward"
                    name="reward"
                    required="required"
                    type="number"
                    onChange={formik.handleChange}
                    value={formik.values.reward}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <ImageUpload
                  avatar
                  cta="ajouter le billet"
                  addBtnColor="default"
                />
              </Col>
              <Col md="6">
                <ImageUpload
                  avatar
                  cta="ajouter la preuve de participation"
                  addBtnColor="default"
                />
              </Col>
            </Row>
            <Row className="mt-4">
              <Col md="6">
                <Button color="info" type="submit" disabled={isLoading}>
                  {isLoading ? "Validation..." : "Valider"}
                </Button>

                {isSuccess && (
                  <div>
                    Votre expérience a bien été ajoutée
                    <div>
                      <a
                        href={`https://mumbai.polygonscan.com/tx/${tx?.transactionHash}`}
                        target="blank"
                      >
                        Polygon Scan
                      </a>
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        )}
        {errorMessage}
        {isLoading && "en attente de signature sur votre wallet"}
      </form>
    </>
  );
}
