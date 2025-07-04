export interface Product {
    id: number;
    code: string;
    name: string;
    price: number;
    category: string;
    // craftsman: string;
    cost_price: number;
    sales_price: number;
    sold_price: number;
    incoming_date: Date;
    outgoing_date: Date;
    reason_outgoing: string;
    payment_date: Date;
    payment_method: string;
    note: string;
}
