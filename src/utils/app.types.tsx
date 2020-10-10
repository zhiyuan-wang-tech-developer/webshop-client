export interface ModalWindowProps {
    show: boolean,
    onHide: VoidFunction
}

export interface FormProps {
    switchForm: VoidFunction
}

export type LoginUser = {
    email: string,
    password: string
}

export type LoginAdmin = LoginUser

export type RegisterUser = {
    name: string,
    email: string,
    password: string,
    address: string,
    zip: string,
    city: string,
    country: string
}

export type Item = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    status: string;
    quantityInStock: number
}

export type ItemOrder = {
    id: number,
    name: string,
    unitPrice: number,
    amount: number,
    totalPrice: number
}

export type CartState = {
    items: ItemOrder[]
}

export type CartAction = {
    type: string,
    payload: { item: ItemOrder }
}

export type FeedbackState = {
    message: string | null,
    timestamp: string | null
}

export type FeedbackAction = {
    type: string,
    payload: { message: string | null }
}

export type InventoryState = {
    items: Item[]
}

export type InventoryAction = {
    type: string,
    payload: { items: Item[] }
}

export type TokenState = {
    token: string | null
}

export type TokenAction = {
    type: string,
    payload: { token: string | null }
}

export type Group = {
    id?: number,
    name: string,
    description: string
}

export type AdminUser = {
    id?: number,
    name: string,
    email: string,
    password?: string,
    adminUserGroups: Group[]
}

export type AdminUserState = {
    adminUser: AdminUser | null,
}

export type AdminUserAction = {
    type: string,
    payload: { adminUser: AdminUser | null }
}

export type Table = {
    id?: number,
    name: string,
    description: string
}

export type TableAction = {
    tableId: number;
    tableName: string;
    actions: AuthorityAction[];
}

export type TableActionsState = TableAction[]

export type TableActionsAction = {
    type: string,
    payload: TableActionsState
}

export type Authority = {
    id?: number,
    groupId: number,
    tableId: number,
    action: AuthorityAction | string
}

export enum AuthorityAction {
    ALL = "all",
    GET = "get",
    ADD = "add",
    EDIT = "edit",
    DELETE = "delete",
}

export type FoundResultState = {
    itemsTotal: number,
    pageItems: Item[],
    pageCurrent: number,
    pageTotal: number
}

export type FoundResultAction = {
    type: string,
    payload?: { result: FoundResultState }
}

export enum ExpiredTimeUnit {
    SECOND = "second",
    MINUTE = "minute",
    HOUR = "hour",
    DAY = "day"
}

export enum SortOrder {
    ASCEND = 'ASC',
    DESCEND = 'DESC',
}