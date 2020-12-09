import React from "react";

import { Drawer } from "rsuite";

export default function NewProductDrawer({ children, showNewProductDrawer, toggleShowNewProductDrawer }) {
	return (
		<Drawer placement="bottom" full show={showNewProductDrawer} onHide={toggleShowNewProductDrawer}>
			<Drawer.Header><h1>Agregar nuevo producto</h1></Drawer.Header>
            <Drawer.Body>
				{children}
            </Drawer.Body>
        </Drawer>
	)
}