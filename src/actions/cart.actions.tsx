import request, { Response } from 'superagent'
import { Dispatch } from "redux"
import { decode } from 'jsonwebtoken'
import { RootState } from "../reducer/root.reducer"
import { updateFeedback } from './feedback.actions'
import { Item, ItemOrder, CartAction, FeedbackAction } from "../utils/app.types"
import {
    ADD_ITEM_INTO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT
} from '../constants/action.types'
import { urlCart, urlCartItem } from '../constants/config'

// Action Creators
function addItemIntoCart(item: ItemOrder): CartAction {
    return {
        type: ADD_ITEM_INTO_CART,
        payload: { item }
    }
}

function removeItemFromCart(item: ItemOrder): CartAction {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: { item }
    }
}

export function clearCart(): CartAction {
    let item: ItemOrder = {
        id: 0,
        name: "",
        unitPrice: 0,
        amount: 0,
        totalPrice: 0
    }
    return {
        type: CLEAR_CART,
        payload: { item }
    }
}

function incrementAmount(item: ItemOrder): CartAction {
    return {
        type: INCREMENT_AMOUNT,
        payload: { item }
    }
}

function decrementAmount(item: ItemOrder): CartAction {
    return {
        type: DECREMENT_AMOUNT,
        payload: { item }
    }
}

// Thunk Action Functions
export function fetchCartItems() {
    return (dispatch: Dispatch<CartAction | FeedbackAction>, getState: () => RootState) => {
        const { token: tokenState } = getState()

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        const { id }: any = decode(tokenState.token)

        request
            .get(urlCart)
            .set("Authorization", `Bearer ${tokenState.token}`)
            .send()
            .then((response: Response) => {
                // console.log(JSON.stringify(response.body))
                const { userId, shoppingCartItems } = response.body
                if (userId !== id) {
                    throw new Error("Returned user id is invalid!");
                }
                shoppingCartItems.forEach(
                    (cartItem: any) => {
                        const { id, name, price } = cartItem.inventoryItem
                        const { amount } = cartItem
                        let item: ItemOrder = {
                            id,
                            name,
                            unitPrice: price,
                            amount,
                            totalPrice: price * amount
                        }
                        dispatch(addItemIntoCart(item))
                    }
                )
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function addToMyCart(itemId: number) {
    return (dispatch: Dispatch<CartAction | FeedbackAction>, getState: () => RootState) => {
        const { inventory: inventoryState, token: tokenState } = getState()

        let item = inventoryState.items.find((item: Item) => item.id === itemId)

        if (!item) {
            console.warn(`Item ${itemId} does not exist!`)
            return
        }

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        let { name, price } = item
        let itemOrder: ItemOrder = { id: itemId, name, unitPrice: price, amount: 1, totalPrice: price }

        const { id }: any = decode(tokenState.token)

        request
            .post(urlCartItem)
            .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
            .send({ itemId })
            .then((response: Response) => {
                // const { userId, shoppingCartItems } = response.body
                const { userId } = response.body
                if (userId !== id) {
                    throw new Error("Returned user id is invalid!");
                }
                dispatch(addItemIntoCart(itemOrder))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function removeFromMyCart(itemId: number) {
    return (dispatch: Dispatch<CartAction | FeedbackAction>, getState: () => RootState) => {
        const { cart: cartState, token: tokenState } = getState()
        const item = cartState.items.find((item: ItemOrder) => item.id === itemId)

        if (!item) {
            console.warn(`Item ${itemId} does not exist!`)
            return
        }

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        const { id }: any = decode(tokenState.token)

        request
            .delete(urlCartItem)
            .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
            .send({ itemId })
            .then((response: Response) => {
                // const { userId, shoppingCartItems } = response.body
                const { userId } = response.body
                if (userId !== id) {
                    throw new Error("Returned user id is invalid!");
                }
                dispatch(removeItemFromCart(item))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function clearMyCart() {
    return (dispatch: Dispatch<CartAction | FeedbackAction>, getState: () => RootState) => {
        const { token: tokenState } = getState()

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        const { id }: any = decode(tokenState.token)

        request
            .delete(urlCart)
            .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
            .send()
            .then((response: Response) => {
                // const { userId, shoppingCartItems } = response.body
                const { userId } = response.body
                if (userId !== id) {
                    throw new Error("Returned user id is invalid!");
                }
                dispatch(clearCart())
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function incrementAmountInMyCart(item: ItemOrder) {
    return (dispatch: Dispatch<CartAction | FeedbackAction>, getState: () => RootState) => {
        const { token: tokenState } = getState()

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        const { id }: any = decode(tokenState.token)

        request
            .put(urlCartItem)
            .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
            .send({
                itemId: item.id,
                amount: item.amount + 1
            })
            .then((response: Response) => {
                // const { userId, shoppingCartItems } = response.body
                const { userId } = response.body
                if (userId !== id) {
                    throw new Error("Returned user id is invalid!");
                }
                dispatch(incrementAmount(item))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function decrementAmountInMyCart(item: ItemOrder) {
    return (dispatch: Dispatch<CartAction | FeedbackAction>, getState: () => RootState) => {
        const { token: tokenState } = getState()

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        const { id }: any = decode(tokenState.token)

        request
            .put(urlCartItem)
            .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
            .send({
                itemId: item.id,
                amount: item.amount > 1 ? item.amount - 1 : item.amount
            })
            .then((response: Response) => {
                // const { userId, shoppingCartItems } = response.body
                const { userId } = response.body
                if (userId !== id) {
                    throw new Error("Returned user id is invalid!");
                }
                dispatch(decrementAmount(item))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}