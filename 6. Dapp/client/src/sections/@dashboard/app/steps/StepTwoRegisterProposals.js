import { Typography } from "@mui/material";

export default function StepTwoRegisterProposals({ me }) {
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
          {/* <ProposalForm /> */}
        </>
      )}
    </>
  );
}
