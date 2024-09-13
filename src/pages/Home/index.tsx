import { CollabRoomMetadata, ShapeProps } from "../../types";
import {
    child,
    get,
    ref
} from "firebase/database";
import {
    setCollabRoomId,
    setCollabRoomKey,
    setCollabRoomLink,
    setCollabRoomShapes
} from "../../state/collabRoom/reducer";
import { useNavigate, useParams } from "react-router-dom";

import Canvas from "../../components/Canvas";
import ControlPanel from "../../components/ControlPanel";
import decrypt from "../../utils/decrypt";
import firebase from "../../firebase";
import { useAppDispatch } from "../../state/store";
import { useEffect } from "react";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { collabRoomMetadataBase64 } = useParams();

    useEffect(() => {
        const dbRef = ref(firebase.db);

        if (collabRoomMetadataBase64 !== undefined) {
            let collabRoomMetada: CollabRoomMetadata  = {
                "collabRoomId": "",
                "collabRoomKey": "",
            };

            try {
                const collabRoomMetadataJsonString = atob(collabRoomMetadataBase64);
                const collabRoomMetadaJson = JSON.parse(collabRoomMetadataJsonString) as CollabRoomMetadata;

                collabRoomMetada = {
                    "collabRoomId": collabRoomMetadaJson.collabRoomId,
                    "collabRoomKey": collabRoomMetadaJson.collabRoomKey,
                };
            } catch (error) {
                window.alert("There seems to be some problem with your link. Please verify your link.");
                navigate("/");
            }

            const {
                collabRoomId,
                collabRoomKey,
            } = collabRoomMetada;

            if (
                collabRoomId === "" ||
                collabRoomId === undefined ||
                collabRoomKey === "" ||
                collabRoomKey === undefined
            ) {
                window.alert("There seems to be some problem with your link. Please verify your link.");
                navigate("/");
            }

            get(child(dbRef, `rooms/${collabRoomId}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        const snapshotVal = snapshot.val();

                        decrypt(snapshotVal, collabRoomKey)
                            .then((collabRoomData) => {
                                const collabRoomShapes = collabRoomData.shapes as ShapeProps[];

                                dispatch(setCollabRoomShapes(collabRoomShapes));
                                dispatch(setCollabRoomId(collabRoomId));
                                dispatch(setCollabRoomKey(collabRoomKey));
                                dispatch(setCollabRoomLink(window.location.href));
                            });
                    } else {
                        window.alert("Room does not exist. Redirecting to the home page.");
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    window.alert("An error occurred. Redirecting to the home page.");
                    navigate("/");
                });
        }
    }, []);

    return (
        <>
            <ControlPanel/>
            <Canvas/>
        </>
    );
};

export default Home;
