
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface loginSignUpState {
    userType: number
}

const initialState: loginSignUpState = {
    userType: 0,
};

const loginSignUpSlice = createSlice({
    name: 'loginSignUp',
    initialState,
    reducers: {
        setUserType(state, action: PayloadAction<number>) {
            state.userType = action.payload;
        },
    }
});

export const {
    setUserType,
} = loginSignUpSlice.actions;
export default loginSignUpSlice.reducer;
