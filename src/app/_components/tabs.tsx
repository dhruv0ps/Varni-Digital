import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface DynamicTabsProps {
    optionTypes: string[];
    onOptionTypeChange: (optionType: string) => void;
}

export default function DynamicTabs({ optionTypes, onOptionTypeChange }: DynamicTabsProps) {
    const [value, setValue] = React.useState(0);

    // Reset the selected tab when optionTypes changes
    React.useEffect(() => {
        setValue(0); // Reset to the first tab (or any default index you want)
    }, [optionTypes]);  // Triggered whenever optionTypes changes

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

        // Ensure the selected optionType is not undefined
        const selectedOptionType = optionTypes[newValue];
        if (selectedOptionType) {
            onOptionTypeChange(selectedOptionType);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderColor: 'divider' }}>
                <Tabs
                    variant={'scrollable'}
                    value={value}
                    onChange={handleChange}
                    sx={{
                        '& .MuiTab-root': {
                            fontSize: {
                                xs: '0.6rem',  // Extra small devices
                                sm: '0.6rem',     // Small devices
                                md: '0.8rem',   // Medium devices
                                lg: '0.8rem',     // Large devices
                                xl: '1rem',   // Extra large devices
                            },
                        },
                    }}
                >
                    {optionTypes.map((optionType, index) => (
                        <Tab key={index} label={optionType} />
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
}
