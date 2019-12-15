import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f5b62', // 基本の色よりも明るい色
      main: '#263238', // 基本の色
      dark: '#000a12', // 基本の色よりも暗い色
      contrastText: '#fafafa', // テキストの色
    },
    secondary: {
      light: '#5efc82',
      main: '#00c853',
      dark: '#009624',
      contrastText: '#fafafa',
    },
  }
});
