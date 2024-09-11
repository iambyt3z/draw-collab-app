import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
    ShapeProps,
    ToolName,
    ToolValue
} from "../../types";

import initialLocalState from "./initialState";

const rootSlice = createSlice({
    "initialState": initialLocalState,
    "name": "root",
    "reducers": {
        "setCurrentShape": (state, action: PayloadAction<ShapeProps | null>) => {
            state.currentShape = action.payload;
        },
        "setDrawingId": (state, action: PayloadAction<string>) => {
            state.drawingId = action.payload;
        },
        "setErasedShapes": (state, action: PayloadAction<ShapeProps[]>) => {
            state.erasedShapes = action.payload;
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
        "setKonvasPostion": (state, action: PayloadAction<{
            x: number;
            y: number;
        }>) => {
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
        }
    }
});

export const {
    setCurrentShape,
    setDrawingId,
    setErasedShapes,
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
} = rootSlice.actions;

export default rootSlice.reducer;
