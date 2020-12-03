import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function updateBusinessAccount(active, name, photoURL, backgroundURL) {
	const { uid } = this.state.user;

    firebase.firestore().collection('business').doc(uid).update({
        active,
        name,
        photoURL,
        backgroundURL
    })
    .then(() => {
        Notification.success({
            title: "Listo",
            description: `Tu negocio ha sido actualizado.`
        });
    })
    .catch(error => {
        Notification.error({
            title: "Ocurrió un error",
            description: error
        });
    });
}