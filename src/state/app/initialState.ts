import { ShapeProps, ToolName, ToolValue } from "../../types";

interface InitialRootState {
    currentShape: ShapeProps | null;
    drawingId: string;
    erasedShapes: ShapeProps[];
    isDrawing: boolean;
    isPanning: boolean;
    isPointingLaser: boolean;
    konvasStagePosX: number;
    konvasStagePosY: number;
    laserPoints: number[];
    redoShapes: ShapeProps[];
    roomId: string;
    selectedToolName: ToolName;
    selectedToolValue: ToolValue;
    shapes: ShapeProps[];
    zoom: number;
}

const initialRootState: InitialRootState = {
    "currentShape": null,
    "drawingId": "",
    "erasedShapes": [],
    "isDrawing": false,
    "isPanning": false,
    "isPointingLaser": false,
    "konvasStagePosX": 0,
    "konvasStagePosY": 0,
    "laserPoints": [],
    "redoShapes": [],
    "roomId": "",
    "selectedToolName": "Rectangle",
    "selectedToolValue": "rectangle",
    "shapes": [],
    "zoom": 100,
};

export default initialRootState;
