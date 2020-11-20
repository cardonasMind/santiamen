import { PureComponent } from "react";

import { Badge, Button, Icon, Drawer } from "rsuite";

import { MainContext } from "../../config/MainContext";

import OrderListProduct from "./OrderListProduct";
import Checkout from "./Checkout";
import { numberToMoney } from "../../utils";

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        showOrderListDrawer: false
    }

    toggleShowOrderListDrawer = () => 
        this.setState(prevState => ({ showOrderListDrawer: !prevState.showOrderListDrawer }));

    calculateTotalPrice = () => {
        const { orderList } = this.context;
        let totalPrice = 0;

        orderList.map(product => {
            let { price, amount } = product;

            totalPrice += price * amount;
        });

        return numberToMoney(totalPrice);
    }

    render() {
        const { showOrderListDrawer } = this.state;
        const { orderList, removeProductFromOrderList } = this.context;
        const { businessKey } = this.props;

        return(
            <div id="order-list">
                <Badge content={orderList.length}>
                    <Button size="sm" onClick={this.toggleShowOrderListDrawer}><Icon icon="shopping-cart" /> Tu lista de pedido</Button>
                </Badge>

                <Drawer placement={"bottom"} full show={showOrderListDrawer} onHide={this.toggleShowOrderListDrawer}>
                    <Drawer.Header><h1>Tu lista de pedido</h1></Drawer.Header>
                    <Drawer.Body>
                        {
                           orderList.map(product => 
                               <OrderListProduct key={product.id} removeProductFromOrderList={removeProductFromOrderList} {...product} />
                           )
                        }

                        <div id="order-list-checkout">
                            <h3>Total: ${this.calculateTotalPrice()}</h3>
                            <Checkout businessKey={businessKey} />
                        </div>
                    </Drawer.Body>
                </Drawer>

                <style jsx>{`
                    #order-list {
                        position: fixed;
                        right: 0;
                        bottom: ${orderList.length > 0 ? 0 : "-100vh"};
                        left: 0;
                        background: white;
                        padding: 1rem;
                        transition: .4s;
                        z-index: 999;
                    }

                    #order-list-checkout {
                        position: sticky;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        background: white;
                        padding-top: 1rem;
                    }

                    #order-list-checkout h3 {
                        margin-bottom: .6rem;
                        color: var(--green);
                        text-align: right;
                    }
                `}</style>
            </div>
        )
    }
}