import React, { ChangeEvent } from 'react'
import { Pagination } from '@material-ui/lab'


type PaginationBarProps = {
    pageCurrent: number,
    pageTotal: number,
    selectPage: (page: number) => void
}

const PaginationBar = (props: PaginationBarProps) => {
    return (
        <Pagination
            color='primary'
            variant='outlined'
            shape='rounded'
            showFirstButton
            showLastButton
            page={props.pageCurrent}
            count={props.pageTotal}
            onChange={(event: ChangeEvent<unknown>, page: number) => {
                props.selectPage(page)
            }}
        />
    )
}

export default PaginationBar