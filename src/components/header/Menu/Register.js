import { PureComponent } from "react";

import { Form, FormGroup, Input, RadioGroup, Radio, Button, Notification } from "rsuite";

import PreviewAndGetImage from "../../PreviewAndGetImage";

export default class extends PureComponent {
    state = {
        name: "",
        category: "",
        photoURL: ""
    }

    handleName = name => this.setState({ name });

    handleCategory = category => this.setState({ category });

    handlePhotoURL = photoURL => this.setState({ photoURL });

    handleRegister = () => {
        const { name, category, photoURL } = this.state;
        const { registerBusiness } = this.props;

        if(name !== "" && category !== "" && photoURL !== "") {
            registerBusiness(name, category, photoURL);
            
        } else {
            Notification.info({
                title: "Espera",
                description: "Completa todos los campos, es importante."
            })
        }
    }

    render() {
        const { name, category, photoURL } = this.state;

        // This checks if userIsInDb is null, true or false
        const { userIsInDb } = this.props;

        return(
            <div id="register-container">
                <Form>
                    <FormGroup>
                        <h1>Configura tu negocio</h1>
                    </FormGroup>

                    <FormGroup>
                        <h2>Nombre</h2>
                        <Input style={{ color: "initial" }} size="sm" value={name} onChange={this.handleName} />
                    </FormGroup>

                    <FormGroup>
                        <h2>Categoría</h2>
                        <RadioGroup value={category} onChange={this.handleCategory}>
                            <Radio value="fast-food">Comida rápida</Radio>
                            <Radio value="restaurant">Restaurante</Radio>
                        </RadioGroup>
                    </FormGroup>

                    <FormGroup>
                        <h2>Logo</h2>
                        <div id="logo-uploader">
                            <div id="logo-preview" />
                            <PreviewAndGetImage handleImage={this.handlePhotoURL} toWidth={80}>
                                <p style={{ color: "initial" }}>Seleccionar logo</p>
                            </PreviewAndGetImage>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <Button block appearance="primary" onClick={this.handleRegister}>Registrar mi negocio</Button>
                    </FormGroup>
                </Form>

                <style jsx>{`
                    #register-container {
                        padding: 2rem;
                        position: fixed;
                        top: ${userIsInDb !== null ? userIsInDb ? "100vh" : "0" : "100vh"};
                        right: 0;
                        bottom: 0;
                        left: 0;
                        transition: .2s;
                        z-index: 10000;
                        background-color: white;
                        background-image: url("/images/auth-background.jpg");
                        background-size: cover;
                        overflow-x: auto;
                    }

                    #register-container::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, .1), rgb(0, 0, 0, .8));
                        position: fixed;
                        top: ${userIsInDb !== null ? userIsInDb ? "100vh" : "0" : "100vh"};
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: -1;
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
                        background-color: rgba(255, 255, 255, .2);
                    }
                `}</style>
            </div>
        )
    }
}