import { PureComponent } from "react";

import { Form, Button, Input, FormGroup, IconButton, Icon, Notification } from "rsuite";

import { MainContext } from "../../config/MainContext";

export default class extends PureComponent {
    static contextType = MainContext;

    constructor() {
        super();

        this.state = {
            name: "",
            marker: undefined,
            details: "",
            map: null,
            lat: 0,
            lng: 0
        }
    }

    componentDidMount() {
        const map = L.map('mapId').setView([6.1879896, -74.9976044], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Toggle users to set point
        map.on('click', e => {        
            const markerLocation = e.latlng;
            const { lat, lng } = markerLocation;

            this.setState({ lat, lng });
            this.renderMapMarker();
        });
        
        this.setState({ map });
    }

    renderMapMarker = () => {
        const { map, marker, lat, lng } = this.state;

        if(marker !== undefined) map.removeLayer(marker)

        const newMarker = L.marker([lat, lng]).addTo(map).bindPopup('Estás aquí.').openPopup();

        this.setState({ marker: newMarker });

        map.addLayer(newMarker);

        //map.setView([lat, lng], 16);
    }

    handleChange = (value, e) => this.setState({ [e.target.name]: e.target.value });

    sendOrder = () => {
        const { name, details, lat, lng } = this.state;
        const { businessKey, toggleShowFirstCheckoutStage, toggleShowSecondCheckoutStage } = this.props;
        const { sendOrder } = this.context;

        if(name !== "" && details !== "" && lat !== 0 && lng !== 0) {
            sendOrder(name, details, businessKey, lat, lng, () => {
                toggleShowFirstCheckoutStage();
                toggleShowSecondCheckoutStage();}
            );
        } else {
            Notification.info({
                title: "Espera",
                description: "Completa todos los campos."
            })
        }
    }

    getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { coords } = position;
                this.setState({ lat: coords.latitude, lng: coords.longitude });

                this.renderMapMarker();
            })
        } else { 
            Notification.error({
                title: "Ocurrió un error",
                description: "Parece que tu navegador no permite esto."
            })
        }
    }

    render() {
        const { name, details } = this.state;
        const { toggleShowFirstCheckoutStage } = this.props;

        return(
            <div id="first-checkout-stage">
                <Form>
                    <FormGroup>
                        <h2>¿Dónde enviar tu pedido?</h2>
                        <div id="map-container">
                            <div id="mapId"></div>

                            <div id="my-ubication-button">
                                <IconButton onClick={this.getUserLocation} appearance="primary" size="sm" icon={<Icon icon="target" />}>Mi ubicación</IconButton>
                            </div>
                        </div>
                        * Haz click sobre el mapa para señalar dónde enviar tu pedido.
                    </FormGroup>

                    <FormGroup>
                        <h2>Indicaciones</h2>
                        <Input name="details" size="sm" placeholder="Casa color blanco al lado de..." value={details} onChange={this.handleChange} />
                        * Ayúdanos a encontrarte más fácilmente.
                    </FormGroup>

                    <FormGroup>
                        <h2>Digíta tu nombre</h2>
                        <Input name="name" size="sm" value={name} onChange={this.handleChange} />
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
                        padding: 2rem 4rem 10rem 4rem;
                        overflow-x: auto;
                    }

                    #first-checkout-stage::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, .2), rgb(0, 0, 0, .6));
                        position: fixed;
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

                    #mapId {
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