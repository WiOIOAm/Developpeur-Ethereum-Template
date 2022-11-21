import { Typography } from "@mui/material";
// components
import {
  StepOneRegisterVoters,
  StepTwoRegisterProposals,
  StepThreeProposalsClosed,
  StepFourVoteOpen,
  StepFiveVoteClosed,
  StepSixTallyVote,
} from "./steps";
// context
import useEth from "../../../contexts/EthContext/useEth";

export const NonRegistered = ({ me, currentStep }) => {
  return (
    currentStep !== "0" &&
    !me.isOwner &&
    !me.isRegistered && (
      <>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Vous n'êtes pas autorisé à participer au vote
        </Typography>
      </>
    )
  );
};

export default function AppSwitchStepView() {
  const {
    state: { me, currentStep },
  } = useEth();

  if (currentStep !== "0" && !!me && !me.isOwner && !me.isRegistered) {
    return <NonRegistered me={me} currentStep={currentStep} />;
  }

  let view;
  switch (currentStep) {
    case "0":
      view = <StepOneRegisterVoters />;
      break;
    case "1":
      view = <StepTwoRegisterProposals />;
      break;
    case "2":
      view = <StepThreeProposalsClosed />;
      break;
    case "3":
      view = <StepFourVoteOpen />;
      break;
    case "4":
      view = <StepFiveVoteClosed />;
      break;
    case "5":
      view = <StepSixTallyVote />;
      break;
    default:
      view = <>pas de session correpondante </>;
      break;
  }

  return view;
}
