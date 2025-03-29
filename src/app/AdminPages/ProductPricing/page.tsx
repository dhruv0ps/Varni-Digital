'use client';
import { useState, useEffect } from "react";
import TitleElement from "~/app/_components/Elements/TitleElement";
import { Divider } from "@mui/material";
import ButtonElement from "~/app/_components/Elements/buttonElement";
import TableElement from "~/app/_components/Elements/TableElement";
import { GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { productPriceFormLabels as labels } from "~/constants/labels";
import { AutoCompleteElement } from "~/app/_components/Elements/AutoCompleteElement";
import TextElement from "~/app/_components/Elements/textElement";
import ClearButton from "~/app/_components/Elements/clearButton";
import { RootState } from "~/app/store/store";
import { useSelector, useDispatch } from "react-redux";
import {
    addUndefinedObjectInProductPriceArr,
    removeObjectInProductPriceArr,
    updateProductCategory,
    updateProductPrice,
    updateProductType,
    updateProductDiscount,
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

interface ProductPricingProps {

}

const ProductPricing: React.FC<ProductPricingProps> = ({ }) => {
    const dividerWidth = 40;
    const rounded = 'xl'; // Keeping all the Elements  in this Rounded 
    const [isDataValid, setDataValid] = useState(false); // For Validation of All Data if not Valid keep the Final Button Disabled
    const dispatch = useDispatch();
    const productsPricing = useSelector((state: RootState) => state.adminSlice.productsPricing);

    useEffect(() => {
        // Validate the form initially when productsPricing changes
        validateData();
    }, [productsPricing]);

    // Validation function
    const validateData = () => {
        let isValid = true;

        // Check if all required fields are filled
        productsPricing.forEach((product) => {
            if (
                !product.productCategory ||
                !product.productPrice ||
                !product.productType
            ) {
                isValid = false;
            }
        });

        // Set the validation state
        setDataValid(isValid);
    };

    // Add Undefined Array in productPricingState in Admin Slice for Showing one more of Set of Details form in UI
    const handleAddMoreDetails = () => {
        dispatch(addUndefinedObjectInProductPriceArr());
    }

    // Handler to update the product category
    const handleProductCategoryChange = (id: string, value: string) => {
        dispatch(updateProductCategory({ id, productCategory: value }));
    };

    // Handler to update the product type
    const handleProductTypeChange = (id: string, value: string) => {
        dispatch(updateProductType({ id, productType: value }));
    };

    // Handler to update the product price
    const handleProductPriceChange = (id: string, value: string) => {
        // Check if the value is a valid number (can be a decimal or integer)
        if (!isNaN(Number(value)) && value.trim() !== '') {
            // Dispatch the update if the value is a valid number
            dispatch(updateProductPrice({ id, productPrice: value }));
        }
    };

    // Handler to update the product discount
    const handleProductDiscountChange = (id: string, value: string) => {
        // Check if the value is a valid number (can be a decimal or integer)
        if (!isNaN(Number(value)) && value.trim() !== '') {
            // Dispatch the update if the value is a valid number
            dispatch(updateProductDiscount({ id, productDiscount: value }));
        }
    };

    // Invokes when user Clicks SetPrice Button 
    const handleAddPrice = () => {
        console.log(productsPricing);
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
                    {productsPricing.length > 0 ? productsPricing.map((ele, index) => (
                        <>
                            {index > 0 ? <Divider /> : null} {/* Don't render Divider if there's only 1 element */}

                            <div key={ele.id} className="my-5 space-y-5">
                                {/* First Set of Inputs */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    {/* Product Category */}
                                    <AutoCompleteElement
                                        options={top100Films}
                                        label={labels.label1}
                                        placeholder={labels.label1Placeholder}
                                        rounded={rounded}
                                        value={top100Films.find(film => film.title === ele.productCategory)}
                                        onChange={(value) => handleProductCategoryChange(ele.id, value?.title || '')}
                                    />
                                    {/* Set Product Price */}
                                    <TextElement
                                        value={ele.productPrice}
                                        label={labels.label2}
                                        placeholder={labels.label2Placeholder}
                                        rounded={rounded}
                                        onChange={(e) => handleProductPriceChange(ele.id, e.target.value)}
                                    />
                                </div>

                                {/* Second Set of Inputs */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                                    {/* Product Type */}
                                    <AutoCompleteElement
                                        options={top100Films}
                                        label={labels.label3}
                                        placeholder={labels.label3Placeholder}
                                        rounded={rounded}
                                        value={top100Films.find(film => film.title === ele.productType)}
                                        onChange={(value) => handleProductTypeChange(ele.id, value?.title || '')}
                                    />
                                    {/* Set Product Discount */}
                                    <TextElement
                                        value={ele.productDiscount}
                                        label={labels.label4}
                                        placeholder={labels.label4Placeholder}
                                        rounded={rounded}
                                        onChange={(e) => handleProductDiscountChange(ele.id, e.target.value)}
                                    />
                                </div>

                                {/* Remove Button */}
                                {(productsPricing.length > 1) &&
                                    <div className="flex">
                                        <ClearButton
                                            label={labels.removeButtonLabel}
                                            onClick={() => { dispatch(removeObjectInProductPriceArr(ele.id)) }}
                                            msg={labels.removeModalMsg}
                                        />
                                    </div>
                                }
                            </div>
                        </>
                    )) : ''}

                    {/* Lower Button Section */}
                    <div className="flex my-10 justify-around">
                        {/* Add New Product Price */}
                        <ButtonElement label={labels.buttonLabel} variant="outlined" rounded="xl" onClick={handleAddMoreDetails} icon={<AddIcon />} />
                        {/* Set Price */}
                        <ButtonElement label={labels.finalButton} rounded="xl" disabled={!isDataValid} onClick={handleAddPrice} />
                    </div>
                </div>
            </div>

        </>
    )
}
export default ProductPricing;