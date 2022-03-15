export interface Item {
    name:string;
    image:string;
    qty:number;
}


export interface Order {
    delivery_address:string;
    order_id:string;
    order_status:string;
    sub_total:number;
    time:string;
    total:number;
    user_email:string;
    user_id:string;
}