import { OrderStatus, Role, UserStatus } from "../../generated/prisma/enums";

export interface JwtPayload {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: UserStatus;
}

export interface IResisterPayload {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
}
export interface ILoginPayload {
    email: string;
    password: string;
}

export interface IProductQuery {
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: "price-low" | "price-high";
}

export interface IProductCreatePayload {
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    originalPrice?: number;
    unit?: string;
    stock?: number;
    isOrganic?: boolean;
    reviewCount?: number;
}
export interface IProductUpdatePayload {
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    originalPrice?: number;
    unit?: string;
    stock?: number;
    isOrganic?: boolean;
}

export interface ICreateOrderPayload {
    shippingAddress: any;
    paymentMethod: string;
    items: any;
}

export interface IUpdateOrderStatusPayload {
    status: OrderStatus;
    note?: string;
}

export interface ICreateAddressPayload {
    label: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    isDefault?: boolean;
    lat: number;
    lng: number;
}
