// Utility function to check if the color is dark
export const isDarkColor = (hexColor: string): boolean => {
    // Remove hash symbol if present
    const color = hexColor.replace('#', '');

    // Convert to RGB
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Calculate luminance (YIQ algorithm)
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq < 128; // Return true if the color is dark
};
