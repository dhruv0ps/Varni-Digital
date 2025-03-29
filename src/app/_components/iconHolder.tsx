/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Image from 'next/image';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

interface IconHolderProps {
    data: Record<string, string>;    // A single object containing image data
    size?: number; // Optional size for the image (default: 30px)
    onClick?: (value: any) => void;
    currentOptionType: string | undefined;
}

const IconHolder: React.FC<IconHolderProps> = ({ data, size = 50, onClick, currentOptionType }) => {
    const cartData = useSelector((state: RootState) => state.cartData.cartData);

    // Safely extract the first key-value pair
    const entry = Object.entries(data).find(([key]) => key !== 'color');

    if (!entry) {
        return null; // Return null if no key-value pairs are found
    }

    const [id, imageSrc,] = entry; // Extract the id and image source

    // Function to check if an icon is selected
    const isSelected = (id: string) => {
        return cartData?.icons?.some(icon =>
            icon.options.some(option => option.id === data.id)
        );
    };

    // Set up drag behavior using useDrag
    const [{ isDragging }, dragRef, previewRef] = useDrag({
        type: 'icon',
        item: { id: data.id, src: imageSrc, iconType: currentOptionType, price: data.price }, // Drag item data
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    // Handle touch events for mobile drag functionality
    const handleTouchStart = (event: React.TouchEvent) => {
        event.preventDefault(); // Prevent default behavior
        dragRef(event.currentTarget); // Initiate drag
    };

    const handleClick = () => {
        if (onClick) {
            onClick(data);
        }
    };

    return (
        <div
            className={`bg-white rounded-md p-3 shadow-md flex items-center justify-center cursor-pointer
            border border-transparent hover:border-blue-600 active:border-blue-600 h-[60px] w-[60px]
            transition-colors duration-150 ease-in-out active:scale-95 hover:scale-105
            ${isSelected(id) ? 'isSelected' : ''} ${isDragging ? 'opacity-75' : ''}`}
            onTouchStart={handleTouchStart}
            onClick={handleClick}
            draggable={false}
        >
            {/* Drag Preview Image */}
            {/* <DragPreviewImage connect={previewRef} src={imageSrc || ''} /> */}

            <Image
                ref={dragRef as any} // Attach drag reference here
                src={imageSrc || ''}
                alt={`Icon ${id}`}
                width={size}
                height={size}
                draggable={false}
                style={{ touchAction: 'none', height: '100%', width: '100%' }} // Prevent default touch action
            />
        </div>
    );
};

export default IconHolder;
