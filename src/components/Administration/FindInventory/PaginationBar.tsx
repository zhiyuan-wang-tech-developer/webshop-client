import React, { ChangeEvent, useState } from 'react'
import { Pagination } from '@material-ui/lab'
import { useSelector, useDispatch, TypedUseSelectorHook, shallowEqual } from 'react-redux'
import { RootState } from '../../../reducer/rootReducer'
import { findResults } from '../../../actions/findActions'

const PaginationBar = () => {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
    const pageCurrent = useTypedSelector(state => state.foundResultState.currentPage)
    const pageTotal = useTypedSelector(state => state.foundResultState.totalPages)
    const [pageSelected, setPageSelected] = useState(pageCurrent)
    const dispatch = useDispatch()
    const refreshPage = (page: number) => {
        // console.log('page: ', page)
        findResults({}, page)(dispatch)
    }
    return (
        <Pagination
            color='primary'
            variant='outlined'
            shape='rounded'
            showFirstButton
            showLastButton
            page={pageSelected}
            count={pageTotal}
            onChange={(event: ChangeEvent<unknown>, page: number) => {
                refreshPage(page)
                setPageSelected(page)
            }}
        />
    )
}

export default PaginationBar