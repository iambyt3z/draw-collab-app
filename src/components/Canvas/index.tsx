import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Stage } from "react-konva"
import { ShapeProps } from "../../types";
import { useAppSelector } from "../../state/store";
import { useDispatch } from "react-redux";
import { setCurrentShape, setIsDrawing, setKonvasPostion, setShapes, setZoom } from "../../state/reducer";
import DrawnShape from "./components/DrawnShape";
import { Stage as KonvaStage } from 'konva/lib/Stage';
import { useRef } from "react";

const Canvas = () => {
    const {
        currentShape,
        isDrawing,
        konvasStagePosX,
        konvasStagePosY,
        selectedToolValue,
        shapes,
        zoom,
    } = useAppSelector((state) => state);

    const dispatch = useDispatch();
    const stageRef = useRef<KonvaStage | null>(null);

    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        let { clientX, clientY } = event.evt;
        clientX = (clientX - konvasStagePosX) / (zoom / 100);
        clientY = (clientY - konvasStagePosY) / (zoom / 100);
        dispatch(setIsDrawing(true));

        const newShape: ShapeProps = {
            type: selectedToolValue,
            centerX: clientX,
            centerY: clientY,
            startX: clientX,
            startY: clientY,
            width: 0,
            height: 0,
            radius: 0,
            points: [],
            fill: 'rgba(0, 0, 0, 0)',
            stroke: 'black',
            strokeWidth: 2,
        };

        dispatch(setCurrentShape(newShape));
    }

    const handleMouseMove = (event: KonvaEventObject<MouseEvent>) => {
        if (!isDrawing || !currentShape) 
            return;

        let { clientX, clientY } = event.evt;
        const { startX, startY, type } = currentShape;
        clientX = (clientX - konvasStagePosX) / (zoom / 100);
        clientY = (clientY - konvasStagePosY) / (zoom / 100);

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
    
    const handleMouseUp = () => {
        if (!isDrawing || !currentShape) 
            return;

        dispatch(setShapes([...shapes, currentShape]));
        dispatch(setCurrentShape(null));
        dispatch(setIsDrawing(true));
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
            const direction = event.evt.deltaY > 0 ? 1 : -1;

            const newPos = {
                x: stage.x() + direction * 50,
                y: stage.y(),
            };

            dispatch(setKonvasPostion(newPos));
        }

        else {
            const direction = event.evt.deltaY > 0 ? 1 : -1;

            const newPos = {
                x: stage.x(),
                y: stage.y() + direction * 50,
            };

            dispatch(setKonvasPostion(newPos));
        }
    }

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
                "position": "absolute",
                "zIndex": "5"
            }}
        >
            <Layer>
                {
                    shapes.map((shapeConfig, index) => {
                        return (
                            <DrawnShape
                                config={shapeConfig}
                                shapeNumber={index+1}
                                isBeingDrawn={false}
                            />
                        );
                    })
                }

                {
                    (currentShape !== null) &&
                    <DrawnShape
                        config={currentShape}
                        shapeNumber={0}
                        isBeingDrawn={true}
                    />
                }
            </Layer>
        </Stage>
    );
}

export default Canvas;
