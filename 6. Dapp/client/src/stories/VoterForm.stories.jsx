import React from "react";

import VoterForm from "../components/voterForm";

export default {
  title: "Form/VoterForm",
  component: VoterForm,
  actions: { argTypesRegex: "^on[A-Z].*" },
};
const Template = (args) => <VoterForm {...args} />;

export const form = Template.bind({});
form.args = {
  isLoading: false,
};
export const formLoading = Template.bind({});
formLoading.args = {
  isLoading: true,
};
