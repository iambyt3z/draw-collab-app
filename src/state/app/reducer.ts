import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialRootState from "./initialState";
import { ShapeProps, ToolName, ToolValue } from "../../types";

const rootSlice = createSlice({
    "name": "root",
    "initialState": initialRootState,

    "reducers": {
        "setCurrentShape": (state, action: PayloadAction<ShapeProps | null>) => {
            state.currentShape = action.payload;
        },

        "setIsDrawing": (state, action: PayloadAction<boolean>) => {
            state.isDrawing = action.payload;
        },

        "setIsPanning": (state, action: PayloadAction<boolean>) => {
            state.isPanning = action.payload;
        },

        "setIsPointingLaser": (state, action: PayloadAction<boolean>) => {
            state.isPointingLaser = action.payload;
        },

        "setKonvasPostion": (state, action: PayloadAction<{ x: number; y: number }>) => {
            state.konvasStagePosX = action.payload.x;
            state.konvasStagePosY = action.payload.y;
        },

        "setLaserPoints": (state, action: PayloadAction<number[]>) => {
            state.laserPoints = action.payload;
        },

        "setRedoShapes": (state, action: PayloadAction<ShapeProps[]>) => {
            state.redoShapes = action.payload;
        },

        "setSelectedToolName": (state, action: PayloadAction<ToolName>) => {
            state.selectedToolName = action.payload;
        },

        "setSelectedToolValue": (state, action: PayloadAction<ToolValue>) => {
            state.selectedToolValue = action.payload;
        },

        "setShapes": (state, action: PayloadAction<ShapeProps[]>) => {
            state.shapes = action.payload;
        },

        "setZoom": (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
    }
});

export const {
    setCurrentShape,
    setIsDrawing,
    setIsPanning,
    setIsPointingLaser,
    setKonvasPostion,
    setLaserPoints,
    setRedoShapes,
    setSelectedToolName,
    setSelectedToolValue,
    setShapes,
    setZoom,
} = rootSlice.actions

export default rootSlice.reducer;
