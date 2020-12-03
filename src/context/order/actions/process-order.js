import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function processOrder(orderID, stage, time) {
	const { uid } = this.state.user;
    const orderRef = firebase.firestore().collection('business').doc(uid).collection('orders').doc(orderID);
	
	if(stage === 0) {
        orderRef.update({
            stage: stage+1,
            time
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    } else if(stage === 2) {
		// Order has been delivered 
        orderRef.update({
            stage: stage+1,
            sent: true
        })
        .then(() => {
            Notification.success({
				title: "Perfecto",
                description: `La orden ${orderID} ha sido recibida por el cliente.`
            });
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    } else {
        orderRef.update({
            stage: stage+1
        })
        .catch(error => {
            Notification.error({
				title: "Ocurrió un error",
                description: error
            });
        });
    }
}