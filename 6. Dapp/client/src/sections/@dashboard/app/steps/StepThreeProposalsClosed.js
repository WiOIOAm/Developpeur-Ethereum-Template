import { Typography } from "@mui/material";

export default function StepThreeProposalsClosed({ me }) {
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
          {/* <ProposalList /> */}
        </>
      )}
    </>
  );
}
