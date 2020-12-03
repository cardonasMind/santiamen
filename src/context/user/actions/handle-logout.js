import { firebase } from "../../../config";
import { Notification } from "rsuite";

export default function handleLogout() {
	firebase.auth().signOut().then(() => {
		Notification.success({
            title: "Listo",
            description: "Acabas de cerrar sesión."
        });
	})
	.catch(error => {
		Notification.error({
            title: "Ocurrió un error",
            description: error
        });
	})
}