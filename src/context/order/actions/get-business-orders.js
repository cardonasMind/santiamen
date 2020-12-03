import { firebase } from "../../../config";
import { Notification } from "rsuite";

export default function getBusinessOrders() {
	const { uid } = this.state.user;
	
	/*                  GETTING ORDERS FOR BUSINESS OWNERS FROM DB               */
    firebase.firestore().collection("business").doc(uid).collection("orders").where("sent", "==", false).orderBy("timestamp", "desc")
	.onSnapshot(docSnapshot => {
		this.setState(prevState => ({ order: {...prevState.order, businessOrders: []} })); // Restart state
    
        docSnapshot.forEach(order => {
            const orderData = {
                key: order.id,
                ...order.data(),
            };
			
			this.setState(prevState => ({ order: {...prevState.order, businessOrders: [...prevState.order.businessOrders, orderData]} }));
        });
    },
    error => {
        Notification.error({
            title: "Ocurrió un error",
            description: error
        });
    });
}