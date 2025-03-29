'use client';
import { useState, useEffect } from "react";
import TitleElement from "~/app/_components/Elements/TitleElement";
import { Divider } from "@mui/material";
import ButtonElement from "~/app/_components/Elements/buttonElement";
import { adminProfileFormLabels as labels } from "~/constants/labels";
import TextElement from "~/app/_components/Elements/textElement";
import ClearButton from "~/app/_components/Elements/clearButton";
import { RootState } from "~/app/store/store";
import { useSelector, useDispatch } from "react-redux";
import AlertElement from "~/app/_components/Elements/AlertElement";
import { showAlert } from "~/app/slices/extraSlice";
import {
    updateAdminFirstName,
    updateAdminLastName,
    updateAdminEmail,
    updateAdminPhoneNo,
    revertChanges,
} from "~/app/slices/adminSlice";

interface AdminProfileProps {

}

const AdminProfile: React.FC<AdminProfileProps> = ({ }) => {
    const dividerWidth = 40;
    const rounded = 'xl'; // Keeping all the Elements  in this Rounded 
    const [isDataValid, setDataValid] = useState(false); // For Validation of All Data if not Valid keep the Final Button Disabled
    const dispatch = useDispatch();
    const adminProfile = useSelector((state: RootState) => state.adminSlice.adminProfile[1]);

    useEffect(() => {
        // Validate the form initially when adminProfile changes
        validateData();
    }, [adminProfile]);

    // Validation function
    const validateData = () => {
        let isValid = true;

        // Check if all required fields are filled
        if (
            !adminProfile.firstName ||
            !adminProfile.lastName ||
            !adminProfile.emailId ||
            !adminProfile.phoneNo
        ) {
            isValid = false;
        }

        // Set the validation state
        setDataValid(isValid);
    };

    // Regular Expression Check for Email and Phone Number
    const checkEmailAndPhone = () => {
        let isEmailAndPhoneValid = true; // Assume valid unless proven otherwise

        // Regular expression for email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // Regular expression for phone number validation (10 digits)
        const phonePattern = /^[0-9]{10}$/;

        // Validate email format
        if (adminProfile.emailId && !emailPattern.test(adminProfile.emailId)) {
            dispatch(showAlert({ message: `Invalid Email Format`, duration: 3000 }));
            isEmailAndPhoneValid = false; // Set invalid if email is invalid
        }

        // Validate phone number (must be exactly 10 digits)
        if (adminProfile.phoneNo && !phonePattern.test(String(adminProfile.phoneNo))) {
            dispatch(showAlert({ message: `Phone number must be exactly 10 digits`, duration: 3000 }));
            isEmailAndPhoneValid = false; // Set invalid if phone number is invalid
        }

        return isEmailAndPhoneValid;
    };

    // Handler to update the first name
    const handleFirstNameChange = (value: string) => {
        dispatch(updateAdminFirstName(value));
    };

    // Handler to update the last name
    const handleLastNameChange = (value: string) => {
        dispatch(updateAdminLastName(value));
    };

    // Handler to update the email id
    const handleEmailIDChange = (value: string) => {
        dispatch(updateAdminEmail(value));
    };

    // Handler to update the phone number
    const handlePhoneNumberChange = (value: string) => {
        // Dispatch the update if the value is a valid number
        dispatch(updateAdminPhoneNo(value));
    };

    // Invokes when user Clicks SetPrice Button 
    const handleAdminDataUpdate = () => {
        // Check For Regular Expression in Email and Phone Number
        if (checkEmailAndPhone()) {
            console.log(adminProfile);
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center p-4">
                <TitleElement title={labels.title} />
            </div>
            <Divider sx={{ marginLeft: '1rem', width: `${dividerWidth}%` }} />

            {/*  Page body */}
            <div className="m-5">
                {/* Secondary Title */}
                <span className="text-md text-gray-600 font-semibold">{labels.secondaryTitle}</span>

                {/* Form Section */}
                <div className="my-5 space-y-5">
                    {/* First Set of Inputs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:w-[60%]">
                        {/* First Name */}
                        <TextElement
                            value={adminProfile.firstName}
                            label={labels.label1}
                            placeholder={labels.label1Placeholder}
                            rounded={rounded}
                            onChange={(e) => handleFirstNameChange(e.target.value)}
                        />
                        {/* Last Name */}
                        <TextElement
                            value={adminProfile.lastName}
                            label={labels.label2}
                            placeholder={labels.label2Placeholder}
                            rounded={rounded}
                            onChange={(e) => handleLastNameChange(e.target.value)}
                        />
                    </div>

                    {/* Second Set of Inputs */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:w-[60%]">
                        {/* Email Id */}
                        <TextElement
                            value={adminProfile.emailId}
                            label={labels.label3}
                            placeholder={labels.label3Placeholder}
                            rounded={rounded}
                            onChange={(e) => handleEmailIDChange(e.target.value)}
                        />
                        {/* Phone Number */}
                        <TextElement
                            value={adminProfile.phoneNo}
                            label={labels.label4}
                            placeholder={labels.label4Placeholder}
                            rounded={rounded}
                            onChange={(e) => handlePhoneNumberChange(e.target.value)}
                        />
                    </div>
                </div>

                {/* Lower Button Section*/}
                <div className="flex my-10 justify-around">
                    {/* Revert Changes Back to Original Values  */}
                    <ClearButton
                        label={labels.removeButtonLabel}
                        onClick={() => { dispatch(revertChanges()) }}
                        msg={labels.removeModalMsg}
                    />
                    {/* Update User Data */}
                    <ButtonElement label={labels.finalButton} rounded="xl" disabled={!isDataValid} onClick={handleAdminDataUpdate} />
                </div>
            </div>
            <AlertElement />
        </>
    )
}
export default AdminProfile;