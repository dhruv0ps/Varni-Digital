import React from 'react';

interface ButtonElementProps {
    label: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outlined' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    icon?: React.ReactNode;
}

const ButtonElement: React.FC<ButtonElementProps> = ({
    label,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    disabled = false,
    rounded = 'md',
    icon,
}) => {

    // Define different styles for the button based on the variant and size props
    const variantClasses = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white',
        secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
        outlined: 'border-2 border-gray-400 font-semibold',
        danger: 'bg-red-500 hover:bg-red-600 text-white ',
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
        <button
            onClick={!disabled ? onClick : undefined}
            disabled={disabled}
            type={type}
            className={`shadow-md focus:outline-none transition-transform duration-150 ease-in-out active:scale-95 hover:scale-105
                ${roundedClasses[rounded]}
                ${disabled ? disabledClasses : `focus:ring-blue-500 ${variantClasses[variant]}`} 
                ${sizeClasses[size]} 
                // Hover effect for size increase
                hover:scale-105`} // Increase size only on hover (cursor focus)
        >
            {/* Conditionally render the icon if provided */}
            {icon && <span className="mr-2">{icon}</span>} {/* Add margin-right for spacing */}
            {label}
        </button>
    );
};

export default ButtonElement;