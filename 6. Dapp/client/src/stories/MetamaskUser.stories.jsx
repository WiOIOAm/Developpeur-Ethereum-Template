import React from "react";

import MetamaskUser from "../components/metamaskUser";

export default {
  title: "Components/MetamaskUser",
  component: MetamaskUser,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
  },
};

const Template = (args) => <MetamaskUser {...args} />;

export const notRegistred = Template.bind({});
notRegistred.args = {
  me: {
    address: "0xfB86eE9D109B5030000840b93ba61F5D1274160a",
    isOwner: false,
    isRegistered: false,
    hasVoted: false,
    votedProposalId: 0,
  },
};

export const ownerView = Template.bind({});
ownerView.args = {
  me: {
    address: "0x2253dE267d48dc5A21b5a9b177E313F72fCb06BF",
    isOwner: true,
    isRegistered: false,
    hasVoted: false,
    votedProposalId: 0,
  },
};

export const registredView = Template.bind({});
registredView.args = {
  me: {
    address: "0x2253dE267d48dc5A21b5a9b177E313F72fCb06BF",
    isOwner: false,
    isRegistered: true,
    hasVoted: true,
    votedProposalId: 1,
  },
};
