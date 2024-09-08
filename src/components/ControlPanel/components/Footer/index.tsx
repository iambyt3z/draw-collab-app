import { Box, Chip, IconButton, Stack } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import { useAppSelector } from "../../../../state/store";
import { useDispatch } from "react-redux";
import { setErasedShapes, setRedoShapes, setShapes, setZoom } from "../../../../state/app/reducer";
import { useCallback, useEffect } from "react";

const Footer = () => {
    const {
        erasedShapes,
        redoShapes,
        shapes,
        zoom,
    } = useAppSelector((state) => state.app);

    const dispatch = useDispatch();

    const handleUndo = useCallback(() => {
        if (shapes.length === 0 && erasedShapes.length === 0) 
            return;

        else if (erasedShapes.length !== 0) {
            const newErasedShapes = [...erasedShapes];
            const lastErasedShape = newErasedShapes.pop();
            dispatch(setErasedShapes(newErasedShapes));

            if (lastErasedShape !== undefined)
                dispatch(setShapes([...shapes, lastErasedShape]));

            return ;
        }

        const newShapes = [...shapes];
        const lastShape = newShapes.pop();
        dispatch(setShapes(newShapes));

        if (lastShape !== undefined)
            dispatch(setRedoShapes([...redoShapes, lastShape]));
        
    }, [shapes, redoShapes]);

    const handleRedo = useCallback(() => {
        if (redoShapes.length === 0) 
            return;

        const newRedoShapes = [...redoShapes];
        const lastRedoShape = newRedoShapes.pop();
        dispatch(setRedoShapes(newRedoShapes));
        
        if (lastRedoShape !== undefined)
            dispatch(setShapes([...shapes, lastRedoShape]));
    }, [shapes, redoShapes]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                event.ctrlKey && 
                !event.shiftKey && 
                (event.key === 'z' || event.key === 'Z')
            ) {
                event.preventDefault();
                handleUndo();
            } 
            
            else if (
                event.ctrlKey && 
                event.shiftKey && 
                (event.key === 'z' || event.key === 'Z')
            ) {
                event.preventDefault();
                handleRedo();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleUndo, handleRedo]);

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

            <Stack
                direction="row" 
                spacing={1}
                ml={3}
                display="flex"
                alignItems="center"
                sx={{ "pointerEvents": "all" }}
            >
                <IconButton
                    disabled={(shapes.length === 0 && erasedShapes.length === 0)}
                    onClick={handleUndo}
                    sx={(theme) => ({
                        "&.Mui-disabled": { "backgroundColor": theme.palette.grey[100] },
                        "&:hover": { "backgroundColor": theme.palette.grey[400] },
                        "backgroundColor": theme.palette.grey[300],
                    })}
                >
                    <UndoIcon/>
                </IconButton>

                <IconButton
                    disabled={(redoShapes.length === 0)}
                    onClick={handleRedo}
                    sx={(theme) => ({
                        "&.Mui-disabled": { "backgroundColor": theme.palette.grey[100] },
                        "&:hover": { "backgroundColor": theme.palette.grey[400] },
                        "backgroundColor": theme.palette.grey[300]
                    })}
                >
                    <RedoIcon/>
                </IconButton>
            </Stack>
        </Box>
    );
}

export default Footer;
