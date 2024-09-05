import { Box, Button, IconButton } from "@mui/material";
import ToolSelector from "./components/ToolSelector";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";

const Header = () => {
    const [toolSelected, setToolSelected] = useState("hand");

    return (
        <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%"
            pt={3}
            px={3}
        >
            <IconButton sx={(theme) => ({
                "&:hover": {
                    "backgroundColor": theme.palette.primary.dark,
                },

                "& .MuiSvgIcon-root": {
                    "color": theme.palette.common.white,
                },

                "backgroundColor": theme.palette.primary.main,
                "borderRadius": '5px',
            })}>
                <MenuIcon />
            </IconButton>

            <ToolSelector
                value={toolSelected}
                onValueChange={setToolSelected}
            />

            <Button variant="contained">
                Share
            </Button>
        </Box>
    );
}

export default Header;
