import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '~/app/store/store';
import { gotoStep } from '../slices/selectionSlice';
import { showAlert } from '../slices/extraSlice';
import { hideCanvasBorder } from '../slices/cartSlice';

const DesktopStepper = () => {
    const dispatch = useDispatch();
    const currentStep = useSelector((state: RootState) => state.selectionData.currentStep);
    const selectionData = useSelector((state: RootState) => state.selectionData.selectionData);
    const cartData = useSelector((state: RootState) => state.cartData.cartData);

    const handleStepClick = (stepData: any) => {
        // Dispatch the action with the targetStep and cartData
        try {
            dispatch(gotoStep({ stepData: stepData, cartData, currentStep: currentStep }));
            // Hiding Canvas Border if User Directly Jumps to Cart Step without Selecting Color
            if (stepData.stepNo > 5) {
                dispatch(hideCanvasBorder());
            }
        } catch (error: unknown) {
            // Check if the error is an instance of Error
            if (error instanceof Error) {
                // Dispatch the showAlert action to display the error message
                dispatch(showAlert({ message: error.message, duration: 3000 }));
            } else {
                // In case the error is not an instance of Error, handle it gracefully
                console.error("An unknown error occurred", error);
            }
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: '600px', }}>
            <Stepper
                activeStep={currentStep ? currentStep.stepNo - 1 : 0}
                alternativeLabel
                className="w-full cursor-pointer"
            >
                {selectionData.map((ele) => (
                    <Step key={ele.stepNo} disabled={false}>
                        <StepLabel onClick={() => handleStepClick(ele)}>
                            {ele.step}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    )
}
export default DesktopStepper;