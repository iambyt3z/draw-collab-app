export type ToolValue = 
    | "arrow" 
    | "circle"  
    | "eraser"
    | "hand"
    | "laser" 
    | "line"
    | "pen"
    | "rectangle" 
    | "select" 
    | "text"

export type ToolName =
    | "Arrow" 
    | "Circle"
    | "Eraser"
    | "Hand"
    | "Laser"
    | "Line"
    | "Pen"
    | "Rectangle" 
    | "Select" 
    | "Text"

export interface ShapeProps {
    id: string;
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
    text: string;
}