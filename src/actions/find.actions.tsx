import { Response, get } from 'superagent'
import { FoundResultAction, Item, SortOrder } from '../utils/app.types'
import { UPDATE_FOUND_RESULTS, CLEAR_FOUND_RESULTS } from '../constants/action.types'
import { urlItemsFind, RESULTS_PER_PAGE, urlItemsFindPage } from '../constants/config'
import { Dispatch } from 'redux'

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

export function findResultsOnPage(queryParams: any = {}, sortColumn: string = 'id', sortOrder: SortOrder = SortOrder.ASCEND) {
    return (dispatch: Dispatch<FoundResultAction>) => {
        get(`${urlItemsFindPage}`)
            .query(queryParams)
            .query({ limit: RESULTS_PER_PAGE })
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