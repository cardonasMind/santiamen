import React, { useEffect } from "react";

import { Drawer } from "rsuite";

import { OrderProductsList } from "../OrderProduct";
import Checkout from "./Checkout";

export default function OrderCartDrawer({ showOrderCartDrawer, toggleShowOrderCartDrawer, orderCart }) {
	return (
		<Drawer placement="bottom" full show={showOrderCartDrawer} onHide={toggleShowOrderCartDrawer}>
			<Drawer.Header><h1>Tu lista de pedido</h1></Drawer.Header>
            <Drawer.Body>
				<OrderProductsList products={orderCart} showDelete />
				
				<Checkout />
			</Drawer.Body>
        </Drawer>
	)
}

