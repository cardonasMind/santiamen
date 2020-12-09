import { PureComponent } from "react";

export default class extends PureComponent {
	componentDidMount() {
        const { orderInfo } = this.props;
        const { lat, lng } = orderInfo;

        const map = L.map('mapId').setView([lat, lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map).bindPopup('Enviaremos tu pedido aquí.').openPopup();
    }
	
	render() {
		const { details } = this.props;
		
		return (
			<div>
				<h2>Dirección de envio</h2>
				<div id="mapId" />
				 * {details}
				 
				<style jsx>{`
					h2 {
						margin-bottom: .4rem;
					}
					
					#mapId {
                        height: 240px;
                        margin: 0 -4rem;
                    }
				`}</style>
			</div>
		)	
	}
}