import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function accountFromDB() {
	const { uid } = this.state.user;
	const { getBusinessOrders } = this.state.order;
	
	// For the moment only will be business accounts
    const userInDBRef = firebase.firestore().collection("business").doc(uid);

    userInDBRef.onSnapshot(doc => {
        if(doc.exists) {
			const userDataFromDB = doc.data();
            const { active, name, photoURL, backgroundURL } = userDataFromDB;
			
			this.setState(prevState => ({ user: {...prevState.user, userIsInDB: true, active, name, photoURL, backgroundURL} }));

            getBusinessOrders();
        } else {
			this.setState(prevState => ({ user: {...prevState.user, userIsInDB: false} }));
        }
    },
    error => 
		Notification.error({
			title: "Ocurrió un error",
            description: error
		})
    )
}