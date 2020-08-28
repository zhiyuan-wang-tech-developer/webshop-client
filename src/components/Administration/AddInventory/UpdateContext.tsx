import React, { Component, createContext } from 'react'

type UpdateContext = {
    operation: "add" | "update" | null,
    itemId: number | null,
}

const defaultUpdateContext = {
    operation: null,
    itemId: null
}

export const InventoryUpdateContext = createContext<unknown>(null)

export class InventoryUpdateContextProvider extends Component {
    state = {
        operation: null,
        itemId: null,
    }

    changeContext = (operation: string, itemId: number, link?: string) => {
        this.setState({
            operation,
            itemId
        }, () => {
            console.log("change operation to: ", operation)
            console.log("change item id to: ", itemId)
            if (link) {
                window.location.href = link
            }
        })
    }

    render() {
        return (
            <InventoryUpdateContext.Provider
                value={{
                    updateContext: this.state,
                    changeContext: this.changeContext.bind(this)
                }}>{this.props.children}</InventoryUpdateContext.Provider>
        )
    }
}