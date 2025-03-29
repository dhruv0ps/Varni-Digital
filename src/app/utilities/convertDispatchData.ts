export const transformDataForCard = (data: any, id?: string | undefined) => {

    const entries = Object.entries(data);

    // Check if entries are available
    if (!entries.length) {
        throw new Error('No entries found in the data object.');
    }

    const [itemName, itemValue] = entries[0] as [string, any];

    // Check for required values
    if (!data.id) {
        throw new Error('ID is required and not found.');
    }
    if (itemValue === undefined || itemValue === null) {
        throw new Error('Item value is required and not found.');
    }
    if (typeof data.price === 'undefined') {
        throw new Error('Price is required and not found.');
    }
    if (id === undefined)
        return {
            id: data.id, // Map id directly
            item: itemValue,
            price: data.price, // Map price directly
            color: data.color,
        };
    else {
        return {
            id: id, // Map id directly
            item: itemValue,
            price: data.price, // Map price directly
            color: data.color,
        };
    }
};
