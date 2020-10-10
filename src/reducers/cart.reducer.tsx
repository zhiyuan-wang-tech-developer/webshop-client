import { ItemOrder, CartState, CartAction } from "../utils/app.types"
import {
    ADD_ITEM_INTO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT
} from '../constants/action.types'

const initialState: CartState = {
    items: []
}

const cartReducer = (state = initialState, action: CartAction) => {
    switch (action.type) {
        case ADD_ITEM_INTO_CART:
            // console.log(JSON.stringify(action.payload))
            if (state.items.some((item: ItemOrder) => item.id === action.payload.item.id)) {
                // The item has been added into shopping cart
                return state
            }
            else {
                return {
                    items: [...state.items, action.payload.item]
                }
            }

        case REMOVE_ITEM_FROM_CART:
            return {
                items: state.items.filter((item: ItemOrder) => item.id !== action.payload.item.id)
            }

        case CLEAR_CART:
            return initialState

        case INCREMENT_AMOUNT: {
            let items = state.items.map((item: ItemOrder) => {
                if (item.id === action.payload.item.id) {
                    return {
                        ...item,
                        amount: item.amount + 1,
                        totalPrice: item.totalPrice + item.unitPrice
                    }
                }
                else {
                    return { ...item }
                }
            })
            return { items }
        }

        case DECREMENT_AMOUNT: {
            let items = state.items.map((item: ItemOrder) => {
                if (item.id === action.payload.item.id) {
                    return {
                        ...item,
                        amount: item.amount === 1 ? item.amount : item.amount - 1,
                        totalPrice: item.totalPrice === item.unitPrice ? item.totalPrice : item.totalPrice - item.unitPrice
                    }
                }
                else {
                    return { ...item }
                }
            })
            return { items }
        }

        default:
            return state
    }
}

export default cartReducer