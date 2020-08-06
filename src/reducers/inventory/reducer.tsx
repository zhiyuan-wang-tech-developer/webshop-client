import { UPDATE_ITEMS, ADD_NEW_ITEM } from "./actions";
import { ItemType } from "../../components/Types/CustomTypes"

interface InventoryStateType {
    items: ItemType[]
}

export interface InventoryActionType {
    type: string,
    payload: { items: ItemType[] }
}

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
