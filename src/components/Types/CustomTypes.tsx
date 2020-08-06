export interface ModalWindowPropsType {
    show: boolean,
    onHide: () => void
}

export interface FormPropsType {
    switchForm: () => void
}

export interface UserLoginType {
    email: string,
    password: string
}

export interface UserRegisterType {
    name: string,
    email: string,
    password: string,
    address: string,
    zip: string,
    city: string,
    country: string
}

export interface ItemType {
    id: number;
    name: string;
    description: string;
    category: string;
    price: number;
    status: string;
    quantityInStock: number
}

export interface ItemOrderType {
    id: number,
    name: string,
    unitPrice: number,
    amount: number,
    totalPrice: number
}