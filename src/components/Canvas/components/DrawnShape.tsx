import { Arrow, Circle, Line, Rect } from "react-konva";
import { ShapeProps } from "../../../types";

interface DrawnShapeProps {
    config: ShapeProps;
    isBeingDrawn: boolean;
    shapeNumber: number;
}

const beingDrawnOpacity = 0.3;

const DrawnShape: React.FC<DrawnShapeProps> = ({ 
    config,
    isBeingDrawn,
    shapeNumber
}) => {
    switch(config.type) {
    case "arrow":
        return (
            <Arrow
                key={`arrow-${shapeNumber}`}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                points={config.points as number[]}
                fill={config.fill}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
            />
        );

    case "circle":
        return (
            <Circle
                key={`circle-${shapeNumber}`}
                x={config.centerX}
                y={config.centerY}
                radius={config.radius}
                fill={config.fill}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
            />
        );

    case "line":
        return (
            <Line
                key={`line-${shapeNumber}`}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                points={config.points as number[]}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
            />
        );

    case "rectangle":
        return (
            <Rect
                key={`rect-${shapeNumber}`}
                x={config.startX}
                y={config.startY}
                width={config.width}
                height={config.height}
                fill={config.fill}
                opacity={(isBeingDrawn) ? beingDrawnOpacity : 1}
                stroke={config.stroke}
                strokeWidth={config.strokeWidth}
            />
        );
    }
};

export default DrawnShape;
