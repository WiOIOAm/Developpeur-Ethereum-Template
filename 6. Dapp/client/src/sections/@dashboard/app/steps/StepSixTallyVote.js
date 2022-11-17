import { Typography } from "@mui/material";

export default function StepSixTallyVote({ me, winningProposalId }) {
  return (
    <>
      {me.isOwner && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Le vainqueur est annoncé
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            le vainqueur définitif est {winningProposalId}
          </Typography>
        </>
      )}
      {me.isRegistered && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Le vainqueur est annoncé
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            le vainqueur définitif est {winningProposalId}
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Consultez les propositions ci-dessous
          </Typography>
          {/* <ProposalList /> */}
        </>
      )}
    </>
  );
}
