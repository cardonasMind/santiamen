import react, { Fragment, useContext } from "react";

import { mainContext } from "../../../../../../context";

import { Button } from "rsuite";

const processOrderCooking = (id, stage, processOrder) => {
	const time = prompt("Tiempo para preparar el pedido")
	
	if (time !== "") processOrder(id, stage, time);
}

export default function ProcessOrderButton({ id, stage }) {
	const { processOrder } = useContext(mainContext).order;
	
	return(
        <Fragment>
            { 
				stage === 0 &&
					<Button onClick={() => processOrderCooking(id, stage, processOrder)} color="green" block>
						<img width="18px" src="/icons/cooking.svg" /> Confirmar y preparar pedido
					</Button>
            }

            {
				stage === 1 &&
					<Button onClick={() => processOrder(id, stage)} color="cyan" block>
						<img width="18px" src="/icons/delivering.svg" /> Enviar pedido
					</Button>
            }

            {
				stage === 2 &&
					<Button onClick={() => processOrder(id, stage)} appearance="primary" block>
						<img width="18px" src="/icons/delivered.svg" /> Pedido enviado
					</Button>
            }
		</Fragment>
    )
}