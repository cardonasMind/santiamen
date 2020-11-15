import { Fragment, PureComponent } from "react";

import { Button } from "rsuite";

import FirstCheckoutStage from "./FirstCheckoutStage";
import SecondCheckoutStage from "./SecondCheckoutStage";

export default class extends PureComponent {
    state = {
        showFirstCheckoutStage: false,
        showSecondCheckoutStage: false
    }

    toggleShowFirstCheckoutStage = () => 
        this.setState(prevState => ({ showFirstCheckoutStage: !prevState.showFirstCheckoutStage }));

    toggleShowSecondCheckoutStage = () => 
        this.setState(prevState => ({ showSecondCheckoutStage: !prevState.showSecondCheckoutStage }));


    render() {
        const { showFirstCheckoutStage, showSecondCheckoutStage } = this.state;
        const { businessKey } = this.props;

        return(
            <Fragment>
                <Button appearance="primary" block onClick={this.toggleShowFirstCheckoutStage}>Procesar pedido</Button>

                <div id="checkout-container">
                    {
                        showFirstCheckoutStage && 
                            <FirstCheckoutStage 
                                businessKey={businessKey}
                                toggleShowFirstCheckoutStage={this.toggleShowFirstCheckoutStage} 
                                toggleShowSecondCheckoutStage={this.toggleShowSecondCheckoutStage}    
                            />
                    }

                    {
                        showSecondCheckoutStage &&
                            <SecondCheckoutStage 
                                toggleShowSecondCheckoutStage={this.toggleShowSecondCheckoutStage}
                            />
                    }
                </div>

                <style jsx>{`
                    #checkout-container {
                        position: fixed;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: ${showFirstCheckoutStage || showSecondCheckoutStage ? "0" : "100vw"};
                        background: white;
                        transition: .1s;
                        
                        overflow-x: auto;
                    }
                
                `}</style>
            </Fragment>
        )
    }
}