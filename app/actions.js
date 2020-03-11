export const ITEMS_AVAILABLE = 'ITEMS_AVAILABLE';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';

export const addItems = (items) => ({
    type: ITEMS_AVAILABLE,
    data: {items}
});

export const addItem = (item) => ({
    type: ADD_ITEM,
    data: {item}
});

export const updateItem = (item) => ({
    type: UPDATE_ITEM,
    data: {item}
});

export const deleteItem = (id) => ({
    type: DELETE_ITEM,
    data: {id}
});