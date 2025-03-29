'use client';
import { useState, useEffect } from "react";
import TitleElement from "~/app/_components/Elements/TitleElement";
import { Divider } from "@mui/material";
import ButtonElement from "~/app/_components/Elements/buttonElement";
import TableElement from "~/app/_components/Elements/TableElement";
import { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { userCreationFormLabels as labels } from "~/constants/labels";
import { AutoCompleteElement } from "~/app/_components/Elements/AutoCompleteElement";
import TextElement from "~/app/_components/Elements/textElement";
import ClearButton from "~/app/_components/Elements/clearButton";
import { RootState } from "~/app/store/store";
import { useSelector, useDispatch } from "react-redux";
import AlertElement from "~/app/_components/Elements/AlertElement";
import { showAlert } from "~/app/slices/extraSlice";
import {
    addUndefinedObjectInUserCreationArr,
    removeObjectInUserCreationArr,
    updateUserFirstName,
    updateUserLastName,
    updateUserEmail,
    updateUserPhoneNo,
    updateUserPriceVisibility,
} from "~/app/slices/adminSlice";

// Dummy data for the autocomplete
const top100Films = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Dark Knight' },
    { title: 'Schindler\'s List' },
    { title: 'Pulp Fiction' },
    { title: 'The Lord of the Rings: The Return of the King' },
    { title: 'Forrest Gump' },
    { title: 'Inception' },
    { title: 'The Matrix' },
    { title: 'Goodfellas' },
];

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true,
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true,
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: true,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    },
];

// Define your row data
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 10, lastName: 'Roxie', firstName: 'Harvey', age: 53 },
    { id: 11, lastName: 'Roxie', firstName: 'Harvey', age: 23 },
    { id: 12, lastName: 'Roxie', firstName: 'Harvey', age: 59 },
    { id: 13, lastName: 'Roxie', firstName: 'Harvey', age: 69 },
];


interface UserCreationProps {

}

const UserCreation: React.FC<UserCreationProps> = ({ }) => {
    const dividerWidth = 40;
    const rounded = 'xl'; // Keeping all the Elements  in this Rounded 
    const [isDataValid, setDataValid] = useState(false); // For Validation of All Data if not Valid keep the Final Button Disabled
    const dispatch = useDispatch();
    const userCreation = useSelector((state: RootState) => state.adminSlice.userCreation);

    useEffect(() => {
        // Validate the form initially when userCreation changes
        validateData();
    }, [userCreation]);

    // Validation function
    const validateData = () => {
        let isValid = true;

        // Check if all required fields are filled
        userCreation.forEach((ele) => {
            if (
                !ele.firstName ||
                !ele.lastName ||
                !ele.emailId ||
                !ele.phoneNo ||
                !ele.priceVisibility
            ) {
                isValid = false;
            }

        });

        // Set the validation state
        setDataValid(isValid);
    };

    // Regular Expression Checkf for Email and Phone Number
    const checkEmailAndPhone = () => {
        let isEmailAndPhoneValid = true; // Assume valid unless proven otherwise

        // Regular expression for email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // Regular expression for phone number validation (10 digits)
        const phonePattern = /^[0-9]{10}$/;

        userCreation.forEach((ele) => {
            // Validate email format
            if (ele.emailId && !emailPattern.test(ele.emailId)) {
                dispatch(showAlert({ message: `Invalid Email Format`, duration: 3000 }));
                isEmailAndPhoneValid = false; // Set invalid if email is invalid
            }

            // Validate phone number (must be exactly 10 digits)
            if (ele.phoneNo && !phonePattern.test(String(ele.phoneNo))) {
                dispatch(showAlert({ message: `Phone number must be exactly 10 digits`, duration: 3000 }));
                isEmailAndPhoneValid = false; // Set invalid if phone number is invalid
            }
        });

        return isEmailAndPhoneValid;
    }

    // Add Undefined Array in productPricingState in Admin Slice for Showing one more of Set of Details form in UI
    const handleAddMoreDetails = () => {
        dispatch(addUndefinedObjectInUserCreationArr());
    }

    // Handler to update the first name
    const handleFirstNameChange = (id: string, value: string) => {
        dispatch(updateUserFirstName({ id, firstName: value }));
    };

    // Handler to update the last name
    const handleLastNameChange = (id: string, value: string) => {
        dispatch(updateUserLastName({ id, lastName: value }));
    };

    // Handler to update the email id
    const handleEmailIDChange = (id: string, value: string) => {
        dispatch(updateUserEmail({ id, emailId: value }));
    };

    // Handler to update the phone number
    const handlePhoneNumberChange = (id: string, value: string) => {
        // Dispatch the update if the value is a valid number
        dispatch(updateUserPhoneNo({ id, phoneNo: value }));
    };

    // Handler to update the price visibility 
    const handleUpdatePriceVisibility = (id: string, value: string) => {
        dispatch(updateUserPriceVisibility({ id, priceVisibility: value }));
    };

    // Invokes when user Clicks SetPrice Button 
    const handleUserCreate = () => {
        // Check For Regular Expression in Email and Phone Number
        if (checkEmailAndPhone()) {
            console.log(userCreation);
        }
    }

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between items-center p-4">
                <TitleElement title={labels.title} />
            </div>
            <Divider sx={{ marginLeft: '1rem', width: `${dividerWidth}%` }} />

            <div className="flex flex-col md:flex-row justify-between items-start">
                {/* First div: Table */}
                <div className="flex-1">
                    {/* Page body with Table */}
                    <div className="m-5">
                        <TableElement
                            rows={rows}
                            columns={columns}
                            pageSizeOptions={[5, 10, 20]}
                            initialPaginationModel={{ pageSize: 5 }}
                        />
                    </div>
                </div>

                {/* Second div: Form section */}
                <div className="flex-1 m-5">
                    {/* Secondary Title */}
                    <span className="text-md text-gray-600 font-semibold">{labels.secondaryTitle}</span>

                    {/* Form Section */}
                    {userCreation.length > 0 ? userCreation.map((ele, index) => (
                        <>
                            {index > 0 ? <Divider /> : null} {/* Dont Render it if there is only 1 element */}

                            <div key={ele.id} className="my-5 space-y-5">
                                {/* First Set of Inputs */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    {/* First Name */}
                                    <TextElement
                                        value={ele.firstName}
                                        label={labels.label1}
                                        placeholder={labels.label1Placeholder}
                                        rounded={rounded}
                                        onChange={(e) => handleFirstNameChange(ele.id, e.target.value)}
                                    />
                                    {/* Last Name */}
                                    <TextElement
                                        value={ele.lastName}
                                        label={labels.label2}
                                        placeholder={labels.label2Placeholder}
                                        rounded={rounded}
                                        onChange={(e) => handleLastNameChange(ele.id, e.target.value)}
                                    />
                                </div>

                                {/* Second Set of Inputs */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    {/* Email Id */}
                                    <TextElement
                                        value={ele.emailId}
                                        label={labels.label3}
                                        placeholder={labels.label3Placeholder}
                                        rounded={rounded}
                                        onChange={(e) => handleEmailIDChange(ele.id, e.target.value)}
                                    />
                                    {/* Phone Number */}
                                    <TextElement
                                        value={ele.phoneNo}
                                        label={labels.label4}
                                        placeholder={labels.label4Placeholder}
                                        rounded={rounded}
                                        onChange={(e) => handlePhoneNumberChange(ele.id, e.target.value)}
                                    />
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    {/* Price Visibility */}
                                    <AutoCompleteElement
                                        options={top100Films}
                                        label={labels.label5}
                                        placeholder={labels.label5Placeholder}
                                        rounded={rounded}
                                        value={top100Films.find(film => film.title === ele.priceVisibility)}
                                        onChange={(value) => handleUpdatePriceVisibility(ele.id, value?.title || '')}
                                    />
                                </div>

                                {/* Remove Button */}
                                {(userCreation.length > 1) &&
                                    <div className="flex">
                                        <ClearButton
                                            label={labels.removeButtonLabel}
                                            onClick={() => { dispatch(removeObjectInUserCreationArr(ele.id)) }}
                                            msg={labels.removeModalMsg}
                                        />
                                    </div>
                                }
                            </div>
                        </>
                    )) : ''}

                    {/* Lower Button Section*/}
                    <div className="flex my-10 justify-around">
                        {/* Add New Product Price */}
                        <ButtonElement label={labels.buttonLabel} variant="outlined" rounded="xl" onClick={handleAddMoreDetails} icon={<AddIcon />} />
                        {/* Set Price */}
                        <ButtonElement label={labels.finalButton} rounded="xl" disabled={!isDataValid} onClick={handleUserCreate} />
                    </div>
                </div>
            </div>

            <AlertElement />
        </>
    )
}
export default UserCreation;