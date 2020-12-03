import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function deleteProduct(category, productID) {
    const { uid } = this.state.user;
    firebase.firestore().collection('business').doc(uid).collection(category).doc(productID).delete().then(() =>
        Notification.success({
            title: "Listo",
            description: "Producto eliminado correctamente."
        })
    )
	.catch(error => 
        Notification.error({
           title: "Ocurrió un error",
            description: error
        })
    );
}