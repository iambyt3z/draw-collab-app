import { DbCollabRoomData, ShapeProps } from "../../types";
import {
    Layer,
    Line,
    Stage
} from "react-konva";
import {
    onValue,
    ref,
    update
} from "firebase/database";
import {
    setCurrentShape,
    setIsDrawing,
    setIsPanning,
    setIsPointingLaser,
    setKonvasPostion,
    setLaserPoints,
    setShapes,
    setZoom
} from "../../state/local/reducer";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { useEffect, useRef } from "react";

import DrawnShape from "./components/DrawnShape";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as KonvaStage } from "konva/lib/Stage";
import decrypt from "../../utils/decrypt";
import encrypt from "../../utils/encrypt";
import firebase from "../../firebase";
import getCursor from "./utils/getCurson";
import { setCollabRoomShapes } from "../../state/collabRoom/reducer";

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
    const stageRef = useRef<KonvaStage | null>(null);
    const lastMousePos = useRef({ "x": 0, "y": 0 });

    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        let { clientX, clientY } = event.evt;
        clientX = (clientX - konvasStagePosX) / (zoom / 100);
        clientY = (clientY - konvasStagePosY) / (zoom / 100);

        if (
            selectedToolValue === "hand" ||
            event.evt.button === 1
        ) {
            lastMousePos.current = { "x": event.evt.clientX, "y": event.evt.clientY };
            dispatch(setIsPanning(true));
        }

        if (selectedToolValue === "laser") {
            dispatch(setLaserPoints([clientX, clientY]));
            dispatch(setIsPointingLaser(true));
        }

        else if (
            selectedToolValue === "arrow" ||
            selectedToolValue === "circle" ||
            selectedToolValue === "line" ||
            selectedToolValue === "pen" ||
            selectedToolValue === "rectangle"
        ) {
            const neShapeId =
                (collabRoomId === "")
                    ? `shape-${shapes.length + 1}`
                    : `shape-${collabRoomShapes?.length + 1}`;

            const newShape: ShapeProps = {
                "centerX": clientX,
                "centerY": clientY,
                "fill": "rgba(0, 0, 0, 0)",
                "height": 0,
                "id": neShapeId,
                "points": [clientX, clientY],
                "radius": 0,
                "startX": clientX,
                "startY": clientY,
                "stroke": 'black',
                "strokeWidth": 2,
                "text": "",
                "type": selectedToolValue,
                "width": 0
            };

            dispatch(setIsDrawing(true));
            dispatch(setCurrentShape(newShape));
        }
    };

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        let { clientX, clientY } = event.evt;
        clientX = (clientX - konvasStagePosX) / (zoom / 100);
        clientY = (clientY - konvasStagePosY) / (zoom / 100);

        if (isPanning) {
            const dx = event.evt.clientX - lastMousePos.current.x;
            const dy = event.evt.clientY - lastMousePos.current.y;
            lastMousePos.current = { "x": event.evt.clientX, "y": event.evt.clientY };

            dispatch(setKonvasPostion({
                "x": konvasStagePosX + dx,
                "y": konvasStagePosY + dy,
            }));
        }

        else if (isPointingLaser) {
            const maxLaserLen = 50;
            let newLaserPoints = [...laserPoints, clientX, clientY];
            
            if (newLaserPoints.length > maxLaserLen * 2)
                newLaserPoints = newLaserPoints.slice(-maxLaserLen * 2);

            dispatch(setLaserPoints(newLaserPoints));
        }

        else if (isDrawing && currentShape) {
            const { startX, startY, type } = currentShape;

            switch (type) {
            case "arrow":
            case "line":
                dispatch(setCurrentShape({
                    ...currentShape,
                    "centerX": (startX + clientX) / 2,
                    "centerY": (startY + clientY) / 2,
                    "points": [startX, startY, clientX, clientY],
                }));

                break;
                
            case "circle":
                const radius = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2)) / 2;
                dispatch(setCurrentShape({
                    ...currentShape,
                    "centerX": (startX + clientX) / 2,
                    "centerY": (startY + clientY) / 2,
                    radius,
                }));

                break;

            case "pen":
                dispatch(setCurrentShape({
                    ...currentShape,
                    "points": [...currentShape.points as number[], clientX, clientY]
                }));

                break;
                
            case "rectangle":
                dispatch(setCurrentShape({
                    ...currentShape,
                    "height": clientY - startY,
                    "width": clientX - startX,
                }));

                break;

            default:
                break;
            }
        }
    };
    
    const handleMouseUp = () => {
        if (isPanning) {
            dispatch(setIsPanning(false));
        }

        else if (isPointingLaser) {
            dispatch(setIsPointingLaser(false));
        }

        else if (isDrawing && currentShape) {
            dispatch(setCurrentShape(null));
            dispatch(setIsDrawing(false));

            if (collabRoomId === "") {
                dispatch(setShapes([...shapes, currentShape]));
                return ;
            }

            const newCollabRoomShapes = [...collabRoomShapes, currentShape];
            const newCollabRoomData: DbCollabRoomData = {
                "shapes": newCollabRoomShapes
            };

            encrypt(newCollabRoomData, collabRoomKey)
                .then((encryptedData) => {
                    const updates: {[key: string]: string} = {};
                    updates[`/rooms/${collabRoomId}`] = encryptedData;
                    update(ref(firebase.db), updates);
                })
                .catch((error) => console.error(error));
        }
    };

    const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();

        const stage = stageRef.current;
        if (!stage) return;

        if (event.evt.ctrlKey) {
            const oldScale = stage.scaleX();
            const scaleBy = 1.1;
            const newScale = event.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
            const clampedScale = Math.min(Math.max(newScale, 0.1), 5.0);

            const mousePointTo = {
                "x": stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
                "y": stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
            };

            const newPos = {
                "x": -(mousePointTo.x - stage.getPointerPosition()!.x / clampedScale) * clampedScale,
                "y": -(mousePointTo.y - stage.getPointerPosition()!.y / clampedScale) * clampedScale,
            };

            dispatch(setZoom(Math.round(clampedScale * 100)));
            dispatch(setKonvasPostion(newPos));
        }

        else if (event.evt.shiftKey) {
            const direction = event.evt.deltaY < 0 ? 1 : -1;

            const newPos = {
                "x": stage.x() + direction * 50,
                "y": stage.y(),
            };

            dispatch(setKonvasPostion(newPos));
        }

        else {
            const direction = event.evt.deltaY < 0 ? 1 : -1;

            const newPos = {
                "x": stage.x(),
                "y": stage.y() + direction * 50,
            };

            dispatch(setKonvasPostion(newPos));
        }
    };

    useEffect(() => {
        if (!isPointingLaser && laserPoints.length) {
            dispatch(setLaserPoints([]));
        }
    }, [isPointingLaser, laserPoints]);

    useEffect(() => {
        const query = ref(firebase.db, `rooms/${collabRoomId}`);

        return onValue(query, (snapshot) => {
            if (snapshot.exists()) {
                const snapshotVal = snapshot.val();

                decrypt(snapshotVal, collabRoomKey)
                    .then((collabRoomData) => {
                        const collabRoomShapes = collabRoomData.shapes as ShapeProps[];
                        dispatch(setCollabRoomShapes(collabRoomShapes));
                    });
            }
        });
    }, []);

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
