import React from "react";

import { VerticalLinearStepper } from "../components/VerticalLinearStepper";

export default {
  title: "Example/VerticalLinearStepper",
  component: VerticalLinearStepper,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
  },
};

const Template = (args) => <VerticalLinearStepper {...args} />;

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
export const notRegistred = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
notRegistred.args = {
  steps,
  isOwner: false,
};

export const ownerView = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
ownerView.args = {
  steps,
  isOwner: true,
};
