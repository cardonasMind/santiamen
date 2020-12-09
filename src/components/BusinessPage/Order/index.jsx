import { PureComponent } from "react";

import BusinessOrders from "./BusinessOrders";
import OrderCart from "./OrderCart";

export default class extends PureComponent {
    render() {
        const { isBusinessOwner } = this.props;
        
        if(isBusinessOwner) return <BusinessOrders />
        else return <OrderCart />
    }
}