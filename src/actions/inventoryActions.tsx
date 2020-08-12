import request from 'superagent'
import { Dispatch } from 'redux'
import { ItemType, FeedbackActionType, InventoryActionType } from '../utils/customTypes'
import { ADD_NEW_ITEM, UPDATE_ITEMS } from '../constants/actionTypes'
import Config from '../configuration'
import { updateFeedback } from './feedbackActions'

const baseURL = Config.URL.LocalHostURL

// action creators
function addNewItem(item: ItemType): InventoryActionType {
    return {
        type: ADD_NEW_ITEM,
        payload: { items: [item] }
    }
}

function updateItems(items: ItemType[]): InventoryActionType {
    return {
        type: UPDATE_ITEMS,
        payload: { items }
    }
}

// thunk action functions
export function fetchItems() {
    return (dispatch: Dispatch<InventoryActionType | FeedbackActionType>) => {
        request
            .get(`${baseURL}/items`)
            .then((response: any) => {
                // console.log(`fetch: ${JSON.stringify(response.body)}`)
                dispatch(updateItems(response.body.items))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function createItem(itemToCreate: ItemType) {
    return (dispatch: Dispatch<InventoryActionType | FeedbackActionType>) => {
        // console.log(itemToCreate)
        request
            .post(`${baseURL}/items`)
            .set('content-type', 'application/json')
            .send(itemToCreate)
            .then((response: any) => {
                // console.log(JSON.stringify(response.body))
                if (response.body.createdItem) {
                    dispatch(addNewItem(response.body.createdItem))
                }
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function updateItem(itemToUpdate: ItemType) {
    return (dispatch: Dispatch<InventoryActionType | FeedbackActionType>, getState: any) => {
        console.log(`Updating item #${itemToUpdate.id}`)
        request
            .put(`${baseURL}/items/${itemToUpdate.id}`)
            .set('content-type', 'application/json')
            .send(itemToUpdate)
            .then((response: any) => {
                // console.log(JSON.stringify(response.body))
                if (response.body.updatedItem) {
                    const { inventoryState } = getState()
                    const updatedItems: ItemType[] = inventoryState.items.map((item: ItemType) => {
                        if (item.id === itemToUpdate.id) {
                            return itemToUpdate     // return updated item
                        }
                        return item    // return original item
                    })
                    dispatch(updateItems(updatedItems))
                }
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function deleteItem(id: number) {
    return (dispatch: Dispatch<InventoryActionType | FeedbackActionType>, getState: any) => {
        console.log(`Deleting item #${id}`)
        request
            .delete(`${baseURL}/items/${id}`)
            .then((response: any) => {
                console.log(JSON.stringify(response.body))
                if (response.body.itemIsDeleted) {
                    const { inventoryState } = getState()
                    const updatedItems: ItemType[] = inventoryState.items.filter((item: ItemType) => item.id !== id)
                    dispatch(updateItems(updatedItems))
                }
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}