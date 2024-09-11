import {
    Arrow,
    Circle,
    Line,
    Rect
} from "react-konva";
import { setErasedShapes, setShapes } from "../../../state/local/reducer";

import { KonvaEventObject } from "konva/lib/Node";
import { ShapeProps } from "../../../types";
import { useAppSelector } from "../../../state/store";
import { useDispatch } from "react-redux";

interface DrawnShapeProps {
    config: ShapeProps;
    isBeingDrawn: boolean;
}

const beingDrawnOpacity = 0.3;
const hitStrokeWidth = 20;

const DrawnShape: React.FC<DrawnShapeProps> = ({ 
    config,
    isBeingDrawn
}) => {
    const dispatch = useDispatch();

    const {
        erasedShapes,
        selectedToolValue, 
        shapes 
    } = useAppSelector((state) => state.local);

    const handleStrokeClick = (
        _event: KonvaEventObject<MouseEvent>, 
        shapeId: string
    ) => {
        if (selectedToolValue === "eraser") {
            const erasedShape = shapes.filter((shape) => shape.id === shapeId)[0];
            const newShapes = shapes.filter((shape) => shape.id !== shapeId);
            dispatch(setShapes(newShapes));
            dispatch(setErasedShapes([...erasedShapes, erasedShape]));
        }
    };

    switch (config.type) {
    case "arrow":
        return (
            <Arrow
                key={config.id}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                points={config.points as number[]}
                fill={config.fill}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
                onClick={(event) => handleStrokeClick(event, config.id)}
                hitStrokeWidth={hitStrokeWidth}
            />
        );

    case "circle":
        return (
            <Circle
                key={config.id}
                x={config.centerX}
                y={config.centerY}
                radius={config.radius}
                fill={config.fill}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
                onClick={(event) => handleStrokeClick(event, config.id)}
                hitStrokeWidth={hitStrokeWidth}
            />
        );

    case "line":
        return (
            <Line
                key={config.id}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                points={config.points as number[]}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
                onClick={(event) => handleStrokeClick(event, config.id)}
                hitStrokeWidth={hitStrokeWidth}
            />
        );

    case "pen":
        return (
            <Line
                key={config.id}
                opacity={1}
                points={config.points as number[]}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
                lineCap="round"
                lineJoin="round"
                tension={0.1}
                onClick={(event) => handleStrokeClick(event, config.id)}
                hitStrokeWidth={hitStrokeWidth}
            />
        );

    case "rectangle":
        return (
            <Rect
                key={config.id}
                x={config.startX}
                y={config.startY}
                width={config.width}
                height={config.height}
                fill={config.fill}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
                onClick={(event) => handleStrokeClick(event, config.id)}
                hitStrokeWidth={hitStrokeWidth}
            />
        );
    }
};

export default DrawnShape;
