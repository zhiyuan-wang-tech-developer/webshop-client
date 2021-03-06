import request, { Response } from 'superagent'
import { Dispatch } from 'redux'
import { urlItems } from '../constants/config'
import { RootState } from "../reducer/root.reducer"
import { updateFeedback } from './feedback.actions'
import { Item, FeedbackAction, InventoryAction } from '../utils/app.types'
import { ADD_NEW_ITEM, UPDATE_ITEMS } from '../constants/action.types'

// action creators
function addNewItem(item: Item): InventoryAction {
    return {
        type: ADD_NEW_ITEM,
        payload: { items: [item] }
    }
}

function updateItems(items: Item[]): InventoryAction {
    return {
        type: UPDATE_ITEMS,
        payload: { items }
    }
}

// thunk action functions
export function fetchItems() {
    return (dispatch: Dispatch<InventoryAction | FeedbackAction>) => {
        request
            .get(urlItems)
            .then((response: Response) => {
                // console.log(`fetch: ${JSON.stringify(response.body)}`)
                if (!response.body.items) {
                    throw new Error("Can not get items!");
                }
                dispatch(updateItems(response.body.items))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function createItem(itemToCreate: Item) {
    return (dispatch: Dispatch<InventoryAction | FeedbackAction>) => {
        request
            .post(urlItems)
            .set('content-type', 'application/json')
            .send(itemToCreate)
            .then((response: Response) => {
                if (!response.body.createdItem) {
                    throw new Error("Can not get the created item!");
                }
                dispatch(addNewItem(response.body.createdItem))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function updateItem(itemToUpdate: Item) {
    return (dispatch: Dispatch<InventoryAction | FeedbackAction>, getState: () => RootState) => {
        // console.log(`Updating item ${itemToUpdate.id}`)
        request
            .put(urlItems + `/${itemToUpdate.id}`)
            .set('content-type', 'application/json')
            .send(itemToUpdate)
            .then((response: Response) => {
                if (!response.body.updatedItem) {
                    throw new Error("Can not get the updated item!");
                }
                const { inventory: inventoryState } = getState()
                const updatedItems: Item[] = inventoryState.items.map((item: Item) => {
                    if (item.id === itemToUpdate.id) {
                        return itemToUpdate         // return updated item
                    }
                    return item                     // return original item
                })
                dispatch(updateItems(updatedItems))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}

export function deleteItem(itemId: number) {
    return (dispatch: Dispatch<InventoryAction | FeedbackAction>, getState: () => RootState) => {
        // console.log(`Deleting item ${itemId}`)
        request
            .delete(urlItems + `/${itemId}`)
            .then((response: Response) => {
                if (!response.body.itemIsDeleted) {
                    throw new Error("Can not delete this item!");
                }
                const { inventory: inventoryState } = getState()
                const updatedItems: Item[] = inventoryState.items.filter((item: Item) => item.id !== itemId)
                dispatch(updateItems(updatedItems))
            })
            .catch((err) => {
                console.error(err)
                dispatch(updateFeedback(JSON.stringify(err)))
            })
    }
}