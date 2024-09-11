import { CSSProperties, TypographyOptions } from "@mui/material/styles/createTypography";

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides {
        modelSectionContent: true;
        modelSectionHeading: true;
    }
}

interface ExtendedTypographyOptions extends TypographyOptions {
    modelSectionContent: CSSProperties;
    modelSectionHeading: CSSProperties;
}

export const typography = {
    "fontFamily": "Inter Variable",

    "modelSectionContent": {
        "fontSize": "15px",
        "fontStyle": "normal",
        "fontWeight": 400,
        "lineHeight": "25px",
        "textAlign": "center",
        "textTransform": "none",
    },

    "modelSectionHeading": {
        "fontSize": "25px",
        "fontStyle": "normal",
        "fontWeight": 700,
        "textAlign": "center",
    }
} as ExtendedTypographyOptions;
