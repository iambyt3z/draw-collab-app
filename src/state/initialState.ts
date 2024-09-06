import { Shape, ToolName, ToolValue } from "../types";

interface InitialRootState {
    currentShape: Shape | null;
    isDrawing: boolean;
    selectedToolName: ToolName;
    selectedToolValue: ToolValue;
    shapes: Shape[];
}

const initialRootState: InitialRootState = {
    "currentShape": null,
    "isDrawing": false,
    "selectedToolName": "Rectangle",
    "selectedToolValue": "rectangle",
    "shapes": [],
};

export default initialRootState;
