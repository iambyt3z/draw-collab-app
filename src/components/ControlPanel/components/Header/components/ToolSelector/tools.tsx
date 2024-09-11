import { ToolName, ToolValue } from "../../../../../../types";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import BackHandIcon from "@mui/icons-material/BackHand";
import BackHandOutlinedIcon from "@mui/icons-material/BackHandOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CreateIcon from "@mui/icons-material/Create";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import EraserIcon from "../../../../../../assets/EraserIcon";
import EraserIconOutlined from "../../../../../../assets/EraserIconOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import LaserIcon from "../../../../../../assets/LaserIcon";
import RectangleIcon from "@mui/icons-material/Rectangle";
import RectangleOutlinedIcon from "@mui/icons-material/RectangleOutlined";

interface Tool {
    name: ToolName;
    value: ToolValue;
    id: ToolValue;
    icon: React.ReactNode;
    selectedIcon: React.ReactNode;
    dividerAfter?: boolean;
}

const tools: Tool[] = [
    {
        "icon": <BackHandOutlinedIcon/>,
        "id": "hand",
        "name": "Hand",
        "selectedIcon": <BackHandIcon/>,
        "value": "hand",
    },
    // {
    //     "name": "Select",
    //     "value": "select",
    //     "id": "select",
    //     "icon": <HighlightAltIcon/>,
    //     "selectedIcon": <HighlightAltIcon/>,
    //     "dividerAfter": true,
    // },
    {
        "icon": <RectangleOutlinedIcon/>,
        "id": "rectangle",
        "name": "Rectangle",
        "selectedIcon": <RectangleIcon/>,
        "value": "rectangle",
    },
    {
        "icon": <CircleOutlinedIcon/>,
        "id": "circle",
        "name": "Circle",
        "selectedIcon": <CircleIcon/>,
        "value": "circle",
    },
    {
        "icon": <ArrowRightAltIcon/>,
        "id": "arrow",
        "name": "Arrow",
        "selectedIcon": <ArrowRightAltIcon/>,
        "value": "arrow",
    },
    {
        "dividerAfter": true,
        "icon": <HorizontalRuleIcon/>,
        "id": "line",
        "name": "Line",
        "selectedIcon": <HorizontalRuleIcon/>,
        "value": "line",
    },
    {
        "icon": <CreateOutlinedIcon/>,
        "id": "pen",
        "name": "Pen",
        "selectedIcon": <CreateIcon/>,
        "value": "pen",
    },
    // {
    //     "name": "Text",
    //     "value": "text",
    //     "id": "text",
    //     "icon": <TitleIcon/>,
    //     "selectedIcon": <TitleIcon/>,
    // },
    {
        "icon": <EraserIconOutlined/>,
        "id": "eraser",
        "name": "Eraser",
        "selectedIcon": <EraserIcon/>,
        "value": "eraser",
    },
    {
        "icon": <LaserIcon fill="#747474"/>,
        "id": "laser",
        "name": "Laser",
        "selectedIcon": <LaserIcon fill="#1e1e1e"/>,
        "value": "laser",
    },
];

export default tools;
