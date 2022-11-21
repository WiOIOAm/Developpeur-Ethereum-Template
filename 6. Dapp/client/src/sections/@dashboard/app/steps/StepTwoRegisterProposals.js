import { useState } from "react";

import { Typography } from "@mui/material";

import ProposalsTable from "../../../../components/proposalsTable";
import ProposalForm from "../../../../components/proposalForm";

// context
import useEth from "../../../../contexts/EthContext/useEth";

export default function StepTwoRegisterProposals() {
  const {
    state: { me, contract, proposals },
  } = useEth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!me?.isRegistred && !isLoading) {
      const proposal = e.target[0].value;
      await contract.methods.addProposal(proposal).send({ from: me.address });

      try {
        setIsLoading(true);
        e.target.reset();
      } catch (error) {
        // catch metamask reject transaction
        alert(JSON.stringify(error));
        console.error("handleSubmitStepTwo", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {me.isOwner && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Enregistrement des propositions en cours par les votants
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Arretez la session de propositions en passant à l'étape suivante
          </Typography>
        </>
      )}
      {me.isRegistered && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Faire une proposition
          </Typography>
          <ProposalForm handleSubmit={handleSubmit} isLoading={isLoading} />
          <ProposalsTable proposals={proposals} />
        </>
      )}
    </>
  );
}
