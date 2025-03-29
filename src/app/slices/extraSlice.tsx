
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface AlertState {
    message: string;
    severity: 'success' | 'info' | 'warning' | 'error';
    duration: number;
}

interface AccessoryState {
    totalSize: number | undefined;
    totalOccupiedSize: number;
    totalOccupiedSize1: number;
    totalOccupiedSize2: number;
}

interface extraState {
    logoUrl: any;
    alert: AlertState;
    accessoryOccupancy: AccessoryState;
    accessoryCurrentId: number;
    sendingEmailStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: extraState = {
    logoUrl: '/Image/logoVerni.png',
    alert: {
        message: '',
        severity: 'error',
        duration: 0,
    },
    accessoryOccupancy: {
        totalSize: 0,
        totalOccupiedSize: 0,
        totalOccupiedSize1: 0,
        totalOccupiedSize2: 0,
    },
    accessoryCurrentId: 0,
    sendingEmailStatus: 'idle',
};

// Create an async thunk for sending the email
export const sendPanelDetailsEmail = createAsyncThunk(
    'extra/sendPanelDetailsEmail', // Name of the action
    async ({ panelData, recipientEmail }: { panelData: object; recipientEmail: string }, thunkAPI) => {
        try {
            const response = await fetch('/api/sendPanelEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ panelData, recipientEmail }),
            });

            if (!response.ok) {
                return thunkAPI.rejectWithValue('Failed to send email.');
            }

            console.log('Email sent successfully!');
            return 'Email sent successfully!';
        } catch (error: unknown) {  // Explicitly typing `error` as `unknown`
            if (error instanceof Error) {  // Check if `error` is an instance of `Error`
                return thunkAPI.rejectWithValue('Error sending email: ' + error.message);
            } else {
                return thunkAPI.rejectWithValue('Unknown error occurred');
            }
        }
    }
);

const extraSlice = createSlice({
    name: 'extra',
    initialState,
    reducers: {
        setLogoUrl(state, action: PayloadAction<{ url: any }>) {
            state.logoUrl = action.payload.url;
        },

        showAlert(state, action: PayloadAction<{ message: string; severity?: AlertState['severity']; duration?: number }>) {
            state.alert.message = action.payload.message;
            state.alert.severity = action.payload.severity || 'error';
            state.alert.duration = action.payload.duration || 3000;
        },

        resetAlert(state) {
            state.alert.message = '';
            state.alert.severity = 'error';
            state.alert.duration = 0;
        },

        setTotalSize(state, action: PayloadAction<any>) {
            state.accessoryOccupancy.totalSize = action.payload;
        },

        addTotalOccupiedSize(state, action: PayloadAction<any>) {
            state.accessoryOccupancy.totalOccupiedSize += action.payload;
        },

        subtractTotalOccupiedSize(state, action: PayloadAction<any>) {
            state.accessoryOccupancy.totalOccupiedSize -= action.payload;
        },

        addTotalOccupiedSize1(state, action: PayloadAction<any>) {
            state.accessoryOccupancy.totalOccupiedSize1 += action.payload;
        },

        subtractTotalOccupiedSize1(state, action: PayloadAction<any>) {
            state.accessoryOccupancy.totalOccupiedSize1 -= action.payload;
        },

        addTotalOccupiedSize2(state, action: PayloadAction<any>) {
            state.accessoryOccupancy.totalOccupiedSize2 += action.payload;
        },

        subtractTotalOccupiedSize2(state, action: PayloadAction<any>) {
            state.accessoryOccupancy.totalOccupiedSize2 -= action.payload;
        },

        resetTotalOccupiedSize(state) {
            state.accessoryOccupancy.totalOccupiedSize = 0;
            state.accessoryOccupancy.totalOccupiedSize1 = 0;
            state.accessoryOccupancy.totalOccupiedSize2 = 0;
        },

        incrementAccessoryId(state) {
            state.accessoryCurrentId++;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendPanelDetailsEmail.pending, (state) => {
                state.sendingEmailStatus = 'loading'; // Email sending started
            })
            .addCase(sendPanelDetailsEmail.fulfilled, (state, action) => {
                state.sendingEmailStatus = 'succeeded'; // Email sent successfully

            })
            .addCase(sendPanelDetailsEmail.rejected, (state, action) => {
                state.sendingEmailStatus = 'failed'; // Email sending failed                              
            });
    },
});

export const {
    setLogoUrl,
    showAlert,
    resetAlert,
    setTotalSize,
    addTotalOccupiedSize,
    subtractTotalOccupiedSize,
    addTotalOccupiedSize1,
    subtractTotalOccupiedSize1,
    addTotalOccupiedSize2,
    subtractTotalOccupiedSize2,
    resetTotalOccupiedSize,
    incrementAccessoryId,
} = extraSlice.actions;
export default extraSlice.reducer;
