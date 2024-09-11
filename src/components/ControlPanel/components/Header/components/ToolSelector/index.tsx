import {
    ToggleButton,
    ToggleButtonGroup,
    Tooltip
} from "@mui/material";
import { setSelectedToolName, setSelectedToolValue } from "../../../../../../state/local/reducer";
import { useAppDispatch, useAppSelector } from "../../../../../../state/store";

import { ToolValue } from "../../../../../../types";
import tools from "./tools";

const ToolSelector = () => {
    const selectedTool = useAppSelector((state) => state.local.selectedToolValue);
    const dispatch = useAppDispatch();

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newValue: ToolValue | null,
    ) => {
        if (newValue !== null) {
            const newToolName = tools.filter((tool) => (tool.value === newValue))[0].name;

            dispatch(setSelectedToolValue(newValue));
            dispatch(setSelectedToolName(newToolName));
        }
    };

    return (
        <ToggleButtonGroup
            exclusive
            value={selectedTool}
            onChange={handleChange}
            sx={{
                "borderRadius": 2,
                "boxShadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                "pointerEvents": "all",
            }}
        >
            {
                tools.map((tool) => {
                    return (
                        <Tooltip title={tool.name} key={tool.id}>
                            <ToggleButton
                                value={tool.value}
                                sx={{ "border": 0 }}
                            >
                                {
                                    (tool.value === selectedTool)
                                        ? <>{tool.selectedIcon}</>
                                        : <>{tool.icon}</>
                                }
                                
                            </ToggleButton>
                        </Tooltip>
                    );
                })
            }
        </ToggleButtonGroup>
    );
};

export default ToolSelector;
