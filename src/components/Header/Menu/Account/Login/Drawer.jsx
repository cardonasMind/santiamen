import React from "react";

import { Drawer } from "rsuite";

export default function LoginDrawer({ children, showLoginDrawer, toggleShowLoginDrawer }) {
	return(
		<Drawer full placement="bottom" show={showLoginDrawer} onHide={toggleShowLoginDrawer}>
			<Drawer.Header><h1>Accede a tu negocio</h1></Drawer.Header>
            <Drawer.Body>
				{children}
                <br />
                <p>* Si aún no te has registrado, luego de acceder podrás hacerlo.</p>
            </Drawer.Body>
        </Drawer>
	)
}