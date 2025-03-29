import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

interface ClearButtonProps {
    onClick?: () => void; // Function to handle click events
    label?: string;      // Optional label text for the button (default: 'Clear')
    size?: number;
    msg?: string;       // Size of the dustbin icon (default: 20)
}

const ClearButton: React.FC<ClearButtonProps> = ({ onClick, label = 'Clear Selection', size = 20, msg }) => {
    const [openModal, setOpenModal] = useState(false); // State to manage modal visibility

    // Handle modal open and close
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    // Handle the "Yes" action
    const handleYes = () => {
        onClick?.(); // Trigger the passed onClick function
        handleClose(); // Close the modal
    };

    return (
        <>
            <button
                onClick={handleOpen} // Open the modal when clicked
                className="flex items-center sm:px-2 sm:py-1 px-4 py-2 bg-white text-red-500 border border-red-500 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500
                transition-transform duration-150 ease-in-out active:scale-95 hover:scale-105"
            >
                <DeleteOutlineOutlinedIcon fontSize="small" className="mr-2" />
                {label}
            </button>

            {/* Modal */}
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="confirmation-modal"
                aria-describedby="confirmation-to-clear-selection"
            >
                <Box
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md"
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        outline: 'none',
                        padding: 10
                    }}
                >
                    <h2 id="confirmation-modal" className="text-xl font-semibold text-gray-700 mb-4">
                        Are you sure?
                    </h2>
                    <p id="confirmation-to-clear-selection" className="text-gray-500 mb-5">
                        {msg}
                    </p>
                    <div className="flex gap-5">
                        <Button
                            variant="contained"
                            color="error"
                            onClick={handleYes} // Trigger the forward action
                        >
                            Yes
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose} // Close the modal without forwarding
                        >
                            No
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default ClearButton;
