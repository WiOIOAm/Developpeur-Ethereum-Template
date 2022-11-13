// ----------------------------------------------------------------------

const steps = [
  {
    name: "RegisteringVoters",
    label: "Enregistrement des votants",
    description: `L'animateur du vote enregistre les votants.`,
  },
  {
    name: "ProposalsRegistrationStarted",
    label: "Faire une Proposition",
    description: "Agissez ! faites une ou plusieurs propositions",
  },
  {
    name: "ProposalsRegistrationEnded",
    label: "Fin des Propositions",
    description:
      "La phase de dépôt des propositions est fermée. Veuillez attendre la session de vote",
  },
  {
    name: "VotingSessionStarted",
    label: "Session de vote ouverte",
    description: "Agissez ! Votez pour votre proposition favorite",
  },
  {
    name: "VotingSessionEnded",
    label: "Session de vote fermée",
    description:
      "La phase de vote est fermée. Veuillez attendre l'affichage du résultat",
  },
];

export default steps;
