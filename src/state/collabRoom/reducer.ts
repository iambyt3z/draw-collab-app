import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ShapeProps } from "../../types";
import initialCollabRoomState from "./initialState";

const collabRoomSlice = createSlice({
    "initialState": initialCollabRoomState,
    "name": "collabRoom",
    "reducers": {
        "setCollabRoomId": (state, action: PayloadAction<string>) => {
            state.collabRoomId = action.payload;
        },
        "setCollabRoomKey": (state, action: PayloadAction<string>) => {
            state.collabRoomKey = action.payload;
        },
        "setCollabRoomLaserPoints": (state, action: PayloadAction<number[]>) => {
            state.collabRoomLaserPoints = action.payload;
        },
        "setCollabRoomLink": (state, action: PayloadAction<string>) => {
            state.collabRoomLink = action.payload;
        },
        "setCollabRoomShapes": (state, action: PayloadAction<ShapeProps[]>) => {
            state.collabRoomShapes = action.payload;
        }
    }
});

export const {
    setCollabRoomId,
    setCollabRoomKey,
    setCollabRoomLaserPoints,
    setCollabRoomLink,
    setCollabRoomShapes,
} = collabRoomSlice.actions;

export default collabRoomSlice.reducer;
