import type { Preview } from "@storybook/react";

import 'path/to/tailwind.generated.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-styling';
import theme from 'path/to/mui/theme';

withThemeFromJSXProvider({
  Provider: ThemeProvider,
  GlobalStyles: CssBaseline,
  themes: { light: theme },
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
