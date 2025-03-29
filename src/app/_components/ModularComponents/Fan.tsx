import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addDroppedItem, addIcon, removeDroppedItem, removeIcon } from "~/app/slices/cartSlice";
import { RootState } from "~/app/store/store";
import CloseIcon from '@mui/icons-material/Close';

const Fan: React.FC<{ switchId: string, itemId: string }> = ({ switchId, itemId }) => {
    const dispatch = useDispatch();
    const closeIconColor = useSelector((state: RootState) => state.cartData.closeIconColor);
    // Default images if no image is set
    const defaultFanImage = useSelector((state: RootState) => state.cartData.defaultFanImage);
    const defaultRegulatorImage = useSelector((state: RootState) => state.cartData.defaultRegulatorImage);
    // Hold on to the fan and regulator image states, starting with undefined (for initial state)
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);
    const droppedItems = useSelector((state: RootState) => state.cartData.droppedItems);
    const divId1 = `${switchId}-${itemId}-div1`;
    const divId2 = `${switchId}-${itemId}-div2`;
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    // Set valid icon types that can be dropped
    const includedIconTypes = ['Fan', 'Light Dimmer'];

    // Helper function to check if the div already contains a dropped item
    const isDivOccupied = (divId: string) => {
        return droppedItems.some(item => item.divId === divId && item.switchId === switchId);
    };

    const getDivItem = (divId: string) => {
        return droppedItems.find(item => item.divId === divId && item.switchId === switchId) || null;
    };

    // Checking the New Image for Fan and Regulator if not Found setting default Image
    const filteredIcons1 = droppedItems.filter(item => item.divId === divId1 && item.switchId === switchId); // Filtering Items for New Fan Image
    const fanImage = filteredIcons1.length > 0 && filteredIcons1[0]?.src;

    const filteredIcons2 = droppedItems.filter(item => item.divId === divId2 && item.switchId === switchId); // Filtering Items for New Regulator Image
    const regulatorImage = filteredIcons2.length > 0 && filteredIcons2[0]?.src;

    // For Fan
    const [{ isOver: isOver1 }, dropRef1] = useDrop({
        accept: 'icon',
        drop: (item: { id: string; src: string, iconType: string, price: number }) => {
            if (includedIconTypes[0] !== item.iconType) {
                return; // Do not process if the icon type is not in the allowed list
            }

            //Removing Exiting Icon before Updating
            if (isDivOccupied(divId1)) {
                const occupiedItem = getDivItem(divId1);
                handleDeleteIconClick(occupiedItem, true);
            }

            // Create the dropped item
            const newItem = {
                iconId: item.id,
                divId: divId1,
                src: item.src,
                switchId,
                iconType: item.iconType,
                price: item.price
            };

            // Dispatch actions to update the Redux store
            dispatch(addDroppedItem(newItem));

            const dispatchData = {
                id: newItem.iconId,
                item: newItem.src,
                price: newItem.price,
                switchId: switchId,
            };
            dispatch(addIcon({
                optionType: newItem.iconType,
                option: dispatchData
            }));
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    // For Regulator
    const [{ isOver: isOver2 }, dropRef2] = useDrop({
        accept: 'icon',
        drop: (item: { id: string; src: string, iconType: string, price: number }) => {
            if (includedIconTypes[1] !== item.iconType) {
                return; // Do not process if the icon type is not in the allowed list
            }

            //Removing Exiting Icon before Updating
            if (isDivOccupied(divId2)) {
                const occupiedItem = getDivItem(divId2);
                handleDeleteIconClick(occupiedItem, false);
            }

            // Create the dropped item
            const newItem = {
                iconId: item.id,
                divId: divId2,
                src: item.src,
                switchId,
                iconType: item.iconType,
                price: item.price
            };

            // Dispatch actions to update the Redux store
            dispatch(addDroppedItem(newItem));

            const dispatchData = {
                id: newItem.iconId,
                item: newItem.src,
                price: newItem.price,
                switchId: switchId,
            };
            dispatch(addIcon({
                optionType: newItem.iconType,
                option: dispatchData
            }));
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });

    const handleDeleteIconClick = (item: any, isDiv1: boolean) => {
        // Dispatch the action to remove the dropped item
        dispatch(removeDroppedItem(item));

        // Now find the optionType and index based on the item
        const optionType = item.iconType; // Assuming iconType is the optionType
        const index = droppedItems.findIndex(droppedItem => droppedItem.iconId === item.iconId && droppedItem.divId === item.divId && droppedItem.switchId === item.switchId);

        if (index !== -1) {
            // Dispatch the removeIcon action
            dispatch(removeIcon({ optionType, index }));
        }
    }

    return (
        <>
            <div ref={dropRef1 as any} className={`${isOver1 ? 'opacity-50' : 'opacity-100'} relative m-2`}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setTimeout(() => setIsHovered1(false), 1000)}>
                {/* Render the fan image */}
                <Image
                    src={fanImage ? fanImage : defaultFanImage}  // Fallback to default if no image is set 
                    alt="Fan Image"
                    width={50}
                    height={50}
                />
                {isDivOccupied(divId1) && isHovered1 && currentStep.stepNo === 5 &&
                    droppedItems.filter(item => item.divId === divId1 && item.switchId === switchId).map((item) => (
                        <CloseIcon
                            key={`close-${item.iconId}`}
                            onClick={() => handleDeleteIconClick(item, true)}
                            className="absolute left-10 bottom-11 cursor-pointer"
                            style={{ zIndex: 1, color: `#${closeIconColor}` }}
                        />
                    ))
                }
            </div>

            <div ref={dropRef2 as any} className={`${isOver2 ? 'opacity-50' : 'opacity-100'} relative m-2`}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setTimeout(() => setIsHovered2(false), 1000)}>
                {/* Render the regulator image */}
                <Image
                    src={regulatorImage ? regulatorImage : defaultRegulatorImage}  // Fallback to default if no image is set 
                    alt="Regulator Image"
                    width={50}
                    height={50}
                />
                {isDivOccupied(divId2) && isHovered2 && currentStep.stepNo === 5 &&
                    droppedItems.filter(item => item.divId === divId2 && item.switchId === switchId).map((item) => (
                        <CloseIcon
                            key={`close-${item.iconId}`}
                            onClick={() => handleDeleteIconClick(item, false)}
                            className="absolute left-10 top-0 cursor-pointer"
                            style={{ zIndex: 1, color: `#${closeIconColor}` }}
                        />
                    ))
                }
            </div>
        </>
    );
};

export default Fan;
