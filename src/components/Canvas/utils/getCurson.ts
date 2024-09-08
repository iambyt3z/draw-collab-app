import { ToolValue } from "../../../types";

const getCursor = (
    selectedToolValue: ToolValue,
    isPanning: boolean,
    _isDrawing: boolean
): string => {
    if (isPanning) {
        return "grabbing";
    }

    else if (selectedToolValue === "hand" && !isPanning) {
        return "grab";
    } 

    else if (
        selectedToolValue === "arrow" ||
        selectedToolValue === "circle" ||
        selectedToolValue === "line" ||
        selectedToolValue === "rectangle" ||
        selectedToolValue === "pen"
    ) {
        return "crosshair";
    }

    return "default";
}

export default getCursor;
