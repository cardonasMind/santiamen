import { PureComponent } from "react";

import { Icon } from "rsuite";

import OrderDetailsDrawer from "./Drawer";
import OrderDetailsDrawerContent from "./DrawerContent";

export default class extends PureComponent {
	state = {
		showOrderDetailsDrawer: false
	}
	
	toggleShowOrderDetailsDrawer = () => this.setState(prevState => ({ showOrderDetailsDrawer: !prevState.showOrderDetailsDrawer }));
	
	render() {
		const { showOrderDetailsDrawer } = this.state;
		const { date, name, id, stage } = this.props;
		
		return (
			<div className="orderDetails" onClick={this.toggleShowOrderDetailsDrawer}>
				<Icon icon="angle-right" size="2x" />
				
				<OrderDetailsDrawer showOrderDetailsDrawer={showOrderDetailsDrawer} 
					toggleShowOrderDetailsDrawer={this.toggleShowOrderDetailsDrawer} date={date} name={name} id={id} stage={stage}>
						<OrderDetailsDrawerContent {...this.props} /> {/* date, details, id, lat, lng, name, order, sent, stage, time */}
				</OrderDetailsDrawer>
				
				<style jsx>{`
                    .orderDetails {
                        background: rgba(0, 0, 0, .05);
                        padding: .6rem;
                        margin: -1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
						transition: .2s;
                    }
					
					.orderDetails:hover {
                        background: rgba(0, 0, 0, .1);
                    }
                `}</style>
            </div>
		)
	}
}