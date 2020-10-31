import { PureComponent } from "react";

import { Notification, Button, Icon, Drawer, Form, FormGroup, Toggle, Input } from "rsuite";

import { MainContext } from "../config/MainContext";

import firebase from "../config/firebase";

import PreviewAndGetImage from "./PreviewAndGetImage";

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        showEditBusinessDrawer: false,

        active: this.context.active,
        name: this.context.name,
        photoURL: this.context.photoURL,
        backgroundURL: this.context.backgroundURL
    }

    toggleShowEditBusinessDrawer = () => 
        this.setState(prevState => ({ showEditBusinessDrawer: !prevState.showEditBusinessDrawer }))

    handleName = name => this.setState({ name });

    handleActive = active => this.setState({ active });

    handlePhotoURL = photoURL => this.setState({ photoURL });

    handleBackgroundURL = backgroundURL => this.setState({ backgroundURL });

    updateBusiness = () => {
        const { active, name, photoURL, backgroundURL } = this.state;
        const { uid, updateBusiness } = this.context;

        if(name !== "") {
            const storageRef = firebase.storage().ref();

            if(photoURL !== this.context.photoURL && backgroundURL !== this.context.backgroundURL) {
                 // User have changed photoURL and backgroundURl
                Notification.info({
                    title: "Espera",
                    description: "Subiendo imágenes."
                });

                // Upload the selected images to firebase and then get the URL
                const uploadBusinessLogo = storageRef.child(`business/${uid}/logo`)
                    .putString(photoURL, 'data_url');

                const uploadBusinessBackground = storageRef.child(`business/${uid}/background`)
                    .putString(backgroundURL, 'data_url');

                // First upload photoURL and then backgroundURL
                uploadBusinessLogo.then(snapshot => {
                    snapshot.ref.getDownloadURL().then(downloadPhotoURL => {
                        uploadBusinessBackground.then(snapshot => {
                            snapshot.ref.getDownloadURL().then(downloadBackgroundURL => {
                                updateBusiness(active, name, downloadPhotoURL, downloadBackgroundURL);
                                this.toggleShowEditBusinessDrawer();
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

            } else if(photoURL !== this.context.photoURL) {
                // User only have changed photoURL
                Notification.info({
                    title: "Espera",
                    description: "Subiendo imágen."
                });
    
                // Upload the selected image to firebase and then get the URL
                const uploadBusinessLogo = storageRef.child(`business/${uid}/logo`)
                    .putString(photoURL, 'data_url');
                        
                uploadBusinessLogo.then(snapshot => {
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        updateBusiness(active, name, downloadURL, backgroundURL);
                        this.toggleShowEditBusinessDrawer();
                    })
                })
                .catch(error => {
                    Notification.error({
                        title: "Ocurrió un error",
                        description: error
                    });
                });

            } else if(backgroundURL !== this.context.backgroundURL) {
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
                        updateBusiness(active, name, photoURL, downloadURL);
                        this.toggleShowEditBusinessDrawer();
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
                updateBusiness(active, name, photoURL, backgroundURL);
                this.toggleShowEditBusinessDrawer();
            }
        } else {
            Notification.info({
                title: "Espera",
                description: "Falta el nombre de tu negocio."
            });
        }
    }

    render() {
        const { showEditBusinessDrawer, active, name, photoURL, backgroundURL } = this.state;

        return (
            <div id="edit-business">
                <Button appearance="primary" size="xs" onClick={this.toggleShowEditBusinessDrawer} ><Icon icon="gear" /></Button>

                <Drawer placement="bottom" full show={showEditBusinessDrawer} onHide={this.toggleShowEditBusinessDrawer}>
                    <Drawer.Header><h1>Editar mi negocio</h1></Drawer.Header>
                    <Drawer.Body>
                        <Form>
                            <FormGroup>
                                <h2>Estado del negocio</h2>
                                <Toggle 
                                    checkedChildren="Recibiendo pedidos" unCheckedChildren="Cerrado"
                                    checked={active} onChange={this.handleActive}
                                />
                            </FormGroup>

                            <FormGroup>
                                <h2>Nombre</h2>
                                <Input size="sm" value={name} onChange={this.handleName} />
                            </FormGroup>

                            <FormGroup>
                                <h2>Logo</h2>
                                <div id="logo-uploader">
                                    <div id="logo-preview" />
                                    <PreviewAndGetImage handleImage={this.handlePhotoURL} toWidth={80}>
                                        <p>Seleccionar logo</p>
                                    </PreviewAndGetImage>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <h2>Imágen de fondo</h2>
                                <div id="background-uploader">
                                    <div id="background-preview" />
                                    <PreviewAndGetImage handleImage={this.handleBackgroundURL} toWidth={600}>
                                        <p>Seleccionar imágen de fondo</p>
                                    </PreviewAndGetImage>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <div id="business-buttons">
                                    <Button appearance="primary" onClick={this.updateBusiness}>Guardar</Button>
                                    <Button appearance="subtle" onClick={this.toggleShowEditBusinessDrawer} >Cancelar</Button>
                                </div>
                            </FormGroup>
                        </Form>

                    </Drawer.Body>
                </Drawer>


                <style jsx>{`
                    #edit-business {
                        position: absolute;
                        right: 1rem;
                        bottom: 1rem;
                    }

                    h2 {
                        margin-bottom: .4rem;
                    }

                    #logo-uploader {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .6rem;
                        overflow-x: auto;
                        position: relative;
                    }

                    #logo-preview {
                        background-image: url(${photoURL ? photoURL : ""});
                        background-size: cover;
                        background-position: center;
                        width: 80px;
                        height: 80px;
                        border-radius: .6rem;
                        border: 1px solid rgb(0, 0, 0, .2);
                        background-color: rgba(0, 0, 0, .2);
                    }

                    #background-uploader {
                        display: grid;
                        grid-gap: .6rem;
                        overflow-x: auto;
                        position: relative;
                    }

                    #background-preview {
                        width: 100%;
                        height: 140px;
                        border: 1px solid rgb(0, 0, 0, .2);
                        background-color: rgba(0, 0, 0, .2);
                        background-image: url(${backgroundURL ? backgroundURL : ""});
                        background-size: cover;
                        background-position: center;
                    }

                    #business-buttons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-gap: .6rem;
                    }
                `}</style>
            </div>
        )
    }
}