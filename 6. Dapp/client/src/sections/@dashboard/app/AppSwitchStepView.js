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
    state: { me, currentStep, contract, winningProposalId },
  } = useEth();

  if (currentStep !== "0" && !me.isOwner && !me.isRegistered) {
    return <NonRegistered me={me} currentStep={currentStep} />;
  }

  let view;
  switch (currentStep) {
    case "0":
      view = <StepOneRegisterVoters me={me} contract={contract} />;
      break;
    case "1":
      view = <StepTwoRegisterProposals me={me} contract={contract} />;
      break;
    case "2":
      view = <StepThreeProposalsClosed me={me} />;
      break;
    case "3":
      view = <StepFourVoteOpen me={me} />;
      break;
    case "4":
      view = <StepFiveVoteClosed me={me} />;
      break;
    case "5":
      view = <StepFiveVoteClosed me={me} />;
      break;
    case "6":
      view = <StepSixTallyVote me={me} winningProposalId={winningProposalId} />;
      break;
    default:
      view = <>pas de session correpondante </>;
      break;
  }

  return view;
}
