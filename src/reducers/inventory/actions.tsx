import request from 'superagent'
import { Dispatch } from 'redux'
import { ItemType } from '../../components/Types/CustomTypes'
import { InventoryActionType } from './reducer'
import Config from '../../configuration'
import { updateFeedback } from '../feedback/actions'
import { FeedbackActionType } from '../feedback/reducer'

const baseURL = Config.URL.LocalHostURL

// action type
export const UPDATE_ITEMS = "UPDATE_ITEMS";
// action creator
function updateItems(items: ItemType[]): InventoryActionType {
    return {
        type: UPDATE_ITEMS,
        payload: { items }
    }
}
// thunk action function
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

// action type
export const ADD_NEW_ITEM = "ADD_NEW_ITEM";
// action creator
function addNewItem(item: ItemType): InventoryActionType {
    return {
        type: ADD_NEW_ITEM,
        payload: { items: [item] }
    }
}
// thunk action function
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

// thunk action function
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

// thunk action function
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