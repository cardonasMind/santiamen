import { firebase } from "../../../config";
import { Notification } from "rsuite";

export default function registerBusiness(name, category, photoURL) {
	const { uid } = this.state.user;
    const db = firebase.firestore();
    const storageRef = firebase.storage().ref();

    const uploadBusinessLogo = storageRef.child(`business/${uid}/logo`).putString(photoURL, 'data_url');

    Notification.info({
        title: "Espera",
        description: "Subiendo imágen."
    });

    uploadBusinessLogo.then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
			db.collection('business').doc(uid).set({
                active: false,
                name,
                category,
                photoURL: downloadURL,
                backgroundURL: ""
			})
            .then(docRef => {
                // Adding the 6 categories to the business
                for(let i = 1; i < 7; i++) {
                    db.doc(`business/${uid}/category${i}/info`).set({
                        visible: false,
                        title: `Categoría ${i}`
                    })
                    .catch(error => Notification.error({
                        title: "Ocurrió un error",
                        description: error
                    }));
                }

                Notification.success({
                    title: "Perfecto",
					description: "¡Acabas de registrar tu negocio!"
                });
            })
            .catch(error => 
				Notification.error({
                    title: "Ocurrió un error",
                    description: error
                })
            ); 
        })
    })
    .catch(error => {
        Notification.error({
            title: "Ocurrió un error",
            description: error
        });
    });
}