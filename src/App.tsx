import "@fontsource-variable/inter";

import { Route, Routes } from "react-router-dom";
import {
    child,
    get,
    ref
} from "firebase/database";

import Home from "./pages/Home";
import { ShapeProps } from "./types";
import decrypt from "./utils/decrypt";
import firebase from "./firebase";
import { setShapes } from "./state/local/reducer";
import { useAppDispatch } from "./state/store";
import { useEffect } from "react";

function App() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const dbRef = ref(firebase.db);
        get(child(dbRef, "rooms/enc1"))
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const snapshotVal = snapshot.val();
                    decrypt(snapshotVal, "Ws_lYyl9gJrN8hjSgxVk5w")
                        .then((dbData) => {
                            const shapes = dbData.shapes as ShapeProps[];
                            dispatch(setShapes(shapes));
                        });
                }
            });
    }, []);

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="collab-room/:collabRoomMetadataBase64" element={<Home/>}/>
            <Route path="drawing/:drawingId" element={<Home/>}/>
        </Routes>
    );
};

export default App;
