import { Fragment, PureComponent } from "react";

import { Drawer, Form, Input, Button, FormGroup, Notification } from "rsuite";

import firebase from "../../config/firebase";

export default class extends PureComponent {
    state = {
        showLoginDrawer: false,

        phoneScreen: true,
        phoneNumber: "",
        phoneCode: "",
        confirmationResult: {}
    }

    toggleShowLoginDrawer = () => 
        this.setState(prevState => ({ showLoginDrawer: !prevState.showLoginDrawer}))


    handleChange = (value, e) => this.setState({ [e.target.name]: e.target.value });

    handleSendPhoneCode = e => {
        const { phoneNumber } = this.state;
        
        if(phoneNumber.length === 10) {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(e.target, {
                'size': 'invisible',
                'callback': () => {}
            });

            const appVerifier = window.recaptchaVerifier;

            firebase.auth().signInWithPhoneNumber(`+57${phoneNumber}`, appVerifier)
            .then(confirmationResult => {
                this.setState({ phoneScreen: false });

                this.setState({ confirmationResult })

                Notification.success({
                    title: "¡Perfecto!",
                    description: "En breves recibirás un código de verificación en tú celular"
                });
            })
            .catch(error => {
                Notification.error({
                    title: "Ocurrió un error",
                    description: `Código: ${error.code}. Reinicia la página, y si el problema persiste
                    contacta con un administrador`
                });
            })
        } else {
            Notification.info({
                title: "Espera",
                description: "Por favor verifica tú número, recuerda que debe tener 10 dígitos"
            });
        }
    }

    handlePhoneCode = () => {
        const { phoneCode, confirmationResult } = this.state;

        if(phoneCode.length === 6) {
            confirmationResult.confirm(phoneCode)
            .then(() => {
                Notification.success({
                    title: "Perfecto",
                    description: '¡Acabas de iniciar sesión!'
                });

                this.toggleShowLoginDrawer();
            })

            .catch(error => {
                Notification.error({
                    title: "Ocurrió un error",
                    description: `Código: ${error.code}. Reinicia la página, y si el problema persiste
                    contacta con un administrador`
                });
            })
        } else {
            Notification.info({
                title: "Espera",
                description: "Comprueba tu código de verificación"
            });
        }
    }

    render() {
        const { phoneScreen, phoneNumber, phoneCode } = this.state;
        return(
            <Fragment>
                <h2 onClick={this.toggleShowLoginDrawer}>Acceder</h2>
                
                <Drawer full placement={"bottom"} show={this.state.showLoginDrawer} onHide={this.toggleShowLoginDrawer}>
                    <Drawer.Header><h1>Accede a tu negocio</h1></Drawer.Header>
                    <Drawer.Body>
                        <div id="login-form">
                            {
                                phoneScreen 
                                ?
                                    <Form>
                                        <FormGroup>
                                            <h2>Tu número de celular</h2>
                                            <Input 
                                                size="sm" 
                                                value={phoneNumber}
                                                type="number"
                                                name="phoneNumber"
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Button 
                                                appearance="primary" 
                                                onClick={e => this.handleSendPhoneCode(e)}
                                            >
                                                Enviar código
                                            </Button>
                                        </FormGroup>
                                    </Form>
                                :
                                    <Form>
                                        <FormGroup>
                                            <h2>Código de verificación</h2>
                                            <Input 
                                                type="number"
                                                size="sm" 
                                                name="phoneCode"
                                                value={phoneCode}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Button appearance="primary" onClick={this.handlePhoneCode}>Acceder</Button>
                                        </FormGroup>
                                    </Form>
                            }
                        </div>
                    </Drawer.Body>
                </Drawer>



                <style jsx>{`
                    #login-form {
                        text-align: center;
                    }

                    h2 {
                        margin-bottom: .4rem;
                    }
                
                `}</style>
            </Fragment>
        )
    }
}