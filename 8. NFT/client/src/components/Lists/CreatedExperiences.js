import React from "react";

// reactstrap components
import { Table } from "reactstrap";
import convert from "ethereum-unit-converter";
// context
import useEth from "contexts/EthContext/useEth";

export default function CreatedExperiences() {
  const {
    state: { errorMessage, isLoading, me },
  } = useEth();
  return (
    <>
      <header>
        <h2 className="text-uppercase">Mes expériences crées</h2>
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
              <th scope="col">jauge</th>
            </tr>
          </thead>
          <tbody>
            {me?.experiences?.map(
              ({
                name,
                nbTickets,
                nbTicketsSold,
                price,
                reward,
                meetingPlace,
                date,
              }) => (
                <tr>
                  <td>{name}</td>
                  <td>{}</td>
                  <td>{meetingPlace}</td>
                  <td className="text-center">
                    {convert(price, "wei", "ether")} $FIGO
                  </td>
                  <td>{convert(reward, "wei", "ether")} $FIGO</td>
                  <td>{`${nbTicketsSold}/${nbTickets}`}</td>
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
