import { ADD_NEW_ITEM, UPDATE_ITEMS } from "../constants/actionTypes";
import { ItemType, InventoryStateType, InventoryActionType } from "../utils/appTypes";

const initialState: InventoryStateType = {
    items: new Array<ItemType>(0)
}

const itemsReducer = (state = initialState, action: InventoryActionType): InventoryStateType => {
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
