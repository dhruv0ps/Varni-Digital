import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { increaseQuantity } from '../../slices/cartSlice';

interface CounterButtonProps {
    label?: string; // Optional text to display next to the counter
}

const CounterButton: React.FC<CounterButtonProps> = ({ label = 'Quantity' }) => {
    const dispatch = useDispatch();
    const cartCount = useSelector((state: RootState) => state.cartData.quantity);

    // Local state to handle manual input
    const [inputValue, setInputValue] = useState(cartCount.toString());
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // Handle increment
    const increment = () => {
        const newValue = cartCount + 1;
        dispatch(increaseQuantity({ qty: newValue }));
        setInputValue(newValue.toString()); // Immediately update input value
    };

    // Handle decrement
    const decrement = () => {
        const newValue = cartCount - 1;
        if (newValue > 0) {
            dispatch(increaseQuantity({ qty: newValue }));
            setInputValue(newValue.toString()); // Immediately update input value
        }
    };

    // Handle manual input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.trim();

        // If input is empty, set inputValue to "" and leave cartCount unchanged
        if (newValue === '') {
            setInputValue('');
        } else {
            setInputValue(newValue);
        }
    };

    // Update quantity after a delay
    useEffect(() => {
        if (timer) {
            clearTimeout(timer); // Clear the previous timeout if user is still typing
        }

        // Set a new timeout to update the quantity after 1 second
        const newTimer = setTimeout(() => {
            let newValue = inputValue.trim();

            // If input is empty after the delay, set it to '1' and dispatch it
            if (newValue === '') {
                setInputValue('1'); // Show '1' in the input field immediately
                newValue = '1'; // Update Redux state with 1
            }

            const parsedValue = parseInt(newValue, 10);
            if (!isNaN(parsedValue) && parsedValue >= 0) {
                dispatch(increaseQuantity({ qty: parsedValue }));
            }

        }, 1000); // 1 second delay

        setTimer(newTimer); // Store the timer ID

        return () => {
            // Cleanup the timeout on unmount or before setting a new one
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [inputValue, cartCount, dispatch]); // Effect depends on inputValue and cartCount

    // Dynamically calculate input width based on the number of digits
    const inputWidth = Math.max(3, cartCount.toString().length) + 1; // Ensure it never gets too small

    return (
        <div className="flex items-center justify-between border border-gray-800 text-black font-bold rounded-lg sm:px-2 sm:py-0 lg:px-3 lg:py-1 space-x-2 focus:outline-none hover:border-gray-800">
            {/* Label */}
            <span>{label}</span>

            {/* Minus Button */}
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    decrement();
                }}
                className="lg:px-2 sm:px-1 sm:text-1xl lg:text-2xl cursor-pointer select-none"
            >
                -
            </span>

            {/* Editable Counter Input */}
            <input
                type="text" // Change to text to allow all valid numeric inputs
                value={inputValue}
                onChange={handleChange}
                className="text-center bg-transparent border-none focus:outline-none text-lg"
                min="0"
                style={{ width: `${inputWidth}ch` }} // Set width dynamically based on content
            />

            {/* Plus Button */}
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    increment();
                }}
                className="lg:px-2 sm:px-1 sm:text-1xl lg:text-2xl cursor-pointer select-none"
            >
                +
            </span>
        </div>
    );
};

export default CounterButton;
