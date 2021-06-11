import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import yellow from "@material-ui/core/colors/yellow";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: orange[500],
    },
    error: {
      main: yellow[500],
    },
  },
});
