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

export interface Shape {
    type: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    radius?: number;
    points?: number[];
    fill: string;
    stroke: string;
    strokeWidth: number;
}