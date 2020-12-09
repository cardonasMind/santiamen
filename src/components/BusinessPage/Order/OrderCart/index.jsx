import { PureComponent } from "react";

import { mainContext } from "../../../../context";

import { Badge, Icon, Button } from "rsuite";

import OrderCartDrawer from "./Drawer";

export default class extends PureComponent {
    static contextType = mainContext;
	
	state = {
		showOrderCartDrawer: false
	}
	
	toggleShowOrderCartDrawer = () => this.setState(prevState => ({ showOrderCartDrawer: !prevState.showOrderCartDrawer }));
    
    render() {
        const { orderCart } = this.context.order;
		const { showOrderCartDrawer } = this.state;
        
        return (
            <div id="order-list">
                <Badge content={orderCart.length}>
                    <Button size="sm" onClick={this.toggleShowOrderCartDrawer}><Icon icon="shopping-cart" /> Tu lista de pedido</Button>
                </Badge>
				
				<OrderCartDrawer showOrderCartDrawer={showOrderCartDrawer} toggleShowOrderCartDrawer={this.toggleShowOrderCartDrawer} orderCart={orderCart} />
                
                <style jsx>{`
                    #order-list {
                        position: fixed;
                        right: 0;
                        bottom: ${orderCart.length > 0 ? 0 : "-100vh"};
                        left: 0;
                        background: white;
                        padding: 1rem;
                        transition: .4s;
                        z-index: 999;
                    }
                `}</style>
            </div>
        )
    }
}