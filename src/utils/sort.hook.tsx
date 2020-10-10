import React from "react"

export enum SortDirection {
    ASCEND = 'ascending',
    DESCEND = 'descending'
}

type SortConfig = {
    field: string,
    direction: SortDirection
} | null

// Customized hook function 
export const useSortableData = (itemsToSort: any[], config: SortConfig = null) => {

    const [sortConfig, setSortConfig] = React.useState<SortConfig>(config)

    const sortMethod = (itemA: any, itemB: any) => {
        if (itemA[sortConfig!.field] < itemB[sortConfig!.field]) {
            return sortConfig!.direction === SortDirection.ASCEND ? -1 : 1
        }
        else if (itemA[sortConfig!.field] > itemB[sortConfig!.field]) {
            return sortConfig!.direction === SortDirection.ASCEND ? 1 : -1
        }
        else {
            return 0
        }
    }

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...itemsToSort]
        if (sortConfig !== null) {
            sortableItems.sort(sortMethod)
        }
        return sortableItems
    }, [itemsToSort, sortConfig])

    const toggleSort = (field: string) => {
        let direction: SortDirection = SortDirection.ASCEND
        if (sortConfig &&
            sortConfig.field === field &&
            sortConfig.direction === SortDirection.ASCEND) {
            direction = SortDirection.DESCEND
        }
        setSortConfig({ field, direction })
    }

    return {
        sortedItems,
        sortConfig,
        toggleSort
    }
}