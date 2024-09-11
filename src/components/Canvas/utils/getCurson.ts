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

    else if (selectedToolValue === "eraser") {
        return `url('https://icons.iconarchive.com/icons/bootstrap/bootstrap/24/Bootstrap-eraser-icon.png') 12 12, auto`;
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
};

export default getCursor;
