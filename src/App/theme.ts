import { createMuiTheme } from "@material-ui/core";
import { green, purple } from "@material-ui/core/colors";
import createPalette from "@material-ui/core/styles/createPalette";

const theme = createMuiTheme({
    palette: createPalette({
        primary: {
            main: green["700"],
        },
        secondary: {
            main: purple["600"],
        },
    }),
    props: {
        MuiButtonBase: {
            // disableRipple: true,
        },
    },
});

export default theme;
