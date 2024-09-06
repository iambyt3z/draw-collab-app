import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialRootState from "./initialState";
import { Shape, ToolName, ToolValue } from "../types";

const rootSlice = createSlice({
    "name": "root",
    "initialState": initialRootState,

    "reducers": {
        "setCurrentShape": (state, action: PayloadAction<Shape | null>) => {
            state.currentShape = action.payload;
        },

        "setIsDrawing": (state, action: PayloadAction<boolean>) => {
            state.isDrawing = action.payload;
        },

        "setSelectedToolName": (state, action: PayloadAction<ToolName>) => {
            state.selectedToolName = action.payload;
        },

        "setSelectedToolValue": (state, action: PayloadAction<ToolValue>) => {
            state.selectedToolValue = action.payload;
        },

        "setShapes": (state, action: PayloadAction<Shape[]>) => {
            state.shapes = action.payload;
        },
    }
});

export const {
    setCurrentShape,
    setIsDrawing,
    setSelectedToolName,
    setSelectedToolValue,
    setShapes,
} = rootSlice.actions

export default rootSlice.reducer;
