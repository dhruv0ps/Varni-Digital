import { useSelector } from "react-redux";
import { RootState } from "../store/store";

// Define the item interface
interface Item {
    id: string;
    item: string;
    price: number; // price as number
}

// Define the option interface for accessories, icons, and color
interface Option {
    id: string;
    item: string;
    price: number;
    color?: string 
}

// Define the cart interface
interface Cart {
    size?: Item;
    panel?: Item;
    material?: Item;
    accessories: {
        optionType: string;
        options: Option[];
    }[];
    accessories1: {
        optionType: string;
        options: Option[];
    }[];
    accessories2: {
        optionType: string;
        options: Option[];
    }[];
    icons: {
        optionType: string;
        options: Option[];
    }[];
    color: {
        optionType: string;
        options: Option[];
    }[];
}

const OrderSummary = () => {

    const cartData = useSelector((state: RootState) => state.cartData.cartData);
    const totalPrice = useSelector((state: RootState) => state.cartData.totalPrice);
    const totalQty = useSelector((state: RootState) => state.cartData.quantity);

    const displayOrder = ['panel', 'material', 'size', 'accessories', 'icons', 'color'];

    return (
        <div id="order-summary-area" className="flex flex-col gap-2 p-5 bg-white rounded-xl shadow-lg w-full max-w-md mx-auto mb-4 orderSummary-shadow">
            {/* Order Summary Header */}
            <div className="inline-flex justify-between items-center text-gray-600">
                <span className="text-xl font-bold">Order Summary</span>
            </div>

            {/* List of items with dynamic content */}
            <div className="flex-grow">
                {cartData && displayOrder.map((key) => {
                    // Only render the item if the key exists in cartData
                    const data = cartData[key as keyof Cart];

                    // Skip if the key does not exist in the cartData or if the data is empty (ignore empty objects/arrays)
                    if (!data || (Array.isArray(data) && data.length === 0) || (typeof data === 'object' && Object.keys(data).length === 0)) {
                        return null;
                    }

                    // Capitalize the first letter of the key for formatting
                    const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);

                    // Check if the item is an object (e.g., size, panel, material)
                    if (typeof data === 'object' && !Array.isArray(data)) {
                        return (
                            <div className="flex flex-wrap justify-between items-center gap-2 text-sm text-gray-800 mb-3" key={key}>
                                {/* Item Name takes full width */}
                                <span className="text-xs text-gray-500 w-full leading-none">
                                    {formattedKey}
                                </span>

                                {/* Next row with Medium Sized Bold Text and number with justify-between */}
                                <div className="flex justify-between items-center w-full leading-3">
                                    <span className="font-medium text-gray-800">{data.item}</span>
                                    {/* <span className="font-medium text-gray-800 text-right">{data.price * totalQty}</span> */}
                                </div>
                            </div>
                        );
                    }

                    // Handle arrays (e.g., accessories, icons, color)
                    if (Array.isArray(data)) {
                        return (
                            <div key={key} className="w-full leading-none mb-2">
                                {/* Display the section name (Color, Accessories, or Icons) */}
                                <span className="text-xs text-gray-500 w-full">{formattedKey}</span>

                                {/* Map through each item in the array */}
                                {data.map((item, index) => {
                                    // Sum up the prices of all options
                                    const totalPrice = item.options.reduce((acc, option) => acc + option.price, 0);

                                    // For `color` and `accessories`, show the option type and the count of options
                                    const optionsText = item.options.map(option => option.item).join(' | ');

                                    // For `icons`, instead of showing optionsText, show the count of options
                                    const optionsCount = item.options.length;

                                    return (
                                        <div key={index} className="flex justify-between items-center gap-2 text-sm text-gray-800 mb-1">
                                            <div className="flex justify-between w-full leading-4">
                                                {/* Show the options count for icons */}
                                                <span className="font-medium text-gray-800 break-words">
                                                    {formattedKey === 'Icons'
                                                        ? `${item.optionType} | ${optionsCount} Icons`
                                                        : `${item.optionType} | ${optionsText}`}
                                                </span>

                                                {/* Total price */}
                                                {/* <span className="font-medium text-gray-800 text-right">{totalPrice * totalQty}</span> */}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    }
                    return null; // Return nothing if it's not an object or array
                })}
            </div>

            {/* Line separator */}
            <div className="border-t border-gray-300 my-3 w-full" />

            {/* Total Text */}
            <div className="flex justify-between items-center w-full">
                <span className="text-lg text-gray-500 font-light">Total</span>
                <span className="font-bold text-lg text-gray-800">{`₹ ${totalPrice}`}</span>
            </div>
        </div>
    );
}

export default OrderSummary;