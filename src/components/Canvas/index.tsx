import { 
    setCurrentShape, 
    setIsDrawing, 
    setIsPanning, 
    setIsPointingLaser,
    setKonvasPostion, 
    setLaserPoints, 
    setShapes,  
    setZoom 
} from "../../state/app/reducer";

import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Line, Stage } from "react-konva"
import { ShapeProps } from "../../types";
import { useAppSelector } from "../../state/store";
import { useDispatch } from "react-redux";
import DrawnShape from "./components/DrawnShape";
import { Stage as KonvaStage } from 'konva/lib/Stage';
import { useEffect, useRef } from "react";
import getCursor from "./utils/getCurson";

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
    } = useAppSelector((state) => state.app);

    const dispatch = useDispatch();
    const stageRef = useRef<KonvaStage | null>(null);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        let { clientX, clientY } = event.evt;
        clientX = (clientX - konvasStagePosX) / (zoom / 100);
        clientY = (clientY - konvasStagePosY) / (zoom / 100);

        if (
            selectedToolValue === "hand" ||
            event.evt.button === 1
        ) {
            lastMousePos.current = { x: event.evt.clientX, y: event.evt.clientY };
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
            dispatch(setIsDrawing(true));

            const newShape: ShapeProps = {
                "id": `${selectedToolValue}-${shapes.length + 1}`,
                "type": selectedToolValue,
                "centerX": clientX,
                "centerY": clientY,
                "startX": clientX,
                "startY": clientY,
                "width": 0,
                "height": 0,
                "radius": 0,
                "points": [clientX, clientY],
                "fill": "rgba(0, 0, 0, 0)",
                "stroke": 'black',
                "strokeWidth": 2,
                "text": "",
            };

            dispatch(setCurrentShape(newShape));
        }
    }

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        let { clientX, clientY } = event.evt;
        clientX = (clientX - konvasStagePosX) / (zoom / 100);
        clientY = (clientY - konvasStagePosY) / (zoom / 100);

        if (isPanning) {
            const dx = event.evt.clientX - lastMousePos.current.x;
            const dy = event.evt.clientY - lastMousePos.current.y;
            lastMousePos.current = { x: event.evt.clientX, y: event.evt.clientY };

            dispatch(setKonvasPostion({
                x: konvasStagePosX + dx,
                y: konvasStagePosY + dy,
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
                        centerX: (startX + clientX) / 2,
                        centerY: (startY + clientY) / 2,
                        points: [startX, startY, clientX, clientY],
                    }));

                    break;
                
                case "circle":
                    const radius = Math.sqrt(Math.pow(clientX - startX, 2) + Math.pow(clientY - startY, 2)) / 2;
                    dispatch(setCurrentShape({
                        ...currentShape,
                        centerX: (startX + clientX) / 2,
                        centerY: (startY + clientY) / 2,
                        radius,
                    }));

                    break;

                case "pen":
                    dispatch(setCurrentShape({
                        ...currentShape,
                        points: [...currentShape.points as number[], clientX, clientY]
                    }));

                    break;
                
                case "rectangle":
                    dispatch(setCurrentShape({
                        ...currentShape,
                        width: clientX - startX,
                        height: clientY - startY,
                    }));

                    break;

                default:
                    break;
            }
        }
    }
    
    const handleMouseUp = () => {
        if (isPanning) {
            dispatch(setIsPanning(false));
        }

        else if (isPointingLaser) {
            dispatch(setIsPointingLaser(false));
        }

        else if (isDrawing && currentShape) {
            dispatch(setShapes([...shapes, currentShape]));
            dispatch(setCurrentShape(null));
            dispatch(setIsDrawing(false));
        }
    }

    const handleWheel = (event: KonvaEventObject<WheelEvent>) => {
        event.evt.preventDefault();

        const stage = stageRef.current;
        if (!stage) return;

        if(event.evt.ctrlKey) {
            const oldScale = stage.scaleX();
            const scaleBy = 1.1;
            const newScale = event.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
            const clampedScale = Math.min(Math.max(newScale, 0.1), 5.0);

            const mousePointTo = {
                x: stage.getPointerPosition()!.x / oldScale - stage.x() / oldScale,
                y: stage.getPointerPosition()!.y / oldScale - stage.y() / oldScale,
            };

            const newPos = {
                x: -(mousePointTo.x - stage.getPointerPosition()!.x / clampedScale) * clampedScale,
                y: -(mousePointTo.y - stage.getPointerPosition()!.y / clampedScale) * clampedScale,
            };

            dispatch(setZoom(Math.round(clampedScale * 100)));
            dispatch(setKonvasPostion(newPos));
        }

        else if(event.evt.shiftKey) {
            const direction = event.evt.deltaY < 0 ? 1 : -1;

            const newPos = {
                x: stage.x() + direction * 50,
                y: stage.y(),
            };

            dispatch(setKonvasPostion(newPos));
        }

        else {
            const direction = event.evt.deltaY < 0 ? 1 : -1;

            const newPos = {
                x: stage.x(),
                y: stage.y() + direction * 50,
            };

            dispatch(setKonvasPostion(newPos));
        }
    }

    useEffect(() => {
        if (!isPointingLaser && laserPoints.length) {
            dispatch(setLaserPoints([]));
        }
    }, [isPointingLaser, laserPoints]);

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
                    shapes.map((shapeConfig) => {
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
                        isBeingDrawn={true}
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
}

export default Canvas;
