import { Response, get } from 'superagent'
import { FoundResultAction, Item, SortOrder } from '../utils/appTypes'
import { UPDATE_FOUND_RESULTS, CLEAR_FOUND_RESULTS } from '../constants/actionTypes'
import { urlItemsFind, urlItems, RESULTS_PER_PAGE } from '../constants/config'
import { Dispatch } from 'react'

// action creator
function updateResults(itemsTotal: number, pageItems: Item[], pageCurrent: number, pageTotal: number): FoundResultAction {
    return {
        type: UPDATE_FOUND_RESULTS,
        payload: {
            result: {
                itemsTotal,
                pageItems: [...pageItems],
                pageCurrent,
                pageTotal
            }
        }
    }
}

function clearResults(): FoundResultAction {
    return {
        type: CLEAR_FOUND_RESULTS,
    }
}

export function findResults(queryParams: any = {}, page: number = 1, sortColumn: string = 'id', sortOrder: SortOrder = SortOrder.ASCEND) {
    const limit = RESULTS_PER_PAGE
    return (dispatch: Dispatch<FoundResultAction>) => {
        get(`${urlItemsFind}`)
            .query(queryParams)
            .query({ limit, page })
            .query({ sortColumn, sortOrder })
            .then((response: Response) => {
                const { itemsTotal, pageItems, pageCurrent, pageTotal } = response.body
                if (!pageItems) {
                    throw new Error("Can not find items!");
                }
                dispatch(updateResults(itemsTotal, pageItems, pageCurrent, pageTotal))
            })
            .catch(error => console.warn(error))
    }
}

export function findResultsOnCurrentPage(itemId: number) {
    console.log('findResultsOnCurrentPage called')
    return (dispatch: Dispatch<FoundResultAction>) => {
        get(`${urlItems}`)
            .then((response: Response) => {
                const { items } = response.body
                if (!items) {
                    throw new Error("Can not find items!");
                }
                const index = items.findIndex((item: any) => item.id == itemId)
                console.log('findResultsOnCurrentPage index: ', index)
                const currentPage = Math.ceil(index / RESULTS_PER_PAGE)
                console.log('findResultsOnCurrentPage currentPage: ', currentPage)
                const offset = RESULTS_PER_PAGE * (currentPage - 1)
                console.log('findResultsOnCurrentPage offset: ', offset)
                findResults({}, currentPage)(dispatch)
            })
            .catch(error => console.warn(error))
    }
}