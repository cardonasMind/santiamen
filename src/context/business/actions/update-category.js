import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function updateCategory(category, title, visible) {
	const { uid } = this.state.user;

	firebase.firestore().collection('business').doc(uid).collection(category).doc('info').update({
        title,
        visible
    })
    .then(() => {
        Notification.success({
            title: "Listo",
            description: `Categoría actualizada.`
        });
    })
    .catch(error => {
        Notification.error({
            title: "Ocurrió un error",
            description: error
        });
    });
}