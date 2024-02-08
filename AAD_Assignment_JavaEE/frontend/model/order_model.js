export class order_model{

    constructor(order_id,customer_id,total,items,date) {
        this.order_id = order_id;
        this.customer_id = customer_id;
        this.total = total;
        this.items = items;
        this.date = date;
    }

}