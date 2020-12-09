import React from "react";

import { Drawer } from "rsuite";

export default function BusinessOrdersDrawer({ children, showBusinessOrdersDrawer, toggleShowBusinessOrdersDrawer }) {
	return (
		<Drawer placement="bottom" full show={showBusinessOrdersDrawer} onHide={toggleShowBusinessOrdersDrawer}>
			<Drawer.Header><h1>Pedidos a tu negocio</h1></Drawer.Header>
			<Drawer.Body>
				{children}
			</Drawer.Body>
        </Drawer>
	)
}