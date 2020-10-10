import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../../../reducer/root.reducer'
import PaginationBar from './pagination.bar'
import FindResultsTable from './find.results.table'
import { Item, SortOrder } from '../../../utils/app.types'
import Button from '@material-ui/core/Button'

type FindResultsContainerProps = {
    items: Item[],
    update: (item: Item) => void
    delete: (itemId: number) => void
    sort: (sortPage: number, sortColumn: string, sortOrder: SortOrder) => void
}

type SortConfig = {
    column: string,
    order: SortOrder
}

export default function FindResultsContainer(props: FindResultsContainerProps) {

    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
    const pageCurrent = useTypedSelector(state => state.foundResult.pageCurrent)
    const pageTotal = useTypedSelector(state => state.foundResult.pageTotal)

    const [sortConfig, setSortConfig] = useState<SortConfig>({ column: 'id', order: SortOrder.ASCEND })

    const [pageSelected, setPageSelected] = useState<number>(pageCurrent)

    const toggleSort = (sortColumn: string) => {
        setSortConfig({
            column: sortColumn,
            order: sortConfig.order === SortOrder.ASCEND ? SortOrder.DESCEND : SortOrder.ASCEND
        })
    }

    useEffect(() => {
        // if (window.location.search) {
        //     return
        // }
        props.sort(pageSelected, sortConfig.column, sortConfig.order)
    }, [sortConfig, pageSelected])

    const SortButton = (sortColumn: string, buttonName: string): JSX.Element => (
        <Button
            variant='contained'
            size='small'
            name={sortColumn}
            onClick={() => toggleSort(sortColumn)}
        >
            {buttonName}
        </Button>
    )

    return (
        <Container fluid style={{ paddingTop: 25 }}>
            <FindResultsTable
                items={props.items}
                update={props.update}
                delete={props.delete}
                sortButton={SortButton}
            />
            <PaginationBar
                pageCurrent={pageCurrent}
                pageTotal={pageTotal}
                selectPage={setPageSelected}
            />
        </Container>
    )
}

