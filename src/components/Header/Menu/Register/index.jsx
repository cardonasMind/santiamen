import { PureComponent } from "react";

import { mainContext } from "../../../../context";

import { Notification } from "rsuite";

import RegisterForm from "./Form";

export default class extends PureComponent {
    static contextType = mainContext;
    
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
        const { registerBusiness } = this.context.business;
        
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
        // This checks if userIsInDb is null, true or false
        const { userIsInDB } = this.context.user;

        return (
            <div id="register-container">
                <RegisterForm {...this.state} handleName={this.handleName} handleCategory={this.handleCategory} handlePhotoURL={this.handlePhotoURL} handleRegister={this.handleRegister} />
                
                <style jsx>{`
                    #register-container {
                        padding: 2rem;
                        position: fixed;
                        top: ${userIsInDB !== null ? userIsInDB ? "100vh" : "0" : "100vh"};
                        right: 0;
                        bottom: 0;
                        left: 0;
                        transition: .2s;
                        z-index: 10000;
                        background-color: white;
                        background-image: url("/images/misc/auth-background.jpg");
                        background-size: cover;
                        overflow-x: auto;
                    }

                    #register-container::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, .1), rgb(0, 0, 0, .8));
                        position: fixed;
                        top: ${userIsInDB !== null ? userIsInDB ? "100vh" : "0" : "100vh"};
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: -1;
                    }
                `}</style>
            </div>
        )
    }
}