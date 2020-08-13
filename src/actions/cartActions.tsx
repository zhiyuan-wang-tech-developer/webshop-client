import { ItemType, ItemOrderType, CartActionType, FeedbackActionType } from "../utils/appTypes"
import {
    ADD_ITEM_INTO_CART,
    REMOVE_ITEM_FROM_CART,
    CLEAR_CART,
    INCREMENT_AMOUNT,
    DECREMENT_AMOUNT
} from '../constants/actionTypes'
import { Dispatch } from "redux"
import { RootStateType } from "../reducers/rootReducer"
import request from 'superagent'
import { decode } from 'jsonwebtoken'
import Config from '../configuration'
import { updateFeedback } from './feedbackActions'

const baseURL = Config.URL.LocalHostURL

// Action Creators
function addItemIntoCart(item: ItemOrderType): CartActionType {
    return {
        type: ADD_ITEM_INTO_CART,
        payload: { item }
    }
}

function removeItemFromCart(item: ItemOrderType): CartActionType {
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: { item }
    }
}

export function clearCart(): CartActionType {
    let item: ItemOrderType = {
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

function incrementAmount(item: ItemOrderType): CartActionType {
    return {
        type: INCREMENT_AMOUNT,
        payload: { item }
    }
}

function decrementAmount(item: ItemOrderType): CartActionType {
    return {
        type: DECREMENT_AMOUNT,
        payload: { item }
    }
}

// Thunk Action Functions
export function fetchCartItems() {
    return (dispatch: Dispatch<CartActionType | FeedbackActionType>, getState: () => RootStateType) => {
        const { tokenState } = getState()

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        const { id }: any = decode(tokenState.token)

        request
            .get(`${baseURL}/cart`)
            .set("Authorization", `Bearer ${tokenState.token}`)
            .send()
            .then((response: any) => {
                console.log(JSON.stringify(response.body))
                const { userId, shoppingCartItems } = response.body

                if (userId !== id) {
                    throw new Error("Returned user id is invalid!");
                }

                shoppingCartItems.forEach(
                    (cartItem: any) => {
                        const { id, name, price } = cartItem.inventoryItem
                        const { amount } = cartItem
                        let item: ItemOrderType = {
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
    return (dispatch: Dispatch<CartActionType | FeedbackActionType>, getState: () => RootStateType) => {
        const { inventoryState, tokenState } = getState()

        let item = inventoryState.items.find((item: ItemType) => item.id === itemId)

        if (!item) {
            console.warn(`Item #${itemId} does not exist!`)
            return
        }

        if (!tokenState.token) {
            console.warn("Token is not existing!")
            return
        }

        let { name, price } = item
        let itemOrder: ItemOrderType = { id: itemId, name, unitPrice: price, amount: 1, totalPrice: price }

        const { id }: any = decode(tokenState.token)

        request
            .post(`${baseURL}/cart/item`)
            .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
            .send({ itemId })
            .then((response: any) => {
                console.log(JSON.stringify(response.body))
                // const { userId, shoppingCartItems } = response.body
                const { userId } = response.body
                if (userId === id) {
                    dispatch(addItemIntoCart(itemOrder))
                }
                else {
                    throw new Error("Returned user id is invalid!");
                }
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function removeFromMyCart(itemId: number) {
    return (dispatch: Dispatch<CartActionType | FeedbackActionType>, getState: () => RootStateType) => {
        const { cartState, tokenState } = getState()
        const item = cartState.items.find((item: ItemOrderType) => item.id === itemId)
        if (item) {
            if (tokenState.token) {
                const { id }: any = decode(tokenState.token)
                request
                    .delete(`${baseURL}/cart/item`)
                    .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
                    .send({ itemId })
                    .then((response: any) => {
                        console.log(JSON.stringify(response.body))
                        // const { userId, shoppingCartItems } = response.body
                        const { userId } = response.body
                        if (userId === id) {
                            dispatch(removeItemFromCart(item))
                        }
                        else {
                            throw new Error("Returned user id is invalid!");
                        }
                    })
                    .catch((err) => {
                        console.error(err)
                        dispatch(updateFeedback(JSON.stringify(err)))
                    })
            }
            else {
                console.warn("Token is not existing!")
            }
        }
        else {
            console.warn(`Item #${itemId} does not exist!`)
        }
    }
}

export function clearMyCart() {
    return (dispatch: Dispatch<CartActionType | FeedbackActionType>, getState: () => RootStateType) => {
        const { tokenState } = getState()
        if (tokenState.token) {
            const { id }: any = decode(tokenState.token)
            request
                .delete(`${baseURL}/cart`)
                .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
                .send()
                .then((response: any) => {
                    console.log(JSON.stringify(response.body))
                    // const { userId, shoppingCartItems } = response.body
                    const { userId } = response.body
                    if (userId === id) {
                        dispatch(clearCart())
                    }
                    else {
                        throw new Error("Returned user id is invalid!");
                    }
                })
                .catch((err) => {
                    console.error(err)
                    dispatch(updateFeedback(JSON.stringify(err)))
                })
        }
        else {
            console.warn("Token is not existing!")
        }
    }
}

export function incrementAmountInMyCart(item: ItemOrderType) {
    return (dispatch: Dispatch<CartActionType | FeedbackActionType>, getState: () => RootStateType) => {
        const { tokenState } = getState()
        if (tokenState.token) {
            const { id }: any = decode(tokenState.token)
            request
                .put(`${baseURL}/cart/item`)
                .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
                .send({
                    itemId: item.id,
                    amount: item.amount + 1
                })
                .then((response: any) => {
                    console.log(JSON.stringify(response.body))
                    // const { userId, shoppingCartItems } = response.body
                    const { userId } = response.body
                    if (userId === id) {
                        dispatch(incrementAmount(item))
                    }
                    else {
                        throw new Error("Returned user id is invalid!");
                    }
                })
                .catch((err) => {
                    console.error(err)
                    dispatch(updateFeedback(JSON.stringify(err)))
                })
        }
        else {
            console.warn("Token is not existing!")
        }
    }
}

export function decrementAmountInMyCart(item: ItemOrderType) {
    return (dispatch: Dispatch<CartActionType | FeedbackActionType>, getState: () => RootStateType) => {
        const { tokenState } = getState()
        if (tokenState.token) {
            const { id }: any = decode(tokenState.token)
            request
                .put(`${baseURL}/cart/item`)
                .set("Authorization", `Bearer ${tokenState.token}`)     // set the request header 'Authorization'
                .send({
                    itemId: item.id,
                    amount: item.amount > 1 ? item.amount - 1 : item.amount
                })
                .then((response: any) => {
                    console.log(JSON.stringify(response.body))
                    // const { userId, shoppingCartItems } = response.body
                    const { userId } = response.body
                    if (userId === id) {
                        dispatch(decrementAmount(item))
                    }
                    else {
                        throw new Error("Returned user id is invalid!");
                    }
                })
                .catch((err) => {
                    console.error(err)
                    dispatch(updateFeedback(JSON.stringify(err)))
                })
        }
        else {
            console.warn("Token is not existing!")
        }
    }
}