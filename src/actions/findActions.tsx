import { Response, get } from 'superagent'
import { FoundResultAction, Item } from '../utils/appTypes'
import { UPDATE_FOUND_RESULTS, CLEAR_FOUND_RESULTS } from '../constants/actionTypes'
import { urlItemsFind, urlItems, RESULTS_PER_PAGE } from '../constants/config'
import { Dispatch } from 'react'

// action creator
function updateResults(items: Item[], count: number, offset: number, limit: number): FoundResultAction {
    console.log('updateResults offset: ', offset)
    const currentPage = offset < limit ? 1 : Math.ceil(offset / limit)
    const totalPages = count < limit ? 1 : Math.ceil(count / limit)
    console.log('updateResults currentPage-j: ', currentPage)
    return {
        type: UPDATE_FOUND_RESULTS,
        payload: {
            result: {
                items: [...items],
                itemsTotalCount: count,
                currentPage,
                totalPages
            }
        }
    }
}

function clearResults(): FoundResultAction {
    return {
        type: CLEAR_FOUND_RESULTS,
    }
}

export function findResults(queryParams: any = {}, page: number = 1) {
    const offset = RESULTS_PER_PAGE * (page - 1)
    const limit = RESULTS_PER_PAGE
    return (dispatch: Dispatch<FoundResultAction>) => {
        get(`${urlItemsFind}`)
            .query(queryParams)
            .query({ offset })
            .query({ limit })
            .then((response: Response) => {
                const { items, count } = response.body
                if (!items) {
                    throw new Error("Can not find items!");
                }
                dispatch(updateResults(items, count, offset, limit))
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