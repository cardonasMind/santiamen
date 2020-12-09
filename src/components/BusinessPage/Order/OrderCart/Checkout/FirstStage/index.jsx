import { PureComponent } from "react";

import { mainContext } from "../../../../../../context";

import { Notification, Form, FormGroup, Button } from "rsuite";

import LocationMap from "./LocationMap";
import OrderDetailsForm from "./OrderDetailsForm";

export default class extends PureComponent {
	static contextType = mainContext;
	
	state = {
		name: "",
		marker: undefined,
		details: "",
		map: null,
		lat: 0,
		lng: 0
	}
	
	handleChange = (value, e) => this.setState({ [e.target.name]: e.target.value });
	
	sendOrder = () => {
		const { name, details, lat, lng } = this.state;
		const { toggleShowFirstStage, toggleShowSecondStage } = this.props;	
		
        const { sendOrder } = this.context.order;

        if(name !== "" && details !== "" && lat !== 0 && lng !== 0) {
            sendOrder(name, details, lat, lng, () => {toggleShowFirstStage(); toggleShowSecondStage()});
        } else {
            Notification.info({
                title: "Espera",
                description: "Completa todos los campos."
            })
        }
    }
	
	render() {
		const { name, details } = this.state;
		const { toggleShowFirstStage } = this.props;
		
		return(
            <div id="first-checkout-stage">
				<Form>
					<LocationMap FirstStageThis={this} />
				
					<OrderDetailsForm name={name} details={details} handleChange={this.handleChange} />
			
					<FormGroup>
                        <div id="form-buttons">
                            <Button appearance="primary" onClick={this.sendOrder}>Enviar pedido</Button>
                            <Button onClick={toggleShowFirstStage}>Cancelar</Button>
                        </div>
                    </FormGroup>
                </Form>

                <style jsx>{`
                    #first-checkout-stage {
                        background: url("/images/misc/hablar-background.jpg");
                        color: white;
                        z-index: -1;
                        position: relative;
                        padding: 2rem 4rem 10rem 4rem;
                    }
					
                    #first-checkout-stage::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, .2), rgb(0, 0, 0, .6));
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: -1;
                    }
			
                    #form-buttons {
                        display: grid;
                        grid-template-columns: 1fr auto;
                        grid-gap: .6rem;
                    }
                `}</style>
            </div>
        )
	}
}