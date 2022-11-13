import React from "react";

import NavSection from "../components/nav-section";
import navConfig from "../layouts/dashboard/nav/config";

export default {
  title: "Example/NavSection",
  component: NavSection,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
  },
};
const Template = (args) => <NavSection {...args} />;

export const notRegistred = Template.bind({});
notRegistred.args = {
  data: navConfig,
  isOwner: false,
  isRegistered: false,
  isNonRegistered: true,
};

export const ownerView = Template.bind({});
ownerView.args = {
  data: navConfig,
  isOwner: true,
  isRegistered: false,
  isNonRegistered: false,
};

export const registredView = Template.bind({});
registredView.args = {
  data: navConfig,
  isOwner: false,
  isRegistered: true,
  isNonRegistered: false,
};
