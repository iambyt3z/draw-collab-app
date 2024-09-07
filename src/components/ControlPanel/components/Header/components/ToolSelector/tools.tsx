import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import BackHandIcon from '@mui/icons-material/BackHand';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import CreateIcon from '@mui/icons-material/Create';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import HighlightAltIcon from '@mui/icons-material/HighlightAlt';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RectangleIcon from '@mui/icons-material/Rectangle';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import TitleIcon from '@mui/icons-material/Title';
import { ToolName, ToolValue } from '../../../../../../types';


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
        "name": "Hand",
        "value": "hand",
        "id": "hand",
        "icon": <BackHandOutlinedIcon/>,
        "selectedIcon": <BackHandIcon/>,
    },
    {
        "name": "Select",
        "value": "select",
        "id": "select",
        "icon": <HighlightAltIcon/>,
        "selectedIcon": <HighlightAltIcon/>,
        "dividerAfter": true,
    },
    {
        "name": "Rectangle",
        "value": "rectangle",
        "id": "rectangle",
        "icon": <RectangleOutlinedIcon/>,
        "selectedIcon": <RectangleIcon/>,
    },
    {
        "name": "Circle",
        "value": "circle",
        "id": "circle",
        "icon": <CircleOutlinedIcon/>,
        "selectedIcon": <CircleIcon/>,
    },
    {
        "name": "Arrow",
        "value": "arrow",
        "id": "arrow",
        "icon": <ArrowRightAltIcon/>,
        "selectedIcon": <ArrowRightAltIcon/>,
    },
    {
        "name": "Line",
        "value": "line",
        "id": "line",
        "icon": <HorizontalRuleIcon/>,
        "selectedIcon": <HorizontalRuleIcon/>,
        "dividerAfter": true,
    },
    {
        "name": "Pen",
        "value": "pen",
        "id": "pen",
        "icon": <CreateOutlinedIcon/>,
        "selectedIcon": <CreateIcon/>,
    },
    {
        "name": "Text",
        "value": "text",
        "id": "text",
        "icon": <TitleIcon/>,
        "selectedIcon": <TitleIcon/>,
    },
    {
        "name": "Eraser",
        "value": "eraser",
        "id": "eraser",
        "icon": <ClearIcon/>,
        "selectedIcon": <ClearIcon/>,
    },
    {
        "name": "Laser",
        "value": "laser",
        "id": "laser",
        "icon": <>L</>,
        "selectedIcon": <>L</>,
    },
];

export default tools;
