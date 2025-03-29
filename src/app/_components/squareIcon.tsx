import React, { useState, useEffect } from 'react';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const SquareIcon = () => {
    const [color, setColor] = useState<string>('');

    useEffect(() => {
        setColor(getRandomColor());
    }, []);

    return (
        <div
            style={{
                width: '16px', // Width of the square
                height: '30px', // Height of the square
                backgroundColor: color, // Background color is random
                display: 'flex', // Center content
                alignItems: 'center', // Center content vertically
                justifyContent: 'center', // Center content horizontally
                borderRadius: '4px', // Optional: slightly rounded corners
            }}
        />
    );
};

export default SquareIcon;
