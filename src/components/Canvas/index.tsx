import { KonvaEventObject } from "konva/lib/Node";
import { Layer, Stage } from "react-konva"
import { ShapeProps } from "../../types";
import { useAppSelector } from "../../state/store";
import { useDispatch } from "react-redux";
import { setCurrentShape, setIsDrawing, setShapes } from "../../state/reducer";
import DrawnShape from "./components/DrawnShape";

const Canvas = () => {
    const {
        currentShape,
        isDrawing,
        selectedToolValue,
        shapes,
    } = useAppSelector((state) => state);

    const dispatch = useDispatch();

    const handleMouseDown = (event: KonvaEventObject<MouseEvent>) => {
        let { clientX, clientY } = event.evt;
        dispatch(setIsDrawing(true));

        const newShape: ShapeProps = {
            type: selectedToolValue,
            x: clientX,
            y: clientY,
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
        const { x, y, type } = currentShape;

        switch (type) {
            case "arrow":
            case "line":
                dispatch(setCurrentShape({
                    ...currentShape,
                    points: [x, y, clientX, clientY],
                }));

                break;
            
            case "circle":
                const radius = Math.sqrt(Math.pow(clientX - x, 2) + Math.pow(clientY - y, 2));
                dispatch(setCurrentShape({
                    ...currentShape,
                    radius,
                }));

                break;
            
            case "rectangle":
                dispatch(setCurrentShape({
                    ...currentShape,
                    width: clientX - x,
                    height: clientY - y,
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

    return (
        <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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
