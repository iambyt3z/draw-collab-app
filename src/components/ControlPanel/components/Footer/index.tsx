import { Box, Chip, IconButton, Stack } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAppSelector } from "../../../../state/store";
import { useDispatch } from "react-redux";
import { setZoom } from "../../../../state/reducer";

const Footer = () => {
    const zoom = useAppSelector((state) => state.zoom);
    const dispatch = useDispatch();

    const handleZoomIncrease = () => {
        if(zoom === 500)
            return ;

        dispatch(setZoom(zoom + 10));
    }

    const handleZoomDecrease = () => {
        if(zoom === 10)
            return ;

        dispatch(setZoom(zoom - 10));
    }

    return (
        <Box
            height="100%"
            display="flex" 
            alignItems="flex-end"
        >
            <Stack 
                direction="row" 
                spacing={1}
                display="flex"
                alignItems="center"
                sx={{ "pointerEvents": "all" }}
            >
                <IconButton
                    onClick={handleZoomDecrease}
                    sx={(theme) => ({
                        "&:hover": { "backgroundColor": theme.palette.grey[400] },
                        "backgroundColor": theme.palette.grey[300]
                    })}
                >
                    <RemoveIcon/>
                </IconButton>

                <Chip
                    label={`${zoom}%`}
                    sx={(theme) => ({
                        "backgroundColor": theme.palette.grey[300],
                        "padding": "18px"
                    })}
                />

                <IconButton
                    onClick={handleZoomIncrease}
                    sx={(theme) => ({
                        "&:hover": { "backgroundColor": theme.palette.grey[400] },
                        "backgroundColor": theme.palette.grey[300]
                    })}
                >
                    <AddIcon/>
                </IconButton>
            </Stack>
        </Box>
    );
}

export default Footer;
