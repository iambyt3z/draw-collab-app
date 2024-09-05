import {
    Divider, 
    ToggleButton, 
    ToggleButtonGroup, 
    Tooltip 
} from "@mui/material";

import tools from "./tools";

interface ToolSelectorProps {
    value: string;
    onValueChange: (newValue: string) => void; 
}

const ToolSelector: React.FC<ToolSelectorProps> = ({
    value,
    onValueChange,
}) => {
    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newValue: string | null,
    ) => {
        if (newValue !== null) {
            onValueChange(newValue);
        }
    };

    return (
        <ToggleButtonGroup
            exclusive
            value={value}
            onChange={handleChange}
            sx={{
                "boxShadow": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                "borderRadius": 2,
            }}
        >
            {
                tools.map((tool) => {
                    return (
                        <>
                            <Tooltip title={tool.name}>
                                <ToggleButton
                                    value={tool.value}
                                    id={tool.id}
                                    sx={{
                                        "border": 0
                                    }}
                                >
                                        {
                                            (tool.value === value)
                                                ? <>{tool.selectedIcon}</>
                                                : <>{tool.icon}</>
                                        }
                                    
                                </ToggleButton>
                            </Tooltip>

                            {
                                (tool.dividerAfter) &&
                                <Divider 
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                    sx={{ "marginX": "8px" }}
                                />
                            }
                        </>
                    );
                })
            }
        </ToggleButtonGroup>
    )
}

export default ToolSelector;
