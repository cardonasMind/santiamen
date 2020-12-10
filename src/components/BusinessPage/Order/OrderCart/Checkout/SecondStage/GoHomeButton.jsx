import { PureComponent } from "react";

import Router from "next/router";

import { Button, Modal, Icon } from "rsuite";

export default class extends PureComponent {
	state = {
		showGoHomeModal: false
	}
	
	toggleShowGoHomeModal = () => this.setState(prevState => ({ showGoHomeModal: !prevState.showGoHomeModal }));
	
	// Go home when users clicks on VOlver al inicio inside goHomeModal, using Router.push the page don´t refresh, it´s like a Link
	goHome = () => Router.push("/");
	
	render() {
		const { showGoHomeModal } = this.state;
		
		return (
			<div>
                <Button onClick={this.toggleShowGoHomeModal} appearance="primary" block>
					Volver al inicio
                </Button>

                <Modal show={showGoHomeModal} style={{ width: "auto" }}>
					<Modal.Body>
						<div style={{ textAlign: "center", marginBottom: "1rem" }}>
							<Icon
								icon="remind"
								style={{
									color: '#ffb300',
                                    fontSize: "2rem"
                                }}
                            />
                        </div>
                        <p style={{ textAlign: "justify" }}>Si vuelves al inicio no podrás conocer el estado de tu pedido.</p>
                    </Modal.Body>
					<Modal.Footer>
                        <Button onClick={this.goHome} appearance="primary">Volver al inicio</Button>
                        <Button onClick={this.toggleShowGoHomeModal} appearance="subtle">Cancelar</Button>
					</Modal.Footer>
                </Modal>
			</div>
		)
	}
}