import { Box, Button, IconButton } from "@mui/material";
import ToolSelector from "./components/ToolSelector";
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
    return (
        <Box 
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            width="100%"
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
                "pointerEvents": "all",
            })}>
                <MenuIcon />
            </IconButton>

            <ToolSelector/>

            <Button 
                variant="contained"
                sx={{ "pointerEvents": "all" }}
            >
                Share
            </Button>
        </Box>
    );
}

export default Header;
