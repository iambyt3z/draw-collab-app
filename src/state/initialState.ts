import { ShapeProps, ToolName, ToolValue } from "../types";

interface InitialRootState {
    currentShape: ShapeProps | null;
    isDrawing: boolean;
    selectedToolName: ToolName;
    selectedToolValue: ToolValue;
    shapes: ShapeProps[];
    zoom: number;
}

const initialRootState: InitialRootState = {
    "currentShape": null,
    "isDrawing": false,
    "selectedToolName": "Rectangle",
    "selectedToolValue": "rectangle",
    "shapes": [],
    "zoom": 100,
};

export default initialRootState;
