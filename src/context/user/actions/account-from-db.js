import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function accountFromDB() {
	console.log("ACCOUNT_FROM_DB")
	console.log(this);

	// For the moment only will be business accounts
    /*const userInDBRef = firebase.firestore().collection("business").doc(uid);

    userInDbRef.onSnapshot(doc => {
            if(doc.exists) {
                const userDataFromDb = doc.data();
                const { active, name, photoURL, backgroundURL } = userDataFromDb;

                this.setState({ active, name, photoURL, backgroundURL, userIsInDb: true });

                this.getBusinessOrders(uid);
            } else {
                this.setState({ userIsInDb: false });
            }
        },
        error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        })*/
}