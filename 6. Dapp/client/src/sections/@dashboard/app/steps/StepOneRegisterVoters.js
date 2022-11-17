import { useState } from "react";

import VoterForm from "../../../../components/voterForm/VoterForm";
import ClaimForm from "../../../../components/claimForm/ClaimForm";

import { Typography } from "@mui/material";

import useEmailjs from "../../../../hooks/useEmailjs";

export default function StepOneRegisterVoters({ contract, me }) {
  const emailjs = useEmailjs();

  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isClaimSended, setIsClaimSended] = useState(false);

  const handleSubmitClaim = async (e) => {
    setIsClaimLoading(true);
    e.preventDefault();
    if (!me?.isRegistred) {
      const ethAddress = e.target[0].value;
      try {
        await emailjs.sendAddressToOwner(ethAddress);
        setIsClaimSended(true);
      } catch (error) {
        // catch metamask reject transaction
        console.error(error);
      }
    }
    setIsClaimLoading(false);
  };

  const handleSubmitVoter = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (me?.isOwner) {
      const ethAddress = e.target[0].value;
      try {
        await contract.methods.addVoter(ethAddress).send({ from: me.address });
      } catch (error) {
        // catch metamask reject transaction
        console.error(error);
      }
    }
    setIsLoading(false);
  };
  return (
    <>
      {me.isOwner && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Ajouter des votants
          </Typography>
          <VoterForm handleSubmit={handleSubmitVoter} isLoading={isLoading} />
        </>
      )}
      {!me.isRegistered && (
        <>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Demander à devenir votant
          </Typography>
          <ClaimForm
            handleSubmit={handleSubmitClaim}
            isLoading={isClaimLoading}
            isClaimSended={isClaimSended}
          />
        </>
      )}
      {me.isRegistered && (
        <>
          <Typography variant="h4" sx={{ mt: 5 }}>
            Vous avez le droit de voter.
          </Typography>
          <Typography variant="body" sx={{ mb: 5 }}>
            Vous êtes en attente de la session d'enregistrement des propositions
          </Typography>
        </>
      )}
    </>
  );
}
