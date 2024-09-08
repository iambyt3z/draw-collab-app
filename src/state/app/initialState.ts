import { ShapeProps, ToolName, ToolValue } from "../../types";

interface InitialRootState {
    currentShape: ShapeProps | null;
    erasedShapes: ShapeProps[];
    isDrawing: boolean;
    isPanning: boolean;
    isPointingLaser: boolean;
    konvasStagePosX: number;
    konvasStagePosY: number;
    laserPoints: number[];
    redoShapes: ShapeProps[];
    selectedToolName: ToolName;
    selectedToolValue: ToolValue;
    shapes: ShapeProps[];
    zoom: number;
}

const initialRootState: InitialRootState = {
    "currentShape": null,
    "erasedShapes": [],
    "isDrawing": false,
    "isPanning": false,
    "isPointingLaser": false,
    "konvasStagePosX": 0,
    "konvasStagePosY": 0,
    "laserPoints": [],
    "redoShapes": [],
    "selectedToolName": "Rectangle",
    "selectedToolValue": "rectangle",
    "shapes": [],
    "zoom": 100,
};

export default initialRootState;
