import { Typography } from "@mui/material";

export default function StepFiveVoteClosed({ me }) {
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
          {/* <ProposalList /> */}
        </>
      )}
    </>
  );
}
