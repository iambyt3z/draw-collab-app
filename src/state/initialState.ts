import { ShapeProps, ToolName, ToolValue } from "../types";

interface InitialRootState {
    currentShape: ShapeProps | null;
    isDrawing: boolean;
    isPanning: boolean;
    konvasStagePosX: number;
    konvasStagePosY: number; 
    redoShapes: ShapeProps[];
    selectedToolName: ToolName;
    selectedToolValue: ToolValue;
    shapes: ShapeProps[];
    zoom: number;
}

const initialRootState: InitialRootState = {
    "currentShape": null,
    "isDrawing": false,
    "isPanning": false,
    "konvasStagePosX": 0,
    "konvasStagePosY": 0,
    "redoShapes": [],
    "selectedToolName": "Rectangle",
    "selectedToolValue": "rectangle",
    "shapes": [],
    "zoom": 100,
};

export default initialRootState;
