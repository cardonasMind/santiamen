import { PureComponent } from "react";

import { mainContext } from "../../../../../../context";

import { Notification, Form, FormGroup, Input, InputNumber, Button } from "rsuite";

import  { PreviewAndGetImage } from "../../../../../../utils";

export default class extends PureComponent {
	static contextType = mainContext;
	
	state = {
		name: "",
		price: 0,
		photoURL: "",
		description: ""
	}
	
	handleChange = (value, e) => this.setState({ [e.target.name]: e.target.value });

    handlePrice = price => this.setState({ price });

    handlePhotoURL = photoURL => this.setState({ photoURL });
	
	newProduct = () => {
        const { name, price, photoURL, description } = this.state;
		const { toggleShowNewProductDrawer, id } = this.props;
		const { newProduct } = this.context.business;

        if(name !== "" && price !== 0 && photoURL !== "") {
            newProduct(`category${id}`, name, price, photoURL, description, toggleShowNewProductDrawer);
        } else {
            Notification.info({
                title: "Espera",
                description: "Nombre, precio e imágen no pueden estar vacios."
            });
        }   
    }
	
	render() {
		const { name, price, photoURL, description } = this.state; 
		const { toggleShowNewProductDrawer } = this.props;
		
		return (
			<Form> 
                <FormGroup>
                    <h2>Nombre del producto</h2>
                    <Input name="name" value={name} size="sm" onChange={this.handleChange} />
                </FormGroup>

                <FormGroup>
                    <h2>Precio</h2>
                    <InputNumber name="price" step={50} value={price} onChange={this.handlePrice} 
						style={{ width: "auto" }} prefix="$" min={50} />
                    <p>* Escribe el precio sin puntos ni comas.</p>
                </FormGroup>

                <FormGroup>
                    <h2>Descripción</h2>
                    <Input name="description" value={description} onChange={this.handleChange}
                        componentClass="textarea" rows={3} style={{ minWidth: "100%" }} />
                </FormGroup>

                <FormGroup>
                    <h2>Imágen</h2>
                    <div className="productImage">
                        <div className="productImagePreview" />
                        <PreviewAndGetImage handleImage={this.handlePhotoURL} toWidth={300}>
                            <p>Seleccionar imágen</p>
                        </PreviewAndGetImage>
                    </div>
                </FormGroup>

                <FormGroup>
                    <div className="newProductButtons">
                        <Button appearance="primary" onClick={this.newProduct}>Agregar</Button>
                        <Button appearance="subtle" onClick={toggleShowNewProductDrawer}>Cancelar</Button>
                    </div>
                </FormGroup>

                <style jsx>{`
                    h2 {
                        margin-bottom: .4rem;
                    }
					
                    .productImage {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .6rem;
                    }
					
                    .productImagePreview {
                        width: 10rem;
                        height: 20rem;
                        border-radius: .4rem;
                        background-color: rgba(0, 0, 0, .1);
                        background-image: url(${photoURL ? photoURL : ""});
                        background-size: cover;
                        background-position: center;
                    }
					
                    .newProductButtons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-gap: .6rem;
                    }
                `}</style>
            </Form>
		)
	}
}