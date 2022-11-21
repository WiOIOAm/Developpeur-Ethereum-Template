import { Typography } from "@mui/material";

import ProposalsTable from "../../../../components/proposalsTable";
// context
import useEth from "../../../../contexts/EthContext/useEth";

export default function StepThreeProposalsClosed() {
  const {
    state: { me, proposals },
  } = useEth();

  return (
    <>
      {me.isOwner && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            L'enregistrement de propositions est terminé.
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Passez à la session suivante pour lancer la session de vote
          </Typography>
        </>
      )}
      {me.isRegistered && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            En attente de la session de vote
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Consultez les propositions ci dessous
          </Typography>
          <ProposalsTable proposals={proposals} />
        </>
      )}
    </>
  );
}
