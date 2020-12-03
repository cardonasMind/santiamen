import { firebase } from "../../../config";

import { Notification } from "rsuite";

export default function newProduct(category, name, price, photoURL, description, toggleShowAddProductDrawer) {
	const { uid } = this.state.user;
    const storageRef = firebase.storage().ref();
	
	const newProductRef = firebase.firestore().collection('business').doc(uid).collection(category).doc();
	// Upload the selected image to firebase and then get the URL
    const uploadProductImage = storageRef.child(`business/${uid}/${category}/${newProductRef.id}`).putString(photoURL, 'data_url');

	Notification.info({
        title: "Espera",
        description: "Subiendo imágen."
    });
	
	uploadProductImage.then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            newProductRef.set({
                name,
				price,
				photoURL: downloadURL,
				description
            })
            .then(docRef => {
                Notification.success({
                    title: "Perfecto",
                    description: `Acabas de agregar un nuevo producto: ${name}`
                });

                toggleShowAddProductDrawer();
            })
            .catch(error => {
                Notification.error({
                    title: "Ocurrió un error",
                    description: error
                });
            }); 
        })
    })
    .catch(error => {
        Notification.error({
            title: "Ocurrió un error",
            description: error
        });
    });
}