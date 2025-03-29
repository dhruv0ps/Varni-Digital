import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface OrderPlaced {
    ordersColumns: any[];
    ordersRows: any[];
}

export interface ProductPricing {
    id: string;
    productCategory: string;
    productType: string;
    productPrice: string;
    productDiscount: string;
}

export interface SalesPerson {
    salesPersonColumns: any[];
    salesPersonRows: any[];
}

export interface UserCreation {
    id: string,
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNo: string;
    priceVisibility: string;
}

export interface AddAccessory {
    id: string,
    accessoryType: string;
    accessoryCategory: string;
    accessoryImage: Blob | undefined;
}

export interface AdminProfile {
    firstName: string;
    lastName: string;
    emailId: string;
    phoneNo: string;
}

export interface AdminState {
    orders: OrderPlaced[];
    productsPricing: ProductPricing[];
    salesPerson: SalesPerson[];
    userCreation: UserCreation[];
    addAccessory: AddAccessory[];
    adminProfile: [AdminProfile, AdminProfile];
}

const initialState: AdminState = {
    orders: [
        {
            ordersColumns: [],
            ordersRows: []
        },
    ],

    productsPricing: [{
        id: uuidv4(),
        productCategory: '',
        productType: '',
        productPrice: '',
        productDiscount: '',
    }],

    salesPerson: [
        {
            salesPersonColumns: [],
            salesPersonRows: []
        },
    ],

    userCreation: [{
        id: uuidv4(),
        firstName: '',
        lastName: '',
        emailId: '',
        phoneNo: '',
        priceVisibility: '',
    }],

    addAccessory: [{
        id: uuidv4(),
        accessoryType: '',
        accessoryCategory: '',
        accessoryImage: undefined,
    }],

    adminProfile: [
        // First Object to Hold Current Admin Data 
        // This is For Cancel and Reverting Changes back to Orginal Data
        {
            firstName: 'Pankaj',
            lastName: 'Kushwaha',
            emailId: 'kushwahap255@gmail.com',
            phoneNo: '9265241462',
        },
        // Second Duplicate Object to Hold Copy of Admin Data, User can Update this Data
        {
            firstName: 'Pankaj',
            lastName: 'Kushwaha',
            emailId: 'kushwahap255@gmail.com',
            phoneNo: '9265241462',
        }],
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        //ProductPricing Page Reducers
        // Add a New Object in ProductPricingArr
        addUndefinedObjectInProductPriceArr: (
            state,
        ) => {
            const newProductPricing: ProductPricing = {
                id: uuidv4(),  // Generate a unique ID using uuidv4
                productCategory: '',  // Initialize other fields to empty strings
                productType: '',
                productPrice: '',
                productDiscount: '',
            };

            // Add the new ProductPricing object to the productsPricing array
            state.productsPricing.push(newProductPricing);
        },

        // Remove a ProductPricing object based on the id
        removeObjectInProductPriceArr: (
            state,
            action: PayloadAction<string>,
        ) => {
            const idToRemove = action.payload;
            // Filter out the item with the given id
            state.productsPricing = state.productsPricing.filter(
                (product) => product.id !== idToRemove
            );
        },

        // Update the product category
        updateProductCategory: (
            state,
            action: PayloadAction<{ id: string; productCategory: string }>,
        ) => {
            const { id, productCategory } = action.payload;
            const product = state.productsPricing.find((product) => product.id === id);
            if (product) {
                product.productCategory = productCategory;
            }
        },

        // Update the product type
        updateProductType: (
            state,
            action: PayloadAction<{ id: string; productType: string }>,
        ) => {
            const { id, productType } = action.payload;
            const product = state.productsPricing.find((product) => product.id === id);
            if (product) {
                product.productType = productType;
            }
        },

        // Update the product price
        updateProductPrice: (
            state,
            action: PayloadAction<{ id: string; productPrice: string }>,
        ) => {
            const { id, productPrice } = action.payload;
            const product = state.productsPricing.find((product) => product.id === id);
            if (product) {
                product.productPrice = productPrice;
            }
        },

        // Update the product discount
        updateProductDiscount: (
            state,
            action: PayloadAction<{ id: string; productDiscount: string }>,
        ) => {
            const { id, productDiscount } = action.payload;
            const product = state.productsPricing.find((product) => product.id === id);
            if (product) {
                product.productDiscount = productDiscount;
            }
        },

        // UserCreation Page Reducers
        // Add a new user
        addUndefinedObjectInUserCreationArr: (state) => {
            const newUser: UserCreation = {
                id: uuidv4(),
                firstName: '',
                lastName: '',
                emailId: '',
                phoneNo: '',
                priceVisibility: '',
            };
            state.userCreation.push(newUser);
        },

        // Remove a user by id
        removeObjectInUserCreationArr: (state, action: PayloadAction<string>) => {
            const idToRemove = action.payload;
            state.userCreation = state.userCreation.filter(user => user.id !== idToRemove);
        },

        // Update user first name
        updateUserFirstName: (state, action: PayloadAction<{ id: string; firstName: string }>) => {
            const { id, firstName } = action.payload;
            const user = state.userCreation.find(user => user.id === id);
            if (user) {
                user.firstName = firstName;
            }
        },

        // Update user last name
        updateUserLastName: (state, action: PayloadAction<{ id: string; lastName: string }>) => {
            const { id, lastName } = action.payload;
            const user = state.userCreation.find(user => user.id === id);
            if (user) {
                user.lastName = lastName;
            }
        },

        // Update user email
        updateUserEmail: (state, action: PayloadAction<{ id: string; emailId: string }>) => {
            const { id, emailId } = action.payload;
            const user = state.userCreation.find(user => user.id === id);
            if (user) {
                user.emailId = emailId;
            }
        },

        // Update user phone number
        updateUserPhoneNo: (state, action: PayloadAction<{ id: string; phoneNo: string }>) => {
            const { id, phoneNo } = action.payload;
            const user = state.userCreation.find(user => user.id === id);
            if (user) {
                user.phoneNo = phoneNo;
            }
        },

        // Update user price visibility
        updateUserPriceVisibility: (state, action: PayloadAction<{ id: string; priceVisibility: string | undefined }>) => {
            const { id, priceVisibility } = action.payload;
            const user = state.userCreation.find(user => user.id === id);
            if (user) {
                if (priceVisibility) {
                    user.priceVisibility = priceVisibility;
                }
            }
        },

        // Add Accessories
        // Add a new accessory
        addUndefinedObjectInAddAccessoryArr: (state) => {
            const newAccessory: AddAccessory = {
                id: uuidv4(),  // Generate a unique ID using uuidv4
                accessoryType: '',  // Initialize other fields to empty strings or undefined
                accessoryCategory: '',
                accessoryImage: undefined,
            };

            // Add the new accessory to the addAccessory array
            state.addAccessory.push(newAccessory);
        },

        // Remove an accessory by ID
        removeObjectInAddAccessoryArr: (state, action: PayloadAction<string>) => {
            const idToRemove = action.payload;
            // Remove the accessory with the given id from the array
            state.addAccessory = state.addAccessory.filter(accessory => accessory.id !== idToRemove);
        },

        // Update the accessory type
        updateAccessoryType: (state, action: PayloadAction<{ id: string; accessoryType: string }>) => {
            const { id, accessoryType } = action.payload;
            const accessory = state.addAccessory.find((accessory) => accessory.id === id);
            if (accessory) {
                accessory.accessoryType = accessoryType;
            }
        },

        // Update the accessory category
        updateAccessoryCategory: (state, action: PayloadAction<{ id: string; accessoryCategory: string }>) => {
            const { id, accessoryCategory } = action.payload;
            const accessory = state.addAccessory.find((accessory) => accessory.id === id);
            if (accessory) {
                accessory.accessoryCategory = accessoryCategory;
            }
        },

        // Update the accessory image (Blob)
        updateAccessoryImage: (state, action: PayloadAction<{ id: string; accessoryImage: Blob | undefined }>) => {
            const { id, accessoryImage } = action.payload;
            const accessory = state.addAccessory.find((accessory) => accessory.id === id);
            if (accessory) {
                accessory.accessoryImage = accessoryImage;
            }
        },

        // Admin Profile 
        // Update Admin Profile First Name
        updateAdminFirstName: (
            state,
            action: PayloadAction<string>
        ) => {
            state.adminProfile[1].firstName = action.payload;
        },

        // Update Admin Profile Last Name
        updateAdminLastName: (
            state,
            action: PayloadAction<string>
        ) => {
            state.adminProfile[1].lastName = action.payload;
        },

        // Update Admin Profile Email
        updateAdminEmail: (
            state,
            action: PayloadAction<string>
        ) => {
            state.adminProfile[1].emailId = action.payload;
        },

        // Update Admin Profile Phone No
        updateAdminPhoneNo: (
            state,
            action: PayloadAction<string>
        ) => {
            state.adminProfile[1].phoneNo = action.payload;
        },

        // Revert changes in the second object back to the original data (first object)
        revertChanges: (state) => {
            // Copy the data from the first object to the second object
            const firstProfile = state.adminProfile[0]; // original data (API response)
            const secondProfile = state.adminProfile[1]; // editable copy

            // Revert the second object to match the original data
            secondProfile.firstName = firstProfile.firstName;
            secondProfile.lastName = firstProfile.lastName;
            secondProfile.emailId = firstProfile.emailId;
            secondProfile.phoneNo = firstProfile.phoneNo;
        },

    },
});

// Export the actions and reducer
export const {
    // Product Pricing
    addUndefinedObjectInProductPriceArr,
    removeObjectInProductPriceArr,
    updateProductCategory,
    updateProductType,
    updateProductPrice,
    updateProductDiscount,

    // User Creation
    addUndefinedObjectInUserCreationArr,
    removeObjectInUserCreationArr,
    updateUserFirstName,
    updateUserLastName,
    updateUserEmail,
    updateUserPhoneNo,
    updateUserPriceVisibility,

    // Add Accessories
    addUndefinedObjectInAddAccessoryArr,
    removeObjectInAddAccessoryArr,
    updateAccessoryType,
    updateAccessoryCategory,
    updateAccessoryImage,

    // Admin Profile
    updateAdminFirstName,
    updateAdminLastName,
    updateAdminEmail,
    updateAdminPhoneNo,
    revertChanges,

} = adminSlice.actions;

export default adminSlice.reducer;