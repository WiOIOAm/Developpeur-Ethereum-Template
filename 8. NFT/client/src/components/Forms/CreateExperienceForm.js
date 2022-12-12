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
import { useFormik } from "formik";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

// reactstrap components
import { Button, FormGroup, Input, Row, Col } from "reactstrap";
import Fillgood from "contracts/Fillgood.json";

export default function CreateExperienceForm() {
  const { abi } = Fillgood;
  const formik = useFormik({
    initialValues: {
      nbTickets: "0",
      price: "10",
      reward: "1",
      date: "2023-12-12",
      name: "",
      sport: "0",
      location: "",
    },

    onSubmit: (values) => {
      console.log("onSubmit", values);
      write?.();
    },
  });
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0x2d108c98e6ebf433a711BEbAa3E8524d92426Add",
    abi,
    functionName: "addExperience",
    args: [
      parseInt(formik.values.nbTickets),
      parseInt(formik.values.price),
      parseInt(formik.values.reward),
      parseInt(Date.parse(formik.values.date)),
      formik.values.name,
      formik.values.sport,
      formik.values.location,
    ],
  });
  const { data, error, isError, write } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <header>
          <h2 className="text-uppercase">Créer une expérience</h2>
        </header>
        <hr className="line-info" />
        <br />
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

        <Row className="mt-4">
          <Col md="6">
            <Button color="info" type="submit" disabled={!write || isLoading}>
              {isLoading ? "Validation..." : "Valider"}
            </Button>

            {isSuccess && (
              <div>
                Votre expérience a bien été ajoutée
                <div>
                  <a href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>
                    Etherscan
                  </a>
                </div>
                {(isPrepareError || isError) && (
                  <div>Error: {(prepareError || error)?.message}</div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </form>
    </>
  );
}
