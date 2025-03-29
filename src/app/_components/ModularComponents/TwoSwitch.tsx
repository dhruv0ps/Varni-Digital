import React, { useEffect, useState } from 'react';
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addDroppedItem, removeDroppedItem, addIcon, removeIcon } from "~/app/slices/cartSlice";
import Image from "next/image";
import { RootState } from "~/app/store/store";
import CloseIcon from '@mui/icons-material/Close';

interface TwoSwitchProps {
    switchId: string;
    withFan?: boolean;
    itemId?: string //For Multiple Two Switches
    CloseIconComponent?: () => JSX.Element;
}

const TwoSwitch: React.FC<TwoSwitchProps> = ({ switchId, itemId, withFan = false, CloseIconComponent }) => {
    const dispatch = useDispatch();
    const closeIconColor = useSelector((state: RootState) => state.cartData.closeIconColor);
    const defaultFanImage = useSelector((state: RootState) => state.cartData.defaultFanImage); // Default images if no image is set
    const divId1 = `${switchId}-${itemId || 'item-1'}-${'div1'}`;
    const divId2 = `${switchId}-${itemId || 'item-1'}-${'div2'}`;
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const droppedItems = useSelector((state: RootState) => state.cartData.droppedItems);
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);
    const selectedPanel = useSelector((state: RootState) => state.cartData.cartData?.panel?.item);
    const isRounded = selectedPanel !== 'Color'; // if Selected Panel is Color then Two Switch will not Rounded Full 
    // Icons Which are Not Allowed to Entered in Switches
    const excludedIconTypes = ['Fan', 'Light Dimmer'];

    // Helper function to check if the div already contains a dropped item
    const isDivOccupied = (divId: string) => {
        return droppedItems.some(item => item.divId === divId && item.switchId === switchId);
    };

    const getDivItem = (divId: string) => {
        return droppedItems.find(item => item.divId === divId && item.switchId === switchId) || null;
    };

    // Checking the New Image for Fan and Regulator if not Found setting default Image
    const filteredIcons1 = droppedItems.filter(item => item.divId === divId2 && item.switchId === switchId); // Filtering Items for New Fan Image
    const fanImage = filteredIcons1.length > 0 && filteredIcons1[0]?.src;

    const [{ isOver: isOver1 }, dropRef1] = useDrop({
        accept: 'icon',
        drop: (item: { id: string; src: string, iconType: string, price: number }) => {
            if (isDivOccupied(divId1)) {
                // If the div is already occupied, don't drop the icon
                return;
            }

            if (excludedIconTypes.includes(item.iconType)) {
                return; // Don't dispatch if the icon type is excluded
            }

            const newItem = { iconId: item.id, divId: divId1, src: item.src, switchId, iconType: item.iconType, price: item.price };
            // Adding Data in DroppedItems List in Slice
            dispatch(addDroppedItem(newItem));
            // Adding Data in AddIcon for Cart in Slice
            const dispatchData = {
                id: newItem.iconId,
                item: newItem.src,
                price: newItem.price,
                switchId: switchId,
            };
            dispatch(addIcon({
                optionType: newItem.iconType,
                option: dispatchData,
            }));
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    const [{ isOver: isOver2 }, dropRef2] = useDrop({
        accept: 'icon',
        drop: (item: { id: string; src: string, iconType: string, price: number }) => {
            if (isDivOccupied(divId2)) {
                // If the div is already occupied, don't drop the icon
                return;
            }

            if (excludedIconTypes.includes(item.iconType)) {
                return; // Don't dispatch if the icon type is excluded
            }

            const newItem = { iconId: item.id, divId: divId2, src: item.src, switchId, iconType: item.iconType, price: item.price };
            // Adding Data in DroppedItems List in Slice
            dispatch(addDroppedItem(newItem));
            // Adding Data in AddIcon for Cart in Slice
            const dispatchData = {
                id: newItem.iconId,
                item: newItem.src,
                price: newItem.price,
                switchId: switchId,
            };
            dispatch(addIcon({
                optionType: newItem.iconType,
                option: dispatchData,
            }));
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    });

    // For Fan
    const [{ isOver: isOver3 }, dropRefFan] = useDrop({
        accept: 'icon',
        drop: (item: { id: string; src: string, iconType: string, price: number }) => {
            if (excludedIconTypes[0] !== item.iconType) {
                return; // Do not process if the icon type is not in the allowed list
            }

            //Removing Exiting Icon before Updating
            if (isDivOccupied(divId2)) {
                const occupiedItem = getDivItem(divId2);
                handleDeleteIconClick(occupiedItem);
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

    const handleDeleteIconClick = (item: any) => {
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
        <div className="min-w-[140px] h-full bg-inherit flex items-center justify-around flex-col relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setTimeout(() => setIsHovered(false), 1000)}>

            {/* First Div */}
            <div ref={dropRef1 as any} className={`${isOver1 ? 'opacity-50' : 'opacity-100'} relative`}>
                <div
                    className={`flex justify-center items-center ${isRounded && droppedItems.filter(item => item.divId === divId1 && item.switchId === switchId).length === 0 ? 'h-[40px] w-[40px]' : 'h-[50px] w-[50px]'}
    ${isRounded ? 'rounded-full' : 'rounded-lg'} 
    ${isDivOccupied(divId1) ? !isRounded ? 'border-2 border-[#00a0e1]' : 'border-none' : 'border-2 border-[#00a0e1]'}`}
                >
                    {droppedItems
                        .filter(item => item.divId === divId1 && item.switchId === switchId)
                        .map((item) => (
                            <Image
                                key={item.iconId}
                                src={item.src}
                                alt={`Dropped icon ${item.iconId}`}
                                width={40}
                                height={40}
                                style={{
                                    width: '90%',
                                    height: '90%',
                                }}
                            />
                        ))}
                </div>
                {isDivOccupied(divId1) && isHovered && currentStep.stepNo === 5 &&
                    droppedItems.filter(item => item.divId === divId1 && item.switchId === switchId).map((item) => (
                        <CloseIcon
                            key={`close-${item.iconId}`}
                            onClick={() => handleDeleteIconClick(item)}
                            className="absolute left-10 bottom-7 cursor-pointer"
                            style={{ zIndex: 1, color: `#${closeIconColor}` }}
                        />
                    ))
                }
            </div>

            {/* Second Div */}
            {!withFan ? (
                <div ref={dropRef2 as any} className={`${isOver2 ? 'opacity-50' : 'opacity-100'} relative`}
                    onMouseEnter={() => setIsHovered2(true)}
                    onMouseLeave={() => setTimeout(() => setIsHovered2(false), 1000)}>
                    <div
                        className={`flex justify-center items-center ${isRounded && droppedItems.filter(item => item.divId === divId2 && item.switchId === switchId).length === 0 ? 'h-[40px] w-[40px]' : 'h-[50px] w-[50px]'}
                ${isRounded ? 'rounded-full' : 'rounded-lg'} 
                ${isDivOccupied(divId2) ? !isRounded ? 'border-2 border-[#00a0e1]' : 'border-none' : 'border-2 border-[#00a0e1]'}`}
                    >
                        {droppedItems.filter(item => item.divId === divId2 && item.switchId === switchId).map((item) => (
                            <Image
                                key={item.iconId}
                                src={item.src}
                                alt={`Dropped icon ${item.iconId}`}
                                width={40}
                                height={40}
                                style={{
                                    width: '90%',
                                    height: '90%',
                                }}
                            />
                        ))}
                    </div>
                    {isDivOccupied(divId2) && isHovered2 && currentStep.stepNo === 5 &&
                        droppedItems.filter(item => item.divId === divId2 && item.switchId === switchId).map((item) => (
                            <CloseIcon
                                key={`close-${item.iconId}`}
                                onClick={() => handleDeleteIconClick(item)}
                                className="absolute left-10 bottom-7 cursor-pointer"
                                style={{ zIndex: 1, color: `#${closeIconColor}` }}
                            />
                        ))
                    }
                </div>
            ) : (
                /* Second Div For Single Fan */
                <div ref={dropRefFan as any} className={`${isOver3 ? 'opacity-50' : 'opacity-100'} relative m-2`}
                    onMouseEnter={() => setIsHovered3(true)}
                    onMouseLeave={() => setTimeout(() => setIsHovered3(false), 1000)}>
                    {/* Render the fan image */}
                    <Image
                        src={fanImage ? fanImage : defaultFanImage}  // Fallback to default if no image is set 
                        alt="Fan Image"
                        width={50}
                        height={50}
                    />
                    {isDivOccupied(divId2) && isHovered3 && currentStep.stepNo === 5 &&
                        droppedItems.filter(item => item.divId === divId2 && item.switchId === switchId).map((item) => (
                            <CloseIcon
                                key={`close-${item.iconId}`}
                                onClick={() => handleDeleteIconClick(item)}
                                className="absolute left-10 bottom-11 cursor-pointer"
                                style={{ zIndex: 1, color: `#${closeIconColor}` }}
                            />
                        ))
                    }
                </div>
            )
            }

            {/* Render the CloseIcon if provided */}
            {CloseIconComponent && currentStep.stepNo === 4 && <CloseIconComponent />}
        </div >
    );
};

export default TwoSwitch;
