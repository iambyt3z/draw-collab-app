import {
    Layer,
    Line,
    Stage
} from "react-konva";
import { onValue, ref } from "firebase/database";
import { useAppDispatch, useAppSelector } from "../../state/store";

import DrawnShape from "./components/DrawnShape";
import { ShapeProps } from "../../types";
import decrypt from "../../utils/decrypt";
import firebase from "../../firebase";
import getCursor from "./utils/getCurson";
import { setCollabRoomShapes } from "../../state/collabRoom/reducer";
import { setLaserPoints } from "../../state/local/reducer";
import useCustomCanvasHandlers from "../../hooks/useCustomCanvasHandlers";
import { useEffect } from "react";

const Canvas = () => {
    const {
        currentShape,
        isDrawing,
        isPanning,
        isPointingLaser,
        konvasStagePosX,
        konvasStagePosY,
        laserPoints,
        selectedToolValue,
        shapes,
        zoom,
    } = useAppSelector((state) => state.local);

    const {
        collabRoomId,
        collabRoomKey,
        collabRoomShapes,
    } = useAppSelector((state) => state.collabRoom);

    const dispatch = useAppDispatch();

    const { 
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleWheel,
        stageRef,
    } = useCustomCanvasHandlers();

    useEffect(() => {
        if (!isPointingLaser && laserPoints.length) {
            dispatch(setLaserPoints([]));
        }
    }, [isPointingLaser, laserPoints]);

    useEffect(() => {
        if (collabRoomId !== "") {
            const query = ref(firebase.db, `rooms/${collabRoomId}`);

            return onValue(query, (snapshot) => {
                if (snapshot.exists()) {
                    let snapshotVal = snapshot.val();

                    decrypt(snapshotVal, collabRoomKey)
                        .then((collabRoomData) => {
                            const collabRoomShapes = collabRoomData.shapes as ShapeProps[];
                            dispatch(setCollabRoomShapes(collabRoomShapes));
                        });
                }
            });
        }
    }, [collabRoomId]);

    return (
        <Stage
            ref={stageRef}
            width={window.innerWidth}
            height={window.innerHeight}
            scaleX={zoom / 100}
            scaleY={zoom / 100}
            x={konvasStagePosX}
            y={konvasStagePosY}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            style={{
                "cursor": getCursor(selectedToolValue, isPanning, isDrawing),
                "position": "absolute",
                "zIndex": "5"
            }}
        >
            <Layer>
                {
                    ((collabRoomId !== "")
                        ? collabRoomShapes
                        : shapes
                    ).map((shapeConfig) => {
                        return (
                            <DrawnShape
                                key={shapeConfig.id}
                                config={shapeConfig}
                                isBeingDrawn={false}
                            />
                        );
                    })
                }

                {
                    (currentShape !== null) &&
                    <DrawnShape
                        config={currentShape}
                        isBeingDrawn
                    />
                }

                <Line
                    points={laserPoints}
                    stroke="red"
                    strokeWidth={5}
                    lineCap="round"
                    lineJoin="round"
                    perfectDrawEnabled
                    tension={0.2}
                />
            </Layer>
        </Stage>
    );
};

export default Canvas;
