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
export const urlCart = `${urlBase}/cart`
export const urlCartItem = `${urlBase}/cart/item`
export const urlAdminUsers = `${urlBase}/admin/users`
export const urlAdminGroups = `${urlBase}/admin/groups`