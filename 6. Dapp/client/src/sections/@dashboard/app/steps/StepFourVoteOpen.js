import { Typography } from "@mui/material";

export default function StepFourVoteOpen({ me }) {
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
          {/* <ProposalList votingSession={true} /> */}
        </>
      )}
    </>
  );
}
