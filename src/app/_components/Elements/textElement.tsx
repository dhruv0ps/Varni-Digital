import React from 'react';

interface TextElementProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    type?: 'text' | 'password' | 'email' | 'number'; // Support for different input types
    placeholder?: string; // Optional placeholder text
    className?: string; // Additional class names for customization
    widthPercentage?: number; // width in Percentage
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
}

const TextElement: React.FC<TextElementProps> = ({
    label,
    value,
    onChange,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    type = 'text',
    placeholder = '', // Default empty string for placeholder
    className = '', // Custom class names
    widthPercentage = 100,
    rounded = 'md',
}) => {
    // Define different styles for the input based on the variant and size props
    const variantClasses = {
        primary: 'focus:border-blue-500', // Apply blue border on focus
        secondary: 'focus:border-blue-500', // You can adjust this later if needed
    };

    const sizeClasses = {
        small: 'py-1 px-2 text-sm',
        medium: 'py-2 px-4 text-base',
        large: 'py-3 px-6 text-lg',
    };

    // Rounded classes for border radius options
    const roundedClasses = {
        sm: 'rounded-sm', // Small rounded corners
        md: 'rounded-md', // Medium rounded corners (default)
        lg: 'rounded-lg', // Large rounded corners
        xl: 'rounded-xl',
        xxl: 'rounded-2xl',
    };

    const disabledClasses = 'bg-gray-300 text-gray-500 cursor-not-allowed';

    return (
        <div className={`${className}`}>
            {/* Label */}
            <label className="block text-sm font-semibold text-gray-500 mb-1">{label}</label>

            {/* Input field */}
            <input
                type={type}
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder={placeholder}
                className={`block w-full rounded-md shadow-md hover:border-gray-500 focus:outline-none
                     focus:border-blue-500 ${disabled ? disabledClasses : variantClasses[variant]}
                      ${sizeClasses[size]}  ${roundedClasses[rounded]} border-2
                      `}
                style={{ width: `${widthPercentage}%` }}
            />
        </div>
    );
};

export default TextElement;
