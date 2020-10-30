import { PureComponent } from "react";

import { Notification, Button, Icon, Drawer, Form, FormGroup, Toggle, Input, Uploader, Dropdown } from "rsuite";

import { MainContext } from "../config/MainContext";

import firebase from "../config/firebase";





//              THEN DELETE THIS
class PreviewAndGetImage extends PureComponent {
    handleUpload = e => {
        const file = e.blobFile;
        const reader = new FileReader();
        
        // Set the image once loaded into file reader
        reader.readAsDataURL(file);

        reader.onload = e => {
            this.props.handleImage(e.target.result);
        }
    }

    render() {
        return(
            <Uploader action="" draggable onUpload={this.handleUpload}>
                {this.props.children}
            </Uploader>
        )
    }
}








export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        showEditBusinessDrawer: false,

        active: this.context.active,
        name: this.context.name,
        photoURL: this.context.photoURL,
        backgroundURL: ""
    }

    toggleShowEditBusinessDrawer = () => 
        this.setState(prevState => ({ showEditBusinessDrawer: !prevState.showEditBusinessDrawer }))

    handleName = name => this.setState({ name });

    handleActive = active => this.setState({ active });

    handlePhotoURL = photoURL => this.setState({ photoURL });

    updateBusiness = () => {
        const { active, name, photoURL } = this.state;
        const { uid, updateBusiness } = this.context;

        if(name !== "") {
            // photoURL haven´t change
            if(photoURL == this.context.photoURL) {
                updateBusiness(active, name, photoURL);
                this.toggleShowEditBusinessDrawer();

            } else {
                const storageRef = firebase.storage().ref();

                Notification.info({
                    title: "Espera",
                    description: "Subiendo imágen."
                });
    
                // Upload the selected image to firebase and then get the URL
                const uploadBusinessLogo = storageRef.child(`business/${uid}/logo`)
                    .putString(photoURL, 'data_url');
                        
                uploadBusinessLogo.then(snapshot => {
                    snapshot.ref.getDownloadURL().then(downloadURL => {
                        updateBusiness(active, name, downloadURL);
                        this.toggleShowEditBusinessDrawer();
                    })
                })
                .catch(error => {
                    Notification.error({
                        title: "Ocurrió un error",
                        description: error
                    });
                });
            }
        } else {
            Notification.info({
                title: "Espera",
                description: "Falta el nombre de tu negocio."
            });
        }
    }

    render() {
        const { showEditBusinessDrawer, active, name, photoURL } = this.state;

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
                                    <div>
                                        <PreviewAndGetImage handleImage={this.handlePhotoURL} >
                                            <p>Seleccionar logo</p>
                                        </PreviewAndGetImage>
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <h2>Imágen de fondo</h2>
                                <div id="background-uploader">
                                    <Dropdown title="Seleccionar">
                                        <Dropdown.Item>New File</Dropdown.Item>
                                        <Dropdown.Item>New File with Current Profile</Dropdown.Item>
                                        <Dropdown.Item>Download As...</Dropdown.Item>
                                        <Dropdown.Item>Export PDF</Dropdown.Item>
                                        <Dropdown.Item>Export HTML</Dropdown.Item>
                                        <Dropdown.Item>Settings</Dropdown.Item>
                                        <Dropdown.Item>About</Dropdown.Item>
                                    </Dropdown>

                                    <div id="background-preview" />
                                    
                                    <Uploader action="" draggable>
                                        <p>Seleccionar imágen de fondo</p>
                                    </Uploader>
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
                    }¿

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