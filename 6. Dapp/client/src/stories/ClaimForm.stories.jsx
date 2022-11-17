import React from "react";

import ClaimForm from "../components/claimForm";

export default {
  title: "Form/ClaimForm",
  component: ClaimForm,
  actions: { argTypesRegex: "^on[A-Z].*" },
};
const Template = (args) => <ClaimForm {...args} />;

export const form = Template.bind({});
form.args = {
  isLoading: false,
  isClaimSended: false,
  me: {
    address: "0xabc123",
    isOwner: false,
    isRegistered: false,
    hasVoted: false,
    votedProposalId: 0,
  },
};
export const formLoading = Template.bind({});
formLoading.args = {
  isLoading: true,
  isClaimSended: false,
  me: {
    address: "0xabc123",
    isOwner: false,
    isRegistered: false,
    hasVoted: false,
    votedProposalId: 0,
  },
};

export const formSended = Template.bind({});
formSended.args = {
  isClaimSended: true,
  isLoading: false,
  me: {
    address: "0xabc123",
    isOwner: false,
    isRegistered: false,
    hasVoted: false,
    votedProposalId: 0,
  },
};
