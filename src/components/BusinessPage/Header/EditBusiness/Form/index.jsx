import { PureComponent } from "react";

import { firebase } from "../../../../../config";

import { mainContext } from "../../../../../context";

import { Notification } from "rsuite";

import EditBusinessForm from "./Form";

export default class extends PureComponent {
    static contextType = mainContext;
    
    state = {
        active: this.context.user.active,
        name: this.context.user.name,
        photoURL: this.context.user.photoURL,
        backgroundURL: this.context.user.backgroundURL
    }

    handleActive = active => this.setState({ active });

    handleName = name => this.setState({ name });    

    handlePhotoURL = photoURL => this.setState({ photoURL });

    handleBackgroundURL = backgroundURL => this.setState({ backgroundURL });

    updateBusiness = () => {
        const { active, name, photoURL, backgroundURL } = this.state;
        const { toggleShowEditBusinessDrawer } = this.props;
        
        const { uid } = this.context.user;
        const { updateBusinessAccount } = this.context.user;

        if(name !== "") {
            const storageRef = firebase.storage().ref();

            if(photoURL !== this.context.user.photoURL && backgroundURL !== this.context.user.backgroundURL) {
                 // User have changed photoURL and backgroundURl
                Notification.info({
                    title: "Espera",
                    description: "Subiendo imágenes."
                });

                // Upload the selected images to firebase and then get the URL
                const uploadBusinessLogo = storageRef.child(`business/${uid}/logo`).putString(photoURL, 'data_url');

                const uploadBusinessBackground = storageRef.child(`business/${uid}/background`)
                .putString(backgroundURL, 'data_url');

                // First upload photoURL and then backgroundURL
                uploadBusinessLogo.then(snapshot => {
                    snapshot.ref.getDownloadURL().then(downloadPhotoURL => {
                        uploadBusinessBackground.then(snapshot => {
                            snapshot.ref.getDownloadURL().then(downloadBackgroundURL => {
                                updateBusinessAccount(active, name, downloadPhotoURL, downloadBackgroundURL);
                                toggleShowEditBusinessDrawer();
                            })
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

            } else if(photoURL !== this.context.user.photoURL) {
                // User only have changed photoURL
                Notification.info({
                    title: "Espera",
                    description: "Subiendo imágen."
                });
    
                // Upload the selected image to firebase and then get the URL
                const uploadBusinessLogo = storageRef.child(`business/${uid}/logo`).putString(photoURL, 'data_url');
                        
                uploadBusinessLogo.then(snapshot => {
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        updateBusinessAccount(active, name, downloadURL, backgroundURL);
                        toggleShowEditBusinessDrawer();
                    })
                })
                .catch(error => {
                    Notification.error({
                        title: "Ocurrió un error",
                        description: error
                    });
                });

            } else if(backgroundURL !== this.context.user.backgroundURL) {
                // User only have changed backgroundURL
                Notification.info({
                    title: "Espera",
                    description: "Subiendo imágen de fondo."
                });
    
                // Upload the selected image to firebase and then get the URL
                const uploadBusinessBackground = storageRef.child(`business/${uid}/background`)
                .putString(backgroundURL, 'data_url');
                        
                uploadBusinessBackground.then(snapshot => {
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        updateBusinessAccount(active, name, photoURL, downloadURL);
                        toggleShowEditBusinessDrawer();
                    })
                })
                .catch(error => {
                    Notification.error({
                        title: "Ocurrió un error",
                        description: error
                    });
                });

            } else {
                // User haven´t changed images
                updateBusinessAccount(active, name, photoURL, backgroundURL);
                toggleShowEditBusinessDrawer();
            }
        } else {
            Notification.info({
                title: "Espera",
                description: "Falta el nombre de tu negocio."
            });
        }
    }

    render() {
        const { toggleShowEditBusinessDrawer } = this.props;
        
        return <EditBusinessForm {...this.state} handleActive={this.handleActive} handleName={this.handleName} handlePhotoURL={this.handlePhotoURL} handleBackgroundURL={this.handleBackgroundURL} updateBusiness={this.updateBusiness} toggleShowEditBusinessDrawer={toggleShowEditBusinessDrawer} />
    }
}