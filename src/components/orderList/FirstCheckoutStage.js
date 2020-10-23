import { PureComponent } from "react";

import { Form, Button, Input, FormGroup, IconButton, Icon, Notification } from "rsuite";

import { MainContext } from "../../config/MainContext";

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        name: "",
        lat: 0,
        lng: 0
    }

    handleChange = value => this.setState({ name: value });

    sendOrder = () => {
        const { name, lat, lng } = this.state;
        const { toggleShowFirstCheckoutStage, toggleShowSecondCheckoutStage } = this.props;
        const { sendOrder } = this.context;

        if(name !== "") {
            sendOrder(name, "BUSINESSID", lat, lng, () => {
                toggleShowFirstCheckoutStage();
                toggleShowSecondCheckoutStage();}
            );
        } else {
            Notification.info({
                title: "Espera",
                description: "Escribe tu nombre."
            })
        }
    }

    componentDidMount() {
        const map = L.map('mapid').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();

    }

    render() {
        const { name } = this.state;
        const { toggleShowFirstCheckoutStage } = this.props;

        return(
            <div id="first-checkout-stage">
                <Form>
                    <FormGroup>
                        <h2>¿Dónde enviar tu pedido?</h2>
                        <div id="map-container">
                            <div id="mapid"></div>

                            <div id="my-ubication-button">
                                <IconButton appearance="primary" size="sm" icon={<Icon icon="target" />}>Mi ubicación</IconButton>
                            </div>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <h2>Digíta tu nombre</h2>
                        <Input size="sm" value={name} onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <div id="form-buttons">
                            <Button appearance="primary" onClick={this.sendOrder}>Enviar pedido</Button>
                            <Button onClick={toggleShowFirstCheckoutStage}>Cancelar</Button>
                        </div>
                    </FormGroup>
                </Form>

                <style jsx>{`
                    #first-checkout-stage {
                        background: url("/images/hablar-background.jpg");
                        background-size: cover;
                        height: 100%;
                        color: white;
                        z-index: -1;
                        position: relative;
                        padding: 2rem 4rem;
                    }

                    #first-checkout-stage::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, .2), rgb(0, 0, 0, .6));
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: -1;
                    }

                    h2 {
                        margin-bottom: .4rem;
                    }

                    #map-container {
                        position: relative;
                    }

                    #mapid {
                        height: 240px;
                        margin: 0 -4rem;
                    }

                    #my-ubication-button {
                        position: absolute;
                        margin-right: -3rem;
                        top: 1rem;
                        right: 0;
                        z-index: 999;
                    }

                    #form-buttons {
                        display: grid;
                        grid-template-columns: 1fr auto;
                        grid-gap: .6rem;
                    }

                `}</style>
            </div>
        )
    }
}