'use client';

import { useEffect, useState } from 'react';
import Portal from '@mui/material/Portal';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/app/store/store';
import { resetAlert } from '~/app/slices/extraSlice';

const AlertElement: React.FC = () => {
    const dispatch = useDispatch();
    const { message, severity, duration } = useSelector((state: RootState) => state.extraSlice.alert);
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false); // Track if component is mounted

    useEffect(() => {
        setMounted(true); // Set mounted to true after the component mounts
    }, []);

    useEffect(() => {
        if (!mounted) return; // Don't proceed if not mounted

        if (duration > 0 && message) {
            setIsVisible(true); // Show the alert when there's a message

            const timer = setTimeout(() => {
                setIsVisible(false); // Hide the alert after the duration
                dispatch(resetAlert()); // Reset the alert state after the duration ends
            }, duration);

            return () => clearTimeout(timer); // Cleanup timer on component unmount or duration change
        } else {
            setIsVisible(false); // Hide alert if duration is 0 or no message
        }
    }, [duration, message, dispatch, mounted]);

    if (!mounted) return null; // Prevent rendering on the server

    return (
        <Portal>
            <Box
                sx={{
                    position: 'fixed',
                    top: 20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1300,
                    width: 'auto',
                    maxWidth: '90%',
                }}
            >
                {isVisible && (
                    <Alert variant="filled" severity={severity}>
                        {message}
                    </Alert>
                )}
            </Box>
        </Portal>
    );
};

export default AlertElement;
