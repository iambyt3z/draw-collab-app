import {
    Box,
    Button,
    IconButton,
    Typography
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ShareModel from "./components/ShareModal";
import ToolSelector from "./components/ToolSelector";
import { useState } from "react";

const Header = () => {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <Box 
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                width="100%"
            >
                <IconButton disabled sx={(theme) => ({
                    "& .MuiSvgIcon-root": {
                        "color": theme.palette.common.white
                    },
                    "&:hover": {
                        "backgroundColor": theme.palette.primary.dark
                    },
                    "backgroundColor": theme.palette.primary.main,
                    "borderRadius": '5px',
                    "pointerEvents": "all"
                })}>
                    <MenuIcon />
                </IconButton>

                <ToolSelector/>

                <Button 
                    variant="contained"
                    onClick={() => setOpenModal(true)}
                    sx={{ "pointerEvents": "all" }}
                >
                    <Typography textTransform="capitalize">
                        Share
                    </Typography>
                </Button>
            </Box>

            <ShareModel
                open={openModal}
                onClose={setOpenModal}
            />
        </>
    );
};

export default Header;
