import { Box, Grid2 } from "@mui/material";
import Footer from "./components/Footer";
import Header from "./components/Header";

const ControlPanel = () => {
    return (
        <Box
            position="absolute"
            height="100%"
            width="100%"
            zIndex={10}
            display="flex"
            p={3}
            sx={{ "pointerEvents": "none" }}
        >
            <Grid2 container width="100%">
                <Grid2 size={12}>
                    <Header/>
                </Grid2>

                <Grid2 size={12}>
                    <Footer/>
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default ControlPanel;
