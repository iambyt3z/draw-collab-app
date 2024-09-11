import { useDispatch, useSelector } from "react-redux";

import collabRoomReducer from "./collabRoom/reducer";
import { configureStore } from "@reduxjs/toolkit";
import localReducer from "./local/reducer";

const store = configureStore({
    "reducer": {
        "collabRoom": collabRoomReducer,
        "local": localReducer,
    }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
