import React from "react";

// reactstrap components
import { Table } from "reactstrap";

// context
import useEth from "contexts/EthContext/useEth";

export default function Participations() {
  const {
    state: { errorMessage, isLoading, me },
  } = useEth();

  return (
    <>
      <header>
        <h2 className="text-uppercase">Mes participations</h2>
      </header>
      <hr className="line-info" />
      {isLoading && <p>Chargement..</p>}
      {!isLoading && (
        <Table className="align-items-center">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">date</th>
              <th scope="col">lieu</th>
              <th scope="col">prix</th>
              <th scope="col">récompense</th>
              <th scope="col">POAP</th>
            </tr>
          </thead>
          <tbody>
            {me?.participations?.map(
              ({ proofScanned, name, price, reward, meetingPlace, date }) => (
                <tr>
                  <td>{name}</td>
                  <td></td>
                  <td>{meetingPlace}</td>
                  <td className="text-center">{price} $FIGO</td>
                  <td>
                    {reward} {proofScanned && "remboursés"}
                  </td>
                  <td>
                    {proofScanned
                      ? "Récupérez votre preuve de participation"
                      : "Scannez ici votre preuve de participation"}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
      )}

      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
}
