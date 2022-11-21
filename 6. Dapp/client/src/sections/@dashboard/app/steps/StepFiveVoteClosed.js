import { Typography } from "@mui/material";

import ProposalsTable from "../../../../components/proposalsTable";
// context
import useEth from "../../../../contexts/EthContext/useEth";

export default function StepFiveVoteClosed() {
  const {
    state: { me, proposals },
  } = useEth();
  return (
    <>
      {me.isOwner && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Les votes sont terminés
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Passez à la session suivante anoncer le vainqueur
          </Typography>
        </>
      )}
      {me.isRegistered && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            En attente de la révélation du vainqueur
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Consultez les propositions ci-dessous
          </Typography>
          <ProposalsTable proposals={proposals} votedId={me.votedProposalId} />
        </>
      )}
    </>
  );
}
