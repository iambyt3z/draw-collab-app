import { ShapeProps, ToolName, ToolValue } from "../types";

interface InitialRootState {
    currentShape: ShapeProps | null;
    isDrawing: boolean;
    konvasStagePosX: number;
    konvasStagePosY: number; 
    selectedToolName: ToolName;
    selectedToolValue: ToolValue;
    shapes: ShapeProps[];
    zoom: number;
}

const initialRootState: InitialRootState = {
    "currentShape": null,
    "isDrawing": false,
    "konvasStagePosX": 0,
    "konvasStagePosY": 0,
    "selectedToolName": "Rectangle",
    "selectedToolValue": "rectangle",
    "shapes": [],
    "zoom": 100,
};

export default initialRootState;
