import { createTheme } from "@mui/material";
import palette from "./palette";

const theme = createTheme({
    "palette": palette,

    "typography": {
        "fontFamily": "Inter Variable",
    }
});

export default theme;
