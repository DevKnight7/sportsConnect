import { createTheme } from "@mui/material/styles";


declare module "@mui/material/styles" {
    interface Theme {
        colors: {
            defaultBg: string;
        }
        styles:any

    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        colors?: {
            defaultBg?: string;
        };
        styles:any
    }
}

const theme = createTheme({
    colors: {
        defaultBg: "#c01933",
    },
    styles: {
        noDecorationLink:{textDecoration: "none" , color:'inherit'},
    }
});

export default theme;
