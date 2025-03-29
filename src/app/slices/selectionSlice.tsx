import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// Define the selection interface
interface Selection {
    stepNo: number;
    step: string;
    description: string;
}

interface SelectionState {
    selectionData: Selection[]; // Array of selections
    currentStep: any;
    isNextDisabled: boolean;
    isPrevDisabled: boolean;
}

// Define the initial state using that type
const initialState: SelectionState = {
    selectionData: [],
    currentStep: {},
    isNextDisabled: true,
    isPrevDisabled: true,
};

export const selectionSlice = createSlice({
    name: 'selection',
    initialState,
    reducers: {
        // Action to set selection data
        setSelectionData: (state, action: PayloadAction<Selection[]>) => {
            state.selectionData = action.payload;
        },

        setCurrentStep: (state, action: PayloadAction<any>) => {
            state.currentStep = action.payload;
        },

        setIsNextStepDisabled: (state, action: PayloadAction<boolean>) => {
            state.isNextDisabled = action.payload;
        },

        gotoStep: (state, action: PayloadAction<{ stepData: any; cartData: any, currentStep: any }>) => {
            // stepData consist data of Step that we have to go 
            // cartData consists of current cartData with selection
            // currentStep consists of current step data where user is already on
            const { stepData, cartData, currentStep } = action.payload;  // Extract stepData and cartData from the action payload
            const currentIndex = currentStep.stepNo - 1; // stepNo starts from 1 
            const targetStep = stepData.step;
            const targetIndex = state.selectionData.findIndex(step => step.step === targetStep); // index starts from 0

            if (targetIndex === -1) {
                // If the step doesn't exist in the selection data, return an error
                console.error("Step not found");
                return;
            }

            // Check if all previous steps (before step 5) have valid data in the cart
            const maxValidStep = Math.min(targetIndex, 4); // Only validate up to step 4
            const allPreviousStepsValid = state.selectionData.slice(0, maxValidStep).every((step) => {
                const lowercaseKey = step.step.toLowerCase();

                // Check if the cartData for the current step exists and is valid
                const value = cartData[lowercaseKey];

                if (Array.isArray(value)) {
                    return value.length > 0; // Ensure that the array is not empty
                } else if (typeof value === 'object' && value !== null) {
                    return true; // Any object data is considered valid
                }
                return false; // If data is missing or invalid, return false
            });

            if (!allPreviousStepsValid) {
                // If any previous step (before step 5) is invalid, return an error and don't change the current step
                throw new Error("Validation failed: Please select data for all previous steps before proceeding.");
            }

            // If all previous steps have valid data, update the current step
            state.currentStep = state.selectionData[targetIndex];

            if (targetIndex < currentIndex) {
                state.isNextDisabled = false;
            }
        },

        nextStep: (state, action: PayloadAction<any>) => {
            if (state.currentStep) {
                const currentIndex = state.selectionData.findIndex(step => step.stepNo === state.currentStep.stepNo);
                const nextIndex = currentIndex + 1;

                if (nextIndex < state.selectionData.length) {
                    state.currentStep = state.selectionData[nextIndex];
                    state.isPrevDisabled = false;

                    /* Checking if Next Step has Selected Data */
                    if (action.payload) {
                        const lowercaseKey = state.currentStep.step.toLowerCase();
                        const cartData = action.payload; // Receiving Cart Data in Payload
                        if (nextIndex < 4) { // Doing this for Only First 4 Step till Accessories
                            if (cartData[lowercaseKey]) { // Checking if the Object Exists in CartData 
                                const value = cartData[lowercaseKey];
                                if (Array.isArray(value)) { // Checking if Object Exists and Also Options Exists in Object for Accessories
                                    // If it's an array, set isNextDisabled based on its length
                                    state.isNextDisabled = value.length === 0; // True if empty array, false if not
                                } else if (typeof value === 'object' && value !== null) { // if its Just Object Not Array
                                    // If it's an object, keep isNextDisabled based on other conditions if necessary
                                    state.isNextDisabled = false; // Change this logic based on your requirements
                                } else {
                                    // If it's neither an object nor an array
                                    state.isNextDisabled = true;
                                }
                            }
                            else {
                                // If cartData[lowercaseKey] does not exist
                                state.isNextDisabled = true;
                            }
                        } else {
                            // For Icons, Color and Cart
                            state.isNextDisabled = false;
                        }
                    }
                } else {
                    console.log("You are at the last step.");
                    state.isNextDisabled = true;
                }
            }
        },

        previousStep: (state) => {
            if (state.currentStep) {
                const currentIndex = state.selectionData.findIndex(step => step.stepNo === state.currentStep.stepNo);
                const previousIndex = currentIndex - 1;

                if (previousIndex >= 0) {
                    state.currentStep = state.selectionData[previousIndex];
                    state.isNextDisabled = false;
                } else {
                    console.log("You are at the first step.");
                    state.isPrevDisabled = true;
                }
            }
        },

        isStepValid: (state, action: PayloadAction<{ cartData: any, }>) => {
            const { cartData } = action.payload;
            const currentStep = state.currentStep;
            if (currentStep.stepNo < 5) {   // Works Till Accessories Only
                const data = cartData?.[currentStep.step.toLowerCase()]
                if (currentStep.stepNo < 4) { // For Panel Material Size only
                    if (data === undefined) {
                        state.isNextDisabled = true;
                    }
                }
                else { // For Accessories Only
                    if (data[0].options.length < 2) {
                        state.isNextDisabled = true;
                    }
                }
            }
        },

    },
});

// Export the action and reducer
export const { setSelectionData, setCurrentStep, gotoStep, nextStep, previousStep, setIsNextStepDisabled, isStepValid } = selectionSlice.actions;
export default selectionSlice.reducer;
