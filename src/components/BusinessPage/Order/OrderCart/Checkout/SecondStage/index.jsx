import { PureComponent } from "react";

import { mainContext } from "../../../../../../context";

import Link from "next/link";

import { Notification } from "rsuite";

import OrderStages from "../../../OrderStages";
import OrderLocation from "./OrderLocation";
import { OrderProductsList } from "../../../OrderProduct";
import GoHomeButton from "./GoHomeButton";

export default class extends PureComponent {
	static contextType = mainContext;
	
	state = {
		stage: 0,
		time: ""
	}
	
	componentDidMount() {
        const { ref } = this.context.order.orderInfo;
		
        ref.onSnapshot(doc => {
            const { stage, time } = doc.data();

            this.setState({ stage, time });
        },
        error => 
            Notification.error({
                title: "Ocurrió un error",
                description: error
            })
        );
    }
	
	render() {
		const { stage, time } = this.state;
		const { orderCart, orderInfo } = this.context.order;
		const { details } = orderInfo;
		
		return (
			<div id="second-checkout-stage">
                <div id="header">
                    <h1>¡Todo en orden. Recibirás tu pedido en un santiamén!</h1>
                </div>

                <div id="order-stages">
                    <OrderStages stage={stage} time={time} />
				</div>
				
				<main>
                    <OrderLocation orderInfo={orderInfo} details={details} />
					
					<div id="order-cart-products">
						<OrderProductsList products={orderCart} />
					</div>

                    <div>
                        <p>Si no recibes tu pedido, <Link href="/hablar"><a>envíanos un mensaje</a></Link>, 
                        estaremos ahí para tí.</p>
                    </div>
					
					<GoHomeButton />
                </main>

                <style jsx>{`
                    #second-checkout-stage {
                        background: url("/images/misc/hablar-background.jpg");
                        color: white;
                        z-index: -1;
                        position: relative;
                        padding-bottom: 4rem;
                        overflow-x: auto;
                    }
					
                    #second-checkout-stage::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0, 0.6));
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: -1;
                    }
					
                    #header {
                        text-align: right;
                        padding: 2rem 4rem 0;
                    }
					
					#order-stages {
						margin-top: 2rem;
					}
		
                    main {
                        padding: 2rem 4rem;
                        display: grid;
                        grid-gap: 1rem;
                    }
					
                    main h2 {
                        margin-bottom: .4rem;
                    }
					
					#order-cart-products {
						background: rgba(0, 0, 0, .15);
						margin: auto -4rem;
						padding: 4rem;
					}
                `}</style>
			</div>
		)
	}
}