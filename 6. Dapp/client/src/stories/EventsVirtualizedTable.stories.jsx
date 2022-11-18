import React from "react";

import { EventsVirtualizedTable } from "../components/eventsTable";
import rows from "../_mock/sampleDataTable";
export default {
  title: "Form/EventsVirtualizedTable",
  component: EventsVirtualizedTable,
  actions: { argTypesRegex: "^on[A-Z].*" },
};
const Template = (args) => <EventsVirtualizedTable {...args} />;

export const table = Template.bind({});
table.args = {
  rows,
};
