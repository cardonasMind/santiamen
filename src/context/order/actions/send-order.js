import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function sendOrder(name, details, businessKey, lat, lng, secondCheckoutStage) {
	console.log("SEND_ORDER");
	
	/*const { orderCart } = this.state.order;
    
    const fullDate = new Date();
    const humanDate = fullDate.toLocaleString('es-CO', { hour12: true }).split(",");
    const date = `${humanDate[0]} - ${humanDate[1]}`
    
    const order = {
        timestamp: fullDate,
        date,
        name,
        details,
		sent: false,
        stage: 0,
		time: "",
        lat,
        lng,
        order: orderCart
    };
    
        firebase.firestore().collection("business").doc(businessKey).collection("orders").add(order).then(docRef => {
            Notification.success({
              title: "Listo",
              description: "Tu pedido ha sido recibido."
            });

            this.setState({ orderInfo: { ref: docRef, name, details, lat, lng } });
    
            secondCheckoutStage();
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });*/
}