import React from "react";

import { VerticalLinearStepper } from "../components/VerticalLinearStepper";
import steps from "../_mock/steps";

export default {
  title: "Components/VerticalLinearStepper",
  component: VerticalLinearStepper,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
  },
};

const Template = (args) => <VerticalLinearStepper {...args} />;

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
