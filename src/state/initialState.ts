import { ShapeProps, ToolName, ToolValue } from "../types";

interface InitialRootState {
    currentShape: ShapeProps | null;
    isDrawing: boolean;
    selectedToolName: ToolName;
    selectedToolValue: ToolValue;
    shapes: ShapeProps[];
}

const initialRootState: InitialRootState = {
    "currentShape": null,
    "isDrawing": false,
    "selectedToolName": "Rectangle",
    "selectedToolValue": "rectangle",
    "shapes": [],
};

export default initialRootState;
