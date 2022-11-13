import { withRouter } from "storybook-addon-react-router-v6";

export const decorators = [withRouter];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  reactRouter: {
    routePath: "/dashboard/app",
  },
};
