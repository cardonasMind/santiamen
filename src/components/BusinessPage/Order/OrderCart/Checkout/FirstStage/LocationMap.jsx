import { PureComponent } from "react";

import { Notification, FormGroup, IconButton, Icon } from "rsuite";

export default class extends PureComponent {
	componentDidMount() {
		const { FirstStageThis } = this.props;
		
        const map = L.map('mapId').setView([6.1879896, -74.9976044], 14);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Toggle users to set point
        map.on('click', e => {        
            const markerLocation = e.latlng;
            const { lat, lng } = markerLocation;

            FirstStageThis.setState({ lat, lng });
            this.renderMapMarker();
        });
        
        FirstStageThis.setState({ map });
    }

    renderMapMarker = () => {
		const { FirstStageThis } = this.props;
		
        const { map, marker, lat, lng } = FirstStageThis.state;

        if(marker !== undefined) map.removeLayer(marker)

        const newMarker = L.marker([lat, lng]).addTo(map).bindPopup('Estás aquí.').openPopup();

        FirstStageThis.setState({ marker: newMarker });

        map.addLayer(newMarker);
    }
	
	getUserLocation = () => {
		const { FirstStageThis } = this.props;
		
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { coords } = position;
                FirstStageThis.setState({ lat: coords.latitude, lng: coords.longitude });

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
		return (
			<FormGroup>
				<h2>¿Dónde enviar tu pedido?</h2>
				<div id="map-container">
					<div id="mapId"></div>

                    <div id="my-ubication-button">
						<IconButton onClick={this.getUserLocation} appearance="primary" size="sm" icon={<Icon icon="target" />}>
							Mi ubicación
						</IconButton>
                    </div>
                </div>
                * Haz click sobre el mapa para señalar dónde enviar tu pedido.
				
				<style jsx>{`		
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
                `}</style>
            </FormGroup>
		)
	}
}