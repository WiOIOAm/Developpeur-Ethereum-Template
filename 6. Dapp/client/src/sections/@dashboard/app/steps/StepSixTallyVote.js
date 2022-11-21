import { Typography } from "@mui/material";

import ProposalsTable from "../../../../components/proposalsTable";
// context
import useEth from "../../../../contexts/EthContext/useEth";

export default function StepSixTallyVote() {
  const {
    state: { me, winningProposalId, proposals },
  } = useEth();

  return (
    <>
      {(me.isOwner || me.isRegistered) && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Le vainqueur est annoncé
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 5 }}>
            {`Le vainqueur définitif est : "${
              proposals[winningProposalId]?.description ||
              "Erreur de récupération de la proposition"
            }"`}
          </Typography>
        </>
      )}

      {me.isRegistered && (
        <>
          <Typography variant="body" sx={{ mb: 5 }}>
            Consultez le détail des votes ci-dessous
          </Typography>
          <ProposalsTable
            proposals={proposals}
            votedId={me.votedProposalId}
            winnerIsKnow={true}
          />
        </>
      )}
    </>
  );
}
