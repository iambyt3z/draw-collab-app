export type ToolValue = 
    "hand" 
    | "arrow" 
    | "circle"  
    | "eraser"
    | "line"
    | "pen"
    | "rectangle" 
    | "select" 
    | "text"

export type ToolName =
    "Hand" 
    | "Arrow" 
    | "Circle"
    | "Eraser"
    | "Line"
    | "Pen"
    | "Rectangle" 
    | "Select" 
    | "Text"

export interface ShapeProps {
    type: ToolValue;
    centerX: number;
    centerY: number;
    startX: number;
    startY: number;
    width?: number;
    height?: number;
    radius?: number;
    points?: number[];
    fill: string;
    stroke: string;
    strokeWidth: number;
}