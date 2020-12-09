import { PureComponent } from "react";

import OrderStage from "./OrderStage";
import OrderDetails from "./OrderDetails";

export default class extends PureComponent {
    render() {
		const { date, name, order, stage } = this.props;

        return(
            <div className="orderCard">
                <div>
                    <p>{date}</p>
                    <h3>{name}</h3>

                    <OrderStage stage={stage} />
                </div>
				
				<OrderDetails {...this.props} /> {/* date, details, id, lat, lng, name, order, sent, stage, time */}
    
                <style jsx>{`
                    .orderCard {
                        background: rgba(0, 0, 0, .1);
                        padding: 1rem;
                        border-radius: .4rem 0 0 .4rem;
                        display: grid;
                        grid-template-columns: 1fr auto;
                        grid-gap: 1rem;
                    }
                `}</style>
            </div>
        )
    }
}