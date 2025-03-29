import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';

interface AutoCompleteElementProps {
    options: Array<{ title: string }>;  // Optional For Now
    label: string;
    placeholder?: string;
    widthPercentage?: number;
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    onChange: (value: { title: string } | null) => void;
    value?: { title: string } | null; 
}

export const AutoCompleteElement: React.FC<AutoCompleteElementProps> = ({
    options,
    label, placeholder,
    widthPercentage = 100,
    rounded = 'md',
    onChange,
    value = null,
}) => {

    // Rounded classes for border radius options
    const roundedClasses = {
        none: '0px',
        sm: '0.125rem', // Small rounded corners
        md: '0.25rem', // Medium rounded corners (default)
        lg: '0.375rem', // Large rounded corners
        xl: '0.75rem',
        xxl: '1rem',
    };

    return (
        <Box>
            {/* Label */}
            <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>
            <Autocomplete
                disablePortal
                options={options}
                getOptionLabel={(option) => option.title}
                onChange={(event, newValue) => {
                    onChange(newValue);  // Send the selected value back to parent
                }}
                value={value}
                sx={{
                    width: `${widthPercentage}%`,
                    '& .MuiAutocomplete-inputRoot': {
                        padding: 0,
                    },
                    '& .MuiFormControl-root': {
                        borderRadius: `${roundedClasses[rounded]}`,
                    }
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        className={`shadow-md`}
                        variant='outlined'
                        placeholder={placeholder}
                        sx={{
                            fontSize: '1rem',
                            lineHeight: '1.7rem',
                            '& .MuiOutlinedInput-root': {
                                padding: '0px',
                                px: '1rem',
                                borderWidth: '2px', // Increased border width to 2px
                                borderRadius: `${roundedClasses[rounded]}`,
                                borderColor: '#e5e7eb', // Default border color
                                '&:hover': {
                                    borderColor: '#6B7280', // gray-500 on hover (hex code for gray-500)
                                },
                                '&.Mui-focused': {
                                    borderColor: '#3b82f6', // Blue-500 when focused
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    border: 'none', // Remove outline when focused
                                },
                            },
                            '& .MuiInputBase-root': {
                                outline: 'none', // Ensure no outline on focus
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
};

