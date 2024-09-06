import {
    ToggleButton, 
    ToggleButtonGroup, 
    Tooltip 
} from "@mui/material";

import tools from "./tools";
import { ToolValue } from "../../../../types";
import { useAppDispatch, useAppSelector } from "../../../../state/store";
import { setSelectedToolName, setSelectedToolValue } from "../../../../state/reducer";

const ToolSelector = () => {
    const selectedTool = useAppSelector((state) => state.selectedToolValue);
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
                "boxShadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                "borderRadius": 2,
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
    )
}

export default ToolSelector;
