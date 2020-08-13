export interface ModalWindowPropsType {
    show: boolean,
    onHide: VoidFunction
}

export interface FormPropsType {
    switchForm: VoidFunction
}

export type UserLoginType = {
    email: string,
    password: string
}

export type UserRegisterType = {
    name: string,
    email: string,
    password: string,
    address: string,
    zip: string,
    city: string,
    country: string
}

export type ItemType = {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    status: string;
    quantityInStock: number
}

export type ItemOrderType = {
    id: number,
    name: string,
    unitPrice: number,
    amount: number,
    totalPrice: number
}

export type CartStateType = {
    items: ItemOrderType[]
}

export type CartActionType = {
    type: string,
    payload: { item: ItemOrderType }
}

export type FeedbackStateType = {
    message: string | null,
    timestamp: string | null
}

export type FeedbackActionType = {
    type: string,
    payload: { message: string | null }
}

export type InventoryStateType = {
    items: ItemType[]
}

export type InventoryActionType = {
    type: string,
    payload: { items: ItemType[] }
}

export type TokenStateType = {
    token: string | null
}

export type TokenActionType = {
    type: string,
    payload: { token: string | null }
}