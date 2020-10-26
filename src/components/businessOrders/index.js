import { PureComponent } from "react";

import { Badge, Button, Drawer } from "rsuite";

import { MainContext } from "../../config/MainContext";

import OrderCard from "./OrderCard";

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        showBusinessOrdersDrawer: false
    }

    toggleShowBusinessOrdersDrawer = () =>
        this.setState(prevState => ({ showBusinessOrdersDrawer: !prevState.showBusinessOrdersDrawer }));

    render() {
        const { showBusinessOrdersDrawer } = this.state;
        const { orders } = this.context;

        return(
            <div id="business-orders">
                <Badge content={4}>
                    <Button size="sm" onClick={this.toggleShowBusinessOrdersDrawer}>Ver pedidos</Button>
                </Badge>

                <Drawer placement={"bottom"} full show={showBusinessOrdersDrawer} onHide={this.toggleShowBusinessOrdersDrawer}>
                    <Drawer.Header><h1>Pedidos a tu negocio</h1></Drawer.Header>
                    <Drawer.Body>
                        {
                           orders.map(order => 
                               <OrderCard key={order.key} {...order} />
                           )
                        }
                    </Drawer.Body>
                </Drawer>


                <style jsx>{`
                    #business-orders {
                        position: fixed;
                        bottom: 0;
                        background: white;
                        border-radius: .6rem .6rem 0 0;
                        z-index: 999;
                        padding: 1rem;
                        right: 0;
                        left: 0;
                        width: fit-content;
                        margin: auto;
                    }
                `}</style>
            </div>
        )
    }
}