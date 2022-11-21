import { useState } from "react";

import { Typography } from "@mui/material";

import ProposalsTable from "../../../../components/proposalsTable";

// context
import useEth from "../../../../contexts/EthContext/useEth";

export default function StepFourVoteOpen() {
  const {
    state: { me, contract, proposals },
  } = useEth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (proposalId) => {
    setIsLoading(true);
    if (me.votedProposalId !== proposalId && !isLoading) {
      try {
        await contract.methods.setVote(1).send({ from: me.address });
      } catch (error) {
        // catch metamask reject transaction
        alert(JSON.stringify(error));
        console.error("handleSubmitFour", error);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      {me.isOwner && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Les participants votent
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Passez à la session suivante pour cloturer la session de vote
          </Typography>
        </>
      )}
      {me.isRegistered && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Votez pour votre proposition favorite
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Consultez les propositions ci-dessous
          </Typography>
          <ProposalsTable
            votedId={me.votedProposalId || null}
            proposals={proposals}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            voteIsOpen={true}
          />
        </>
      )}
    </>
  );
}
