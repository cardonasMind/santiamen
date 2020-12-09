import { Fragment, PureComponent } from "react";

import { Button } from "rsuite";

import FirstStage from "./FirstStage";
import SecondStage from "./SecondStage";

export default class extends PureComponent {
    state = {
        showFirstStage: false,
        showSecondStage: false
    }

    toggleShowFirstStage = () => 
		this.setState(prevState => ({ showFirstStage: !prevState.showFirstStage }));

    toggleShowSecondStage = () => 
		this.setState(prevState => ({ showSecondStage: !prevState.showSecondStage }));

    render() {
        const { showFirstStage, showSecondStage } = this.state;
		
		return (
			<Fragment>
				<div id="checkout-button">
					<Button appearance="primary" block onClick={this.toggleShowFirstStage}>Procesar pedido</Button>
				</div>
				
				<div id="checkout-container">
					{
						showFirstStage && 
							<FirstStage toggleShowFirstStage={this.toggleShowFirstStage} 
								toggleShowSecondStage={this.toggleShowSecondStage} />
					}
					
					{
						showSecondStage && <SecondStage toggleShowSecondStage={this.toggleShowSecondStage} />
					}
                </div>
		
				<style jsx>{`
					#checkout-button {
						position: sticky;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        background: white;
                        padding-top: 1rem;
					}
				
                    #checkout-container {
                        position: fixed;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: ${showFirstStage || showSecondStage ? "0" : "100vw"};
                        background: white;
                        transition: .1s;
                        overflow-x: auto;
                    }
                `}</style>
            </Fragment>
		)
    }
}