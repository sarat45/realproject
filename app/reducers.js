import { combineReducers } from 'redux';

import { ITEMS_AVAILABLE, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./actions" 

let dataState = { items: [] };

const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            let { item } = action.data;

            let clone = JSON.parse(JSON.stringify(state.items));

            clone.unshift(item); 

            return {...state, items: clone};

        case ITEMS_AVAILABLE:
            let { items } = action.data;

            return {...state, items};

        case UPDATE_ITEM:{
            let { item } = action.data;
            let clone = JSON.parse(JSON.stringify(state.items));
            const index = clone.findIndex((obj) => obj.id === item.id);
            if (index !== -1) clone[index] = item;

            return {...state, items: clone};
        }

        case DELETE_ITEM:{
            let { id } = action.data;
            let clone = JSON.parse(JSON.stringify(state.items));
            const index = clone.findIndex((obj) => obj.id === id);
            if (index !== -1) clone.splice(index, 1);

            return {...state, items: clone};
        }

        default:
            return state;
    }
};

const rootReducer = combineReducers({dataReducer});

export default rootReducer;
