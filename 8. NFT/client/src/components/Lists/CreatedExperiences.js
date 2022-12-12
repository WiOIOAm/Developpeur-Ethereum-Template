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
import { useContractRead } from "wagmi";

// reactstrap components
import { Button, Table } from "reactstrap";

import Fillgood from "contracts/Fillgood.json";

export default function CreatedExperiences() {
  const { abi } = Fillgood;
  const { data, isError, isLoading, error } = useContractRead({
    address: "0x3430C709dE5dB20a4dF942A132418D511efBDe9F",
    abi,
    functionName: "experiences",
    args: ["0"],

    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  return (
    <>
      <header>
        <h2 className="text-uppercase">Mes expériences crées</h2>
      </header>
      <hr className="line-info" />
      {isLoading && <p>Chargement..</p>}
      <Table className="align-items-center">
        <thead>
          <tr>
            <th scope="col">Nom</th>
            <th scope="col">statut</th>
            <th scope="col">prix</th>
            <th scope="col">récompense</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td className="text-center"></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td className="text-center"></td>
            <td></td>
          </tr>
        </tbody>
      </Table>

      {isError && <div>Error: {error?.message}</div>}
    </>
  );
}
