import React from "react";

import { Drawer } from "rsuite";

export default function EditBusinessDrawer({ children, showEditBusinessDrawer, toggleShowEditBusinessDrawer }) {
    return(
        <Drawer placement="bottom" full show={showEditBusinessDrawer} onHide={toggleShowEditBusinessDrawer}>
            <Drawer.Header><h1>Editar mi negocio</h1></Drawer.Header>
            <Drawer.Body>
                {children}
            </Drawer.Body>
        </Drawer>
    )
}