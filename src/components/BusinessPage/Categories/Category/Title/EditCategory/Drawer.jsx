import React from "react";

import { Drawer } from "rsuite";

export default function EditCategoryDrawer({ children, showEditCategoryDrawer, toggleShowEditCategoryDrawer, title }) {
    return(
        <Drawer placement="bottom" full show={showEditCategoryDrawer} onHide={toggleShowEditCategoryDrawer}>
            <Drawer.Header><h1>Modificar: {title}</h1></Drawer.Header>
            <Drawer.Body>
                {children}
            </Drawer.Body>
        </Drawer>
    )
}