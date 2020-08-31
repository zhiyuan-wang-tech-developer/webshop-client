const config = {
    url: {
        localHostURL: "http://localhost:3001",
        remoteHostURL: ""
    }
}
const urlBase = config.url.localHostURL

export const urlUsers = `${urlBase}/users`
export const urlLogin = `${urlBase}/users/login`
export const urlItems = `${urlBase}/items`
export const urlItemsFind = `${urlBase}/items/find`
export const urlCart = `${urlBase}/cart`
export const urlCartItem = `${urlBase}/cart/item`
export const urlAdminUsers = `${urlBase}/admin/users`
export const urlAdminGroups = `${urlBase}/admin/groups`
export const urlAuthorities = `${urlBase}/authorities`
export const urlTables = `${urlBase}/authorities/tables`
export const urlActions = (groupId: number, tableId: number) => `${urlBase}/authorities/group/${groupId}/table/${tableId}`

export const urlBaseGraphQL = "http://localhost:3002/graphql"

export const RESULTS_PER_PAGE = 5
export const START_OFFSET = 0