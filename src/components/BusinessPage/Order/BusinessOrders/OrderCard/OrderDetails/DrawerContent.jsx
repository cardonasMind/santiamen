import { PureComponent, Fragment, createRef } from "react";

import OrderStages from "../../../OrderStages";
import { OrderProductsList } from "../../../OrderProduct";

const ReducedOrderStages = ({ stage }) => {
    return(
        <div className="reducedOrderStage">
            <OrderStages hideMessage stage={stage} />

            <style jsx global>{`
                .reducedOrderStage {
                    margin: .4rem 0;
                }
				
                .reducedOrderStage .orderStage .orderStageProgress {
                    margin-top: .3rem;
                }
				
                .reducedOrderStage .orderStage .orderStageItem img {
                    width: 2.6rem;
                } 
                
                .reducedOrderStage .orderStage .orderStageItem p {
                    font-size: .8rem;
                }
            `}</style>
        </div>
    )
}

export default class extends PureComponent {
	state = {
		mapRef: createRef()
	}
	
	componentDidMount() {	
        const { mapRef } = this.state;
        const { lat, lng } = this.props;

        const map = L.map(mapRef.current).setView([lat, lng], 14);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup('Enviar pedido aquí.')
            .openPopup();
	}
	
	render() {
		const { mapRef } = this.state;
		const { stage, details, order } = this.props;
		
		return (
			<Fragment>
				<ReducedOrderStages stage={stage} />
				
				<div id="order-location">
					<div ref={mapRef} id="mapId" />
					* {details}
				</div>
				
				<OrderProductsList products={order} />
				
				 <style jsx>{`
					#order-location {
						margin: 1rem 0;
					}
				 
                    #mapId {
                        height: 240px;
                    }
                `}</style>
			</Fragment>
		)
	}
}