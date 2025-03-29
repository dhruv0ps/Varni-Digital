import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { isDarkColor } from '../utilities/colorUtil';

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
    price: number; // price as number
    switchId?: string; // SwitchId for Icons
    color?: string
}

interface DroppedItem {
    iconType: string;
    switchId: string;
    iconId: string;
    divId: string;
    src: string;
    price: number
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

// Define the CartState interface
interface CartState {
    cartData: Cart | undefined;
    quantity: number;
    totalPrice: number;
    droppedItems: DroppedItem[];
    showCanvasBorder: boolean;
    closeIconColor: string;
    defaultFanImage: string;
    defaultRegulatorImage: string;
}

// Define the initial state using that type
const initialState: CartState = {
    cartData: {
        accessories: [],
        // For 12 Module
        accessories1: [],
        accessories2: [],
        icons: [],
        color: [],
    },
    quantity: 1,
    totalPrice: 0,
    droppedItems: [],
    showCanvasBorder: true,
    closeIconColor: 'FFF',
    defaultFanImage: '/icon/Icons80x80px/Fan/Fan Default.png',
    defaultRegulatorImage: '/icon/Icons80x80px/Dimmer/Dimmer Default.png',
};

// Helper function to calculate total price
const calculateTotalPrice = (cartData: Cart | undefined, quantity: number) => {
    if (!cartData) return 0;

    let total = 0;

    if (cartData.size) total += cartData.size.price;
    if (cartData.panel) total += cartData.panel.price;
    if (cartData.material) total += cartData.material.price;

    cartData.accessories.forEach(item =>
        item.options.forEach(option => (total += option.price))
    );
    cartData.icons.forEach(item =>
        item.options.forEach(option => (total += option.price))
    );
    cartData.color.forEach(item =>
        item.options.forEach(option => (total += option.price))
    );

    return total * quantity;
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add or update size
        addOrUpdateSize: (state, action: PayloadAction<Item>) => {
            if (state.cartData) {
                state.cartData.size = action.payload;
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        // Add or update panel
        addOrUpdatePanel: (state, action: PayloadAction<Item>) => {
            if (state.cartData) {
                state.cartData.panel = action.payload;
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        // Add or update material
        addOrUpdateMaterial: (state, action: PayloadAction<Item>) => {
            if (state.cartData) {
                state.cartData.material = action.payload;
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        // Add accessory
        addAccessory: (state, action: PayloadAction<{ optionType: string; option: Option }>) => {
            if (state.cartData) {
                const { optionType, option } = action.payload;
                const accessory = state.cartData.accessories.find(acc => acc.optionType === optionType);

                if (accessory) {
                    accessory.options.push(option);
                } else {
                    state.cartData.accessories.push({ optionType, options: [option] });
                }
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        // For 12 Module
        addAccessory1: (state, action: PayloadAction<{ optionType: string; option: Option }>) => {
            if (state.cartData) {
                const { optionType, option } = action.payload;
                const accessory = state.cartData.accessories1.find(acc => acc.optionType === optionType);

                if (accessory) {
                    accessory.options.push(option);
                } else {
                    state.cartData.accessories1.push({ optionType, options: [option] });
                }
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        addAccessory2: (state, action: PayloadAction<{ optionType: string; option: Option }>) => {
            if (state.cartData) {
                const { optionType, option } = action.payload;
                const accessory = state.cartData.accessories2.find(acc => acc.optionType === optionType);

                if (accessory) {
                    accessory.options.push(option);
                } else {
                    state.cartData.accessories2.push({ optionType, options: [option] });
                }
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },
        // For 12 Module

        // Remove accessory by option type and index
        removeAccessory: (state, action: PayloadAction<{ optionType: string; id: string }>) => {
            if (state.cartData) {
                const { optionType, id } = action.payload;

                // Remove from accessories
                const accessory = state.cartData.accessories.find(acc => acc.optionType === optionType);
                if (accessory) {
                    // Find the index of the option by id
                    const optionIndex = accessory.options.findIndex(option => option.id === id);
                    if (optionIndex !== -1) {
                        accessory.options.splice(optionIndex, 1);
                        // Remove accessory if no options are left
                        if (accessory.options.length === 0) {
                            state.cartData.accessories = state.cartData.accessories.filter(acc => acc.optionType !== optionType);
                        }
                        state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
                    }
                }

                // Remove from accessories1
                const accessory1 = state.cartData.accessories1?.find(acc => acc.optionType === optionType);
                if (accessory1) {
                    // Find the index of the option by id in accessories1
                    const optionIndex1 = accessory1.options.findIndex(option => option.id === id);
                    if (optionIndex1 !== -1) {
                        accessory1.options.splice(optionIndex1, 1);
                        // Remove accessory1 if no options are left
                        if (accessory1.options.length === 0) {
                            state.cartData.accessories1 = state.cartData.accessories1.filter(acc => acc.optionType !== optionType);
                        }
                        state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
                    }
                }

                // Remove from accessories2
                const accessory2 = state.cartData.accessories2?.find(acc => acc.optionType === optionType);
                if (accessory2) {
                    // Find the index of the option by id in accessories2
                    const optionIndex2 = accessory2.options.findIndex(option => option.id === id);
                    if (optionIndex2 !== -1) {
                        accessory2.options.splice(optionIndex2, 1);
                        // Remove accessory2 if no options are left
                        if (accessory2.options.length === 0) {
                            state.cartData.accessories2 = state.cartData.accessories2.filter(acc => acc.optionType !== optionType);
                        }
                        state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
                    }
                }
            }
        },

        resetAccessory: (state) => {
            state.cartData!.accessories = [];
            state.cartData!.accessories1 = [];
            state.cartData!.accessories2 = [];
            // Resetting Icons as Well
            state.cartData!.icons = [];
            state.droppedItems = [];
        },

        // Add icon
        addIcon: (state, action: PayloadAction<{ optionType: string; option: Option }>) => {
            if (state.cartData) {
                const { optionType, option } = action.payload;
                const icon = state.cartData.icons.find(ic => ic.optionType === optionType);

                if (icon) {
                    icon.options.push(option);
                } else {
                    state.cartData.icons.push({ optionType, options: [option] });
                }
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        // Remove icon by option type and index
        removeIcon: (state, action: PayloadAction<{ optionType: string; index: number }>) => {
            if (state.cartData) {
                const { optionType, index } = action.payload;
                const icon = state.cartData.icons.find(ic => ic.optionType === optionType);

                if (icon) {
                    icon.options.splice(index, 1);
                    if (icon.options.length === 0) {
                        state.cartData.icons = state.cartData.icons.filter(ic => ic.optionType !== optionType);
                    }
                    state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
                }
            }
        },

        removeIconFromDeletedAccessory: (state, action: PayloadAction<{ switchId: string }>) => {
            const { switchId } = action.payload;

            // 1. Find all droppedItems with matching switchId
            const droppedItemsWithSwitchId = state.droppedItems.filter(item => item.switchId === switchId);

            // 2. Iterate through each droppedItem with the matching switchId
            droppedItemsWithSwitchId.forEach(droppedItem => {
                // 3. Remove matching iconId from the icons options
                if (state.cartData && state.cartData.icons) {
                    state.cartData.icons.forEach(iconCategory => {
                        // Filter out the options that have an switchId that matches the switchId
                        iconCategory.options = iconCategory.options.filter(option => option.switchId !== switchId);

                        // If there are no options left in this category, remove the icon category
                        if (iconCategory.options.length === 0) {
                            if (state.cartData) {
                                state.cartData.icons = state.cartData?.icons.filter(category => category !== iconCategory);
                            }
                        }
                    });
                }
            });

            // 4. Now, remove the droppedItems with matching switchId
            state.droppedItems = state.droppedItems.filter(item => item.switchId !== switchId);

            // Recalculate the total price after modifications
            state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
        },

        // Add or Update color
        addOrUpdateColor: (state, action: PayloadAction<{ optionType: string; option: { id: string; item: string; price: number } }>) => {
            if (state.cartData) {
                const { optionType, option } = action.payload;

                // Changing Close Icon Color based on Material Color
                if ('color' in option && option.color) {
                    if (optionType === 'Material Color') {
                        // Assuming `isDarkColor` is a function that checks if a color is dark
                        state.closeIconColor = isDarkColor(option.color as string) ? 'FFF' : '242121';
                    }
                }

                // Find the color category
                const colorCategory = state.cartData.color.find(c => c.optionType === optionType);

                if (colorCategory) {
                    // Replace the existing option with the new one
                    colorCategory.options = [option]; // Ensure only one option is stored
                } else {
                    // Create a new color category with the new option, ensuring only one option
                    state.cartData.color.push({ optionType, options: [option] });
                }

                // Hide CanvasBorder
                state.showCanvasBorder = false;

                // Recalculate the total price
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        // Increase quantity
        increaseQuantity: (state, action: PayloadAction<{ qty?: number | undefined }>) => {
            const { qty } = action.payload;
            if (qty === undefined) {
                state.quantity += 1;
            }
            else {
                state.quantity = qty;
            }
            state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
        },

        // Decrease quantity (but not below 1)
        decreaseQuantity: (state) => {
            if (state.quantity > 1) {
                state.quantity -= 1;
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

        // Invokes when user comes to Color Step
        hideCanvasBorder(state) {
            state.showCanvasBorder = false;
        },

        addDroppedItem(state, action: PayloadAction<DroppedItem>) {
            state.droppedItems.push(action.payload);
        },

        removeDroppedItem(state, action: PayloadAction<{ divId: string; switchId: string; iconId: string }>) {
            const { divId, switchId, iconId } = action.payload;
            state.droppedItems = state.droppedItems.filter(
                item => !(item.divId === divId && item.switchId === switchId && item.iconId === iconId)
            );
        },

        removeAllDroppedIcon(state) {
            state.droppedItems = [];
        },

        clearCartItem: (state, action: PayloadAction<string>) => {
            if (state.cartData) {
                const itemType = action.payload;
                switch (itemType) {
                    case "Size":
                        state.cartData.size = undefined; // Clear the size item
                        break;
                    case "Panel":
                        state.cartData.panel = undefined; // Clear the panel item
                        break;
                    case "Material":
                        state.cartData.material = undefined; // Clear the material item
                        break;
                    case "Accessories":
                        // Clear all accessories
                        state.cartData.accessories = [];
                        state.cartData.accessories1 = [];
                        state.cartData.accessories2 = [];
                        // Clear icons
                        state.cartData.icons = [];
                        state.droppedItems = [];
                        break;
                    case "Icons":
                        // Clear icons
                        state.cartData.icons = [];
                        state.droppedItems = [];
                        break;
                    case "Color":
                        // Clear color
                        state.cartData.color = [];
                        state.showCanvasBorder = true;
                        break;
                    case "Cart":
                        // Clear All
                        state.cartData.size = undefined; // Clear the size item
                        state.cartData.panel = undefined; // Clear the panel item
                        state.cartData.material = undefined; // Clear the material item
                        // Clear all accessories
                        state.cartData.accessories = [];
                        state.cartData.accessories1 = [];
                        state.cartData.accessories2 = [];
                        state.cartData.icons = [];
                        // Clear icons
                        state.droppedItems = [];
                        state.cartData.color = [];
                        // Show Canvas Border
                        state.showCanvasBorder = true;
                        state.quantity = 1;
                        break;
                    default:
                        console.error("Unknown cart item type:", itemType);
                }

                // Recalculate total price after clearing items
                state.totalPrice = calculateTotalPrice(state.cartData, state.quantity);
            }
        },

    },
});

// Export the actions and reducer
export const {
    addOrUpdateSize,
    addOrUpdatePanel,
    addOrUpdateMaterial,
    addAccessory,
    addAccessory1,
    addAccessory2,
    removeAccessory,
    resetAccessory,
    addIcon,
    removeIcon,
    removeIconFromDeletedAccessory,
    addOrUpdateColor,
    increaseQuantity,
    decreaseQuantity,
    addDroppedItem,
    removeDroppedItem,
    removeAllDroppedIcon,
    clearCartItem,
    hideCanvasBorder,
} = cartSlice.actions;

export default cartSlice.reducer;
