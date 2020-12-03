import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function getBusinessList() {
	firebase.firestore().collection("business").onSnapshot(docSnapshot => {
		this.setState(prevState => ({ business: {...prevState.business, business: [], businessKeys: []} })) // Restart state

        docSnapshot.forEach(business => {
			this.setState(prevState => ({ 
				business: {
					...prevState.business,
					business: [...prevState.business.business, business.data()],
					businessKeys: [...prevState.business.businessKeys, business.id]
				}
			}));
        });
    },
    error => {
        Notification.error({
			title: "Ocurrió un error",
            description: error
        });
    })
}