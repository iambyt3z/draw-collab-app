import { ToolValue } from "../../../types";

const getCursor = (
    selectedToolValue: ToolValue,
    isPanning: boolean,
    isDrawing: boolean
): string => {
    if (selectedToolValue === "hand" && isPanning) {
        return "grabbing";
    }

    else if (selectedToolValue === "hand" && !isPanning) {
        return "grab";
    } 

    else if (
        selectedToolValue === "arrow" ||
        selectedToolValue === "circle" ||
        selectedToolValue === "line" ||
        selectedToolValue === "rectangle"
    ) {
        return "crosshair";
    }

    return "default";
}

export default getCursor;
