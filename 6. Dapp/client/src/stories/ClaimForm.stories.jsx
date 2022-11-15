import React from "react";

import ClaimForm from "../components/claimForm";

export default {
  title: "Form/ClaimForm",
  component: ClaimForm,
  actions: { argTypesRegex: "^on[A-Z].*" },
};
const Template = (args) => <ClaimForm {...args} />;

export const form = Template.bind({});
form.args = {};
