import { ADD_NEW_ITEM, UPDATE_ITEMS } from "../constants/actionTypes";
import { Item, InventoryState, InventoryAction } from "../utils/appTypes";

const initialState: InventoryState = {
    items: new Array<Item>(0)
}

const itemsReducer = (state = initialState, action: InventoryAction): InventoryState => {
    switch (action.type) {
        case UPDATE_ITEMS:
            return {
                items: [...action.payload.items]
            };

        case ADD_NEW_ITEM:
            return {
                items: [...state.items, ...action.payload.items]
            };

        default:
            return state;
    }
}

export default itemsReducer
