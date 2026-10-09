export interface CheckOut{
    city:string,
    phone:string,
    details:string
}


export interface CheckOrder extends CheckOut{
    postalCode:string
}