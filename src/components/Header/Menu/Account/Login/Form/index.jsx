import { PureComponent } from "react";

import { firebase } from "../../../../../../config";

import { Notification } from "rsuite";

import PhoneScreen from "./PhoneScreen";
import CodeScreen from "./CodeScreen";

export default class extends PureComponent {
	state = {
		phoneScreen: true,
        phoneNumber: "",
        phoneCode: "",
        confirmationResult: {}
	}
	
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
			<div id="login-form">
				{ phoneScreen 
					? <PhoneScreen phoneNumber={phoneNumber} handleChange={this.handleChange} handleSendPhoneCode={this.handleSendPhoneCode} /> 
					: <CodeScreen phoneCode={phoneCode} handleChange={this.handleChange} handlePhoneCode={this.handlePhoneCode} /> }
			
				<style jsx>{`
					#login-form {
						background-image: url("/images/misc/auth-background.jpg");
						background-size: cover;
						color: white;
						padding: 6rem 2rem;
					}
				`}</style>
			</div>
		)
	}
}