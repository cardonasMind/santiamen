import { PureComponent } from "react";

import { mainContext } from "../../../../../../context";

import { Button, Icon, Modal } from "rsuite";

export default class extends PureComponent {
	static contextType = mainContext;
	
	state = {
		showDeleteProductModal: false
	}
	
	toggleShowDeleteProductModal = () => this.setState(prevState => ({ showDeleteProductModal: !prevState.showDeleteProductModal }));
	
	deleteProduct = () => {
        const { id, category } = this.props;
		const { deleteProduct } = this.context.business;

        deleteProduct(`category${category}`, id);
        this.toggleShowDeleteProductModal();
    }
	
	render() {
		const { showDeleteProductModal } = this.state;
		const { isBusinessOwner, name } = this.props;
		
		if(isBusinessOwner) 
			return ( 
				<div className="deleteProduct">
					<Button color="red" size="xs" onClick={this.toggleShowDeleteProductModal}><Icon icon="trash-o" /></Button>
					
					<Modal show={showDeleteProductModal} style={{ width: "auto" }}>
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
							<p style={{ textAlign: "justify" }}>Estás a punto de eliminar <b>{name}</b>, recuerda que esta acción no se puede deshacer.</p>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={this.deleteProduct} color="red">
								Eliminar
							</Button>
							<Button onClick={this.toggleShowDeleteProductModal} appearance="subtle">
								Cancelar
							</Button>
						</Modal.Footer>
					</Modal>
					
					<style jsx>{`
						.deleteProduct {
							position: absolute;
							z-index: 1;
							top: 0;
						}
					`}</style>
				</div>
			)
		else return null
	}
}