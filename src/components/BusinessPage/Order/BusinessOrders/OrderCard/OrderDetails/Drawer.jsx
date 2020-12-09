import react from "react";

import { Drawer } from "rsuite";

import ProcessOrderButton from "./ProcessOrderButton";

export default function OrderDetailsDrawer({ children, showOrderDetailsDrawer, toggleShowOrderDetailsDrawer, date, name, id, stage }) {	
	return (
		<Drawer placement="right" full show={showOrderDetailsDrawer} onHide={toggleShowOrderDetailsDrawer}>
			<Drawer.Header>
				<p>{date}</p>
				<h2>Pedido de: {name}</h2>
            </Drawer.Header>
            <Drawer.Body>
				{children}
			</Drawer.Body>
			<Drawer.Footer>
				<ProcessOrderButton id={id} stage={stage} />
			</Drawer.Footer>
		</Drawer>
	)
}