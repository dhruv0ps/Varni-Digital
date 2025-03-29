import React from 'react';
import { getHolderElement } from '~/app/enums/enum';
import SwitchImage from './SwitchImage';
import TwoSwitch from './TwoSwitch';
import FourSwitch from './FourSwitch';
import FourSwitch_OneFan from './FourSwitch_OneFan';
import EightSwitch from './EigthSwitch';
import FourSceneController from './FourSceneController';
import SixSwitch from './SixSwitch';
import SixSwitch_TwoFan from './SixSwitch_TwoFan';
import TenSwitch from './TenSwitch';
import SixSwitch_OneFan from './SixSwitch_OneFan';
import TwoDimmer_PhaseCut from './TwoDimmer_PhaseCut';
import FourSwitch_TwoFan from './FourSwitch_TwoFan';
import CloseIcon from '@mui/icons-material/Close';
import { RootState } from "~/app/store/store";
import { useDispatch, useSelector } from 'react-redux';
import { removeAccessory, removeIconFromDeletedAccessory } from '~/app/slices/cartSlice';
import { subtractTotalOccupiedSize, subtractTotalOccupiedSize1, subtractTotalOccupiedSize2 } from '~/app/slices/extraSlice';
import { getAccesorySize } from '~/app/enums/enum';
import { isStepValid } from '~/app/slices/selectionSlice';

interface HolderElementProps {
    modularNo: string, // Number of Modular Elements Going to be Rendered
    canvasNo: number, // Number of Canvas Going to be Rendered
    option: { id: string; item: string; price: number };
    optionType: string // Current selected Tab String
}

const componentMap = {
    TwoSwitch,
    FourSwitch,
    FourSwitch_OneFan,
    FourSceneController,
    EightSwitch,
    SixSwitch,
    SixSwitch_TwoFan,
    TenSwitch,
    SixSwitch_OneFan,
    FourSwitch_TwoFan,
    TwoDimmer_PhaseCut,
};

const ModularHolder: React.FC<HolderElementProps> = ({ modularNo, option, optionType, canvasNo }) => {
    const dispatch = useDispatch();
    const cartData = useSelector((state: RootState) => state.cartData.cartData);
    const closeIconColor = useSelector((state: RootState) => state.cartData.closeIconColor);
    const componentName = getHolderElement(option.item);
    // Check if componentName is an image path
    const isImage = componentName && componentName.includes('/');

    // If it's an image path, split it by ',' to get an array of paths
    const imageSources = isImage ? componentName.split(',') : [];

    const ComponentToRender = !isImage ? componentMap[componentName as keyof typeof componentMap] : null;

    const SwitchProps = {
        switchId: `${canvasNo}-${modularNo}`,
    };

    const handleDeleteIconClick = (item: any, switchId: string) => {
        dispatch(removeAccessory({
            optionType: optionType,
            id: item.id,
        }));
        const currentOccupiedSize = getAccesorySize(optionType) ?? 0;
        dispatch(subtractTotalOccupiedSize(currentOccupiedSize));
        // Removing Individual TotalOccupied Size for both the Canvas when Accessory is Deleted
        if (canvasNo === 1) {
            dispatch(subtractTotalOccupiedSize1(currentOccupiedSize));
        }
        else {
            dispatch(subtractTotalOccupiedSize2(currentOccupiedSize));
        }
        // Deleteing Icons in Modular(Accessory) if that Modular is Deleted
        dispatch(removeIconFromDeletedAccessory({ switchId: switchId }));
        // Checking Validation for Accessory
        dispatch(isStepValid({ cartData })); // Sending Current Step and Cart Data to Check Accessroy Exists
    }

    return (
        <>
            {ComponentToRender ? (
                <ComponentToRender
                    {...SwitchProps}
                    CloseIconComponent={() => (
                        <CloseIcon
                            key={SwitchProps.switchId}
                            onClick={() => handleDeleteIconClick(option, SwitchProps.switchId)}
                            className={`absolute cursor-pointer bottom-1 ${ComponentToRender === TwoSwitch ? 'left-2/3' : ''}`}
                            style={{ zIndex: 1, color: `#${closeIconColor}` }}
                        />
                    )}
                />
            ) : (
                isImage && <SwitchImage src={imageSources}
                    CloseIconComponent={() => (
                        <CloseIcon
                            key={SwitchProps.switchId}
                            onClick={() => handleDeleteIconClick(option, SwitchProps.switchId)}
                            className={`absolute cursor-pointer bottom-1 left-2/3`}
                            style={{ zIndex: 1, color: `#${closeIconColor}` }}
                        />
                    )} />
            )}
        </>
    );
};

export default ModularHolder;
