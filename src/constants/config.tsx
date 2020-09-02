const config = {
    url: {
        localHostURL: "http://localhost:3001",
        remoteHostURL: ""
    }
}
const urlBase = config.url.localHostURL

export const urlLocalHost = "http://localhost:3000"
export const urlLocalHostHome = `${urlLocalHost}/home`

export const urlBaseGraphQL = "http://localhost:3002/graphql"

export const urlUsers = `${urlBase}/users`
export const urlLogin = `${urlBase}/users/login`
export const urlItems = `${urlBase}/items`
export const urlItemsFind = `${urlBase}/items/find`
export const urlCart = `${urlBase}/cart`
export const urlCartItem = `${urlBase}/cart/item`
export const urlCategory = `${urlBase}/options/category`
export const urlAdminUser = (userId: number) => `${urlBase}/admin/users/${userId}`
export const urlAdminUsers = `${urlBase}/admin/users`
export const urlAdminLogin = `${urlBase}/admin/login`
export const urlAdminGroups = `${urlBase}/admin/groups`
export const urlAuthorities = `${urlBase}/authorities`
export const urlTables = `${urlBase}/authorities/tables`
export const urlActions = (groupId: number, tableId: number) => `${urlBase}/authorities/group/${groupId}/table/${tableId}`
export const urlTableActionsByAdminUser = (userId: number) => `${urlAdminUsers}/${userId}/actions`

export const RESULTS_PER_PAGE = 5
export const START_OFFSET = 0

export const tableNameInventory = "Inventory"
export const tableNameShoppingCart = "Shopping Cart"

export const COOKIE_KEY_ADMIN = "admin"
export const COOKIE_KEY_FILTER_VALUES = "filterValues"
export const COOKIE_KEY_FILTER_VALUES_VALID_TIME = 600

export const FILTER_VALUES = 'filterValues'