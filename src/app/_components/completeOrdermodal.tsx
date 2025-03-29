import * as React from 'react';
import { Modal, Box, Typography } from '@mui/material';
import ButtonElement from './Elements/buttonElement';
import TextElement from './Elements/textElement';
import CloseIcon from '@mui/icons-material/Close';

// Style for the modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '16px',  // For Rounded Modal
    boxShadow: 24,
    p: 4,
};

interface CompleteOrderModalProps {
    open: boolean;
    handleClose: () => void;
    onSubmit: (emailAdd: string, userName: string) => void;  // Added onSubmit function
}

const CompleteOrderModal: React.FC<CompleteOrderModalProps> = ({ open, handleClose, onSubmit }) => {
    const [emailAdd, setEmailAdd] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [validEmail, setValidEmail] = React.useState(false);
    const [validName, setValidName] = React.useState(false);

    // Email validation regex (simplified version)
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Handle email input change
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const email = event.target.value;
        setEmailAdd(email);

        // Validate the email based on regex
        setValidEmail(emailRegex.test(email));
    };

    // Handle name input change
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setUserName(name);

        // Name should not be empty
        setValidName(name.trim().length > 0);
    };

    // Handle form submission
    const handleSubmit = () => {
        onSubmit(userName, emailAdd); // Pass the emailAdd back to the parent
        handleClose(); // Close the modal after submission
    };

    return (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Complete your order
                    <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                </Typography>

                {/* Name input field */}
                <TextElement
                    label="Enter Name"
                    placeholder="Enter your Name"
                    value={userName}
                    onChange={handleNameChange}
                    variant="primary"
                    size="medium"
                    className="mb-6"
                />

                {/* Email input field */}
                <TextElement
                    label="Email Address"
                    placeholder='Enter your email address'
                    value={emailAdd}
                    onChange={handleInputChange}
                    variant="primary"
                    size="medium"
                    className='mb-6'
                />

                {/* Submit Button */}
                <ButtonElement
                    label="Done"
                    onClick={handleSubmit}
                    disabled={!validEmail || !validName}  // Disable button if email is invalid
                />
            </Box>
        </Modal>
    );
};

export default CompleteOrderModal;
