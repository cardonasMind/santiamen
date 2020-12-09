import { PureComponent } from "react";

import { Badge, Button } from "rsuite";

import { mainContext } from "../../../../context";

import BusinessOrdersDrawer from "./Drawer";
import OrderCard from "./OrderCard";

export default class extends PureComponent {
	static contextType = mainContext;
	
    state = {
        showBusinessOrdersDrawer: false
    }

    toggleShowBusinessOrdersDrawer = () =>
        this.setState(prevState => ({ showBusinessOrdersDrawer: !prevState.showBusinessOrdersDrawer }));
		
    render() {
		const { showBusinessOrdersDrawer } = this.state;
		const { businessOrders } = this.context.order;
		
        return (
            <div id="business-orders-container">
                <Badge content={businessOrders.length}>
                    <Button size="sm" onClick={this.toggleShowBusinessOrdersDrawer}>Ver pedidos</Button>
                </Badge>

                <BusinessOrdersDrawer showBusinessOrdersDrawer={showBusinessOrdersDrawer} 
					toggleShowBusinessOrdersDrawer={this.toggleShowBusinessOrdersDrawer}>
					<div id="business-orders">
                        {
							businessOrders.map(order => 
								<OrderCard key={order.key} id={order.key} {...order} />
                            )
                        }
                    </div>
				</BusinessOrdersDrawer>

                <style jsx>{`
                    #business-orders-container {
                        position: fixed;
                        bottom: 0;
                        background: white;
                        border-radius: .4rem .4rem 0 0;
                        z-index: 999;
                        padding: 1rem;
                        right: 0;
                        left: 0;
                        width: fit-content;
                        margin: auto;
                    }
					
					#business-orders {
						display: grid;
						grid-gap: 1rem;
					}
                `}</style>
            </div>
        )
    }
}