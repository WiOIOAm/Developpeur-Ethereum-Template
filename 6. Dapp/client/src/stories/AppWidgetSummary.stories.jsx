import React from "react";

import { AppWidgetSummary } from "../sections/@dashboard/app";

export default {
  title: "Example/AppWidgetSummary",
  component: AppWidgetSummary,
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
  },
  argTypes: {
    variant: {
      options: ["primary", "info", "secondary", "warning", "error"],
      control: { type: "color" },
    },
  },
};
const Template = (args) => <AppWidgetSummary {...args} />;

export const notRegistredView = Template.bind({});
notRegistredView.args = {
  title: "Non Registered",
  total: null,
  icon: "ant-design:bug-filled",
  color: "error",
  isOwner: false,
  isRegistered: false,
};

export const ownerView = Template.bind({});
ownerView.args = {
  title: "only viewed by Owner",
  total: 56,
  icon: "ant-design:android-filled",
  color: "primary",
  isOwner: true,
  isRegistered: false,
};

export const registredView = Template.bind({});
registredView.args = {
  title: "only viewed by Registered",
  total: 234,
  icon: "ant-design:windows-filled",
  color: "info",
  isOwner: false,
  isRegistered: true,
};
