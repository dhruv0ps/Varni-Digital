import React, { useState, useEffect } from 'react';
import Image from "next/image";
import TwoSwitch from "./TwoSwitch";
import { RootState } from "~/app/store/store";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addDroppedItem, addIcon, removeDroppedItem, removeIcon } from "~/app/slices/cartSlice";
import CloseIcon from '@mui/icons-material/Close';

const FourSwitch_TwoFan: React.FC<{ switchId: string, CloseIconComponent?: () => JSX.Element, }> = ({ switchId, CloseIconComponent }) => {

    const dispatch = useDispatch();
    const closeIconColor = useSelector((state: RootState) => state.cartData.closeIconColor);
    const defaultRegulatorImage = useSelector((state: RootState) => state.cartData.defaultRegulatorImage); // Default images if no image is set
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);
    const droppedItems = useSelector((state: RootState) => state.cartData.droppedItems);
    let regulatorId1 = `${switchId}-regulator1`;
    let regulatorId2 = `${switchId}-regulator2`;
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    // Set valid icon types that can be dropped
    const includedIconTypes = ['Light Dimmer'];

    // Helper function to check if the div already contains a dropped item
    const isDivOccupied = (divId: string) => {
        return droppedItems.some(item => item.divId === divId && item.switchId === switchId);
    };

    const getDivItem = (divId: string) => {
        return droppedItems.find(item => item.divId === divId && item.switchId === switchId) || null;
    };

    // Checking the New Image for Regulator1 if not Found setting default Image
    const filteredIcons1 = droppedItems.filter(item => item.divId === regulatorId1 && item.switchId === switchId); // Filtering Items for New Regulator Image
    const regulatorImage1 = filteredIcons1.length > 0 && filteredIcons1[0]?.src;

    // Checking the New Image for Regulator2 if not Found setting default Image
    const filteredIcons2 = droppedItems.filter(item => item.divId === regulatorId2 && item.switchId === switchId); // Filtering Items for New Regulator Image
    const regulatorImage2 = filteredIcons2.length > 0 && filteredIcons2[0]?.src;

    // For Regulator 1
    const [{ isOver: isOver1 }, dropRefRegulator1] = useDrop({
        accept: 'icon',
        drop: (item: { id: string; src: string, iconType: string, price: number }) => {
            if (includedIconTypes[0] !== item.iconType) {
                return; // Do not process if the icon type is not in the allowed list
            }

            //Removing Exiting Icon before Updating
            if (isDivOccupied(regulatorId1)) {
                const occupiedItem = getDivItem(regulatorId1);
                handleDeleteIconClick(occupiedItem, false);
            }

            // Create the dropped item
            const newItem = {
                iconId: item.id,
                divId: regulatorId1,
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

    // For Regulator 2
    const [{ isOver: isOver2 }, dropRefRegulator2] = useDrop({
        accept: 'icon',
        drop: (item: { id: string; src: string, iconType: string, price: number }) => {
            if (includedIconTypes[0] !== item.iconType) {
                return; // Do not process if the icon type is not in the allowed list
            }

            //Removing Exiting Icon before Updating
            if (isDivOccupied(regulatorId2)) {
                const occupiedItem = getDivItem(regulatorId2);
                handleDeleteIconClick(occupiedItem, false);
            }

            // Create the dropped item
            const newItem = {
                iconId: item.id,
                divId: regulatorId2,
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

    // Remove Regulator Icon and set it back to Default
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
        <div className="h-full flex items-center justify-around flex-row relative">

            {/* Regulator Image 1 */}
            <div ref={dropRefRegulator1 as any} className={`${isOver1 ? 'opacity-50' : 'opacity-100'} relative m-2`}
                onMouseEnter={() => setIsHovered1(true)}
                onMouseLeave={() => setIsHovered1(false)}>
                {/* Render the regulator image */}
                <Image
                    src={regulatorImage1 ? regulatorImage1 : defaultRegulatorImage}  // Fallback to default if no image is set 
                    alt="Regulator Image"
                    width={50}
                    height={50}
                />
                {isDivOccupied(regulatorId1) && isHovered1 && currentStep.stepNo === 5 &&
                    droppedItems.filter(item => item.divId === regulatorId1 && item.switchId === switchId).map((item) => (
                        <CloseIcon
                            key={`close-${item.iconId}`}
                            onClick={() => handleDeleteIconClick(item, true)}
                            className="absolute left-10 top-0 cursor-pointer"
                            style={{ zIndex: 1, color: `#${closeIconColor}` }}
                        />
                    ))
                }
            </div>

            <TwoSwitch switchId={switchId} itemId={'item-1'} withFan={true} />
            <TwoSwitch switchId={switchId} itemId={'item-2'} withFan={false} />
            <TwoSwitch switchId={switchId} itemId={'item-3'} withFan={true} />

            {/* Regulator Image 2 */}
            <div ref={dropRefRegulator2 as any} className={`${isOver2 ? 'opacity-50' : 'opacity-100'} relative m-2`}
                onMouseEnter={() => setIsHovered2(true)}
                onMouseLeave={() => setIsHovered2(false)}>
                {/* Render the regulator image */}
                <Image
                    src={regulatorImage2 ? regulatorImage2 : defaultRegulatorImage}  // Fallback to default if no image is set 
                    alt="Regulator Image"
                    width={50}
                    height={50}
                />
                {isDivOccupied(regulatorId2) && isHovered2 && currentStep.stepNo === 5 &&
                    droppedItems.filter(item => item.divId === regulatorId2 && item.switchId === switchId).map((item) => (
                        <CloseIcon
                            key={`close-${item.iconId}`}
                            onClick={() => handleDeleteIconClick(item, false)}
                            className="absolute left-10 top-0 cursor-pointer"
                            style={{ zIndex: 1, color: `#${closeIconColor}` }}
                        />
                    ))
                }
            </div>

            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div>
    )
}
export default FourSwitch_TwoFan; 