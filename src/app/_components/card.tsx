import React from 'react';
import { isDarkColor } from "../utilities/colorUtil";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { nextStep, previousStep, setIsNextStepDisabled } from "../slices/selectionSlice";
import {
    addOrUpdateSize,
    addOrUpdatePanel,
    addOrUpdateMaterial,
    addAccessory,
    addAccessory1,
    addAccessory2,
    addOrUpdateColor,
    resetAccessory,
} from '../slices/cartSlice';
import { transformDataForCard } from '../utilities/convertDispatchData';
import {
    setTotalSize,
    addTotalOccupiedSize,
    addTotalOccupiedSize1,
    addTotalOccupiedSize2,
    resetTotalOccupiedSize,
    incrementAccessoryId
} from '../slices/extraSlice';
import { getSizeAsNum, getAccesorySize } from '../enums/enum';
import { showAlert } from "../slices/extraSlice";

interface CardElementProps {
    data: Record<string, string>; // Type for the data prop
    small?: boolean;
    onClick?: (value: any) => void;
    currentOptionType?: string
}

const CardElement: React.FC<CardElementProps> = ({ data, small = false, onClick, currentOptionType = '' }) => {

    const dispatch = useDispatch();
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);
    const cartData = useSelector((state: RootState) => state.cartData.cartData);
    const { totalSize, totalOccupiedSize, totalOccupiedSize1, totalOccupiedSize2 } = useSelector((state: RootState) => state.extraSlice.accessoryOccupancy);
    const { accessoryCurrentId } = useSelector((state: RootState) => state.extraSlice);

    // Safely extract the first key-value pair
    const entry = Object.entries(data).find(([key]) => key !== 'color');

    if (!entry) {
        return null; // Return null if no key-value pairs are found
    }

    const [label, value] = entry;
    const cardColor = data.color ?? '#FFFFFF'; // Default to white if no color is provided

    let valueColor = `text-black`;
    if (data.color) {
        valueColor = isDarkColor(data?.color) ? 'text-white' : 'text-black';
    }

    const smallText = `lg:text-lg sm:text-sm`;
    const largeText = `lg:text-3xl`;

    /* To Higlight Already Selected values in Cart  */
    const isSelected = () => {
        const isSizeSelected = cartData?.size?.id === data.id;
        const isPanelSelected = cartData?.panel?.id === data.id;
        const isMaterialSelected = cartData?.material?.id === data.id;

        const isAccessorySelected = cartData?.accessories?.some(accessory =>
            accessory.options.some(option => option.item === value)
        );

        const isIconSelected = cartData?.icons?.some(icon =>
            icon.options.some(option => option.id === data.id)
        );

        const isColorSelected = cartData?.color?.some(color =>
            color.options.find(option => option.id === data.id)
        );

        return (isSizeSelected ?? false) || (isPanelSelected ?? false) || (isMaterialSelected ?? false) || (isAccessorySelected ?? false) || (isIconSelected ?? false) || (isColorSelected ?? false);

    };

    const handleClick = () => {
        let dispatchData;
        try {
            if (currentStep.step !== 'Accessories') {
                dispatchData = transformDataForCard(data, undefined);
            }
            else {
                dispatchData = transformDataForCard(data, accessoryCurrentId.toString());
                dispatch(incrementAccessoryId());
            }
        } catch (error) {
            // Type assertion to treat error as an Error object
            if (error instanceof Error) {
                console.error(error.message); // Log the error message
            } else {
                console.error('An unknown error occurred'); // Fallback for non-Error objects
            }
            return; // Exit the function if transformation fails
        }

        switch (currentStep?.step) {
            case 'Panel':
                dispatch(addOrUpdatePanel(dispatchData));
                dispatch(setIsNextStepDisabled(false));
                // For Automatically Forwarding to Next Step
                //  dispatch(nextStep());
                break;

            case 'Material':
                dispatch(addOrUpdateMaterial(dispatchData));
                dispatch(setIsNextStepDisabled(false));
                // For Automatically Forwarding to Next Step
                // dispatch(nextStep());
                break;

            case 'Size':
                dispatch(addOrUpdateSize(dispatchData));
                dispatch(setIsNextStepDisabled(false));
                /* Setting Total Size in Extra Slice for Conditionally Checking the Accessory */
                const totalSize = getSizeAsNum(dispatchData.item);
                dispatch(setTotalSize(totalSize));
                // Resetting Total Occupied Size when Size is Changed
                dispatch(resetTotalOccupiedSize());
                // Resetting Accessory if Size is Reselected After Accesory
                // Removing All Accessory 
                dispatch(resetAccessory());
                // For Automatically Forwarding to Next Step
                // dispatch(nextStep());
                break;

            case 'Accessories':
                // Calling Function to Add Accessory based on Certain Condition
                addAccessoryFunc(dispatchData);
                break;

            case 'Color':
                dispatch(addOrUpdateColor({
                    optionType: currentOptionType,
                    option: dispatchData,
                }));
                break;

            default:
                break;
        }

    };

    /* Function for Handling Accesory Add Reducer */
    const addAccessoryFunc = (dispatchData: any) => {
        let newOccupiedSize = 0;
        const dataLabel = Object.keys(data)[0];
        const currentOccupiedSize = getAccesorySize(dataLabel || '') ?? 0;
        newOccupiedSize = totalOccupiedSize + currentOccupiedSize;
        if (totalSize === 12) {
            if (currentOccupiedSize > 6) {
                // if Current Accessory is  Bigger than 6 Module
                dispatch(showAlert({ message: `You cannot add accessories bigger than 6 Module`, duration: 3000 }));
            }
            else {
                // Logic for when totalSize is 12
                if (totalOccupiedSize < 12 && currentOccupiedSize + totalOccupiedSize1 <= 6) {
                    // Add to addAccessory1 until it's filled
                    dispatch(addAccessory1({
                        optionType: currentOptionType,
                        option: dispatchData,
                    }));
                    // Adding in Accessories as Well
                    dispatch(addAccessory({
                        optionType: currentOptionType,
                        option: dispatchData,
                    }));
                    dispatch(setIsNextStepDisabled(false));
                    dispatch(addTotalOccupiedSize(currentOccupiedSize));
                    dispatch(addTotalOccupiedSize1(currentOccupiedSize));
                } else if (totalOccupiedSize < 12 && currentOccupiedSize + totalOccupiedSize2 <= 6) {
                    // Add to addAccessory2 once addAccessory1 is full
                    dispatch(addAccessory2({
                        optionType: currentOptionType,
                        option: dispatchData,
                    }));
                    // Adding in Accessories as Well
                    dispatch(addAccessory({
                        optionType: currentOptionType,
                        option: dispatchData,
                    }));
                    dispatch(addTotalOccupiedSize(currentOccupiedSize));
                    dispatch(addTotalOccupiedSize2(currentOccupiedSize));
                } else {
                    // If both addAccessory1 and addAccessory2 are full, show alert
                    dispatch(showAlert({ message: `You cannot add more accessories.`, duration: 3000 }));
                }
            }
        } else if (totalSize !== undefined && newOccupiedSize <= totalSize) {
            // Logic for when totalSize is not 12, and we can add normally
            dispatch(addAccessory({
                optionType: currentOptionType,
                option: dispatchData,
            }));
            dispatch(setIsNextStepDisabled(false));
            dispatch(addTotalOccupiedSize(currentOccupiedSize));
        } else {
            // If totalOccupiedSize exceeds totalSize, show alert
            dispatch(showAlert({ message: `You cannot add more accessories.`, duration: 3000 }));
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`
                border rounded-lg shadow-md p-3 flex flex-wrap flex-col hover:border-blue-600 active:border-blue-600 cursor-pointer
                sm:min-w-[120px] ${small ? `sm:min-w-[200px] lg:min-w-[230px]` : `lg:min-w-[240px]`}
            transition-transform duration-150 ease-in-out active:scale-95 hover:scale-105
            ${isSelected() ? 'isSelected' : ''}
            `}
            style={{ backgroundColor: cardColor }}
        >
            {/* Render the label */}
            <p className={`text-gray-500 font-semibold lg:text-sm sm:text-xs`}>
                {label}
            </p>
            {/* Render the value */}
            <h2 className={`${valueColor} font-bold leading-8 sm:text-lg ${small ? smallText : largeText}`}>
                {value}
            </h2>
        </div>
    );
};

export default CardElement;
