import React from "react";

import ProposalsTable from "../components/proposalsTable";
import rows from "../_mock/proposals";

export default {
  title: "Table/ProposalsTable",
  component: ProposalsTable,
  actions: { argTypesRegex: "^on[A-Z].*" },
};
const Template = (args) => <ProposalsTable {...args} />;

export const table = Template.bind({});
table.args = {
  proposals: rows,
};
export const tableVote = Template.bind({});
tableVote.args = {
  voteIsOpen: true,
  isLoading: false,
  proposals: rows,
  votedId: null,
  winnerIsKnow: false,
  handleSubmit: function name(params) {},
};
export const tableVoted = Template.bind({});
tableVoted.args = {
  voteIsOpen: true,
  isLoading: false,
  proposals: rows,
  votedId: 3,
  winnerIsKnow: false,
  handleSubmit: function name(params) {},
};
export const tableWinnerIsKnow = Template.bind({});
tableWinnerIsKnow.args = {
  voteIsOpen: true,
  isLoading: false,
  proposals: rows,
  votedId: 3,
  winnerIsKnow: true,
  handleSubmit: function name(params) {},
};
