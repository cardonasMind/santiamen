import { PureComponent, Fragment } from "react";

import { MainContext } from "../config/MainContext";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Button, Icon, Drawer, Form, FormGroup, Input, Toggle, Notification, Modal } from "rsuite";

import Product from "./Product";


class UpdateCategoryForm extends PureComponent {
    state = {
        title: this.props.title,
        visible: this.props.visible
    }

    handleTitle = title => this.setState({ title });

    handleVisible = visible => this.setState({ visible });

    updateCategory = () => {
        const { title, visible } = this.state;
        const { id, updateCategory, toggleShowModifyCategoryDrawer } = this.props;

        if(title !== "") {
            updateCategory(`category${id}`, title, visible);
            toggleShowModifyCategoryDrawer();
        } else {
            Notification.info({
                title: "Espera",
                description: "Escribe el nombre de la categoría."
            });
        }
    }

    render() {
        const { title, visible } = this.state;
        const { toggleShowModifyCategoryDrawer } = this.props;

        return(
            <Form>
                <FormGroup>
                    <div id="category-visible">
                        <h2>Visibilidad</h2>
                        <Toggle 
                            checkedChildren="Visible" unCheckedChildren="Oculto"
                            checked={visible} onChange={this.handleVisible}
                        />
                    </div>
                </FormGroup>

                <FormGroup>
                    <h2>Nombre de categoría</h2>
                    <Input size="sm" value={title} onChange={this.handleTitle} />
                </FormGroup>
                            
                <FormGroup>
                    <div id="category-buttons">
                        <Button appearance="primary" onClick={this.updateCategory}>Guardar</Button>
                        <Button appearance="subtle" onClick={toggleShowModifyCategoryDrawer}>Cancelar</Button>
                    </div>
                </FormGroup>

                <style jsx>{`
                    #category-visible {
                        display: inline-flex;
                        grid-gap: .6rem;
                    }

                    #category-buttons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-gap: .6rem;
                    }
                `}</style>
            </Form>
        )
    }
}


class AddNewProductForm extends PureComponent {
    state = {
        name: "",
        price: 0,
        photoURL: "",
        description: ""
    }

    addNewProduct = () => {
        const { name, price, photoURL, description } = this.state;
        const { id, toggleShowAddProductDrawer, addNewProduct } = this.props;

        addNewProduct(`category${id}`, name, price, photoURL, description);
        toggleShowAddProductDrawer();
    }



    render() {
        const { toggleShowAddProductDrawer } = this.props;

        return(
            <Form> 
                <FormGroup>
                    <h2>Nombre producto</h2>
                    <Input size="sm" />
                </FormGroup>

                <FormGroup>
                    <h2>Precio</h2>
                    <Input size="sm" />
                </FormGroup>

                <FormGroup>
                    <h2>Descripción</h2>
                    <Input size="sm" />
                </FormGroup>

                <FormGroup>
                    <div id="add-product-buttons">
                        <Button appearance="primary" onClick={this.addNewProduct}>Agregar</Button>
                        <Button appearance="subtle" onClick={toggleShowAddProductDrawer}>Cancelar</Button>
                    </div>
                </FormGroup>

                <style jsx>{`
                    #add-product-buttons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-gap: .6rem;
                    }
                `}</style>
            </Form>
        )
    }
}



class ProductWithButtons extends PureComponent {
    state = {
        showDeleteProductModal: false
    }

    toggleShowDeleteProductModal = () => 
        this.setState(prevState => ({ showDeleteProductModal: !prevState.showDeleteProductModal }))

    deleteProduct = () => {



    }

    render() {
        const { showDeleteProductModal } = this.state;
        const { name } = this.props;

        return(
            <div className="productWithButtons">
                <div className="deleteProduct">
                    <Button color="red" size="xs" onClick={this.toggleShowDeleteProductModal} ><Icon icon="trash-o" /></Button>
                </div>

                <Product {...this.props} />

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
                            Estás a punto de eliminar <b>{name}</b>😢, recuerda que esta acción no se puede deshacer.
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
                    .productWithButtons {

                    }
                `}</style>
            </div>
        )
    }
}





export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        showModifyCategoryDrawer: false,
        showAddProductDrawer: false
    }

    toggleShowModifyCategoryDrawer = () => 
        this.setState(prevState => ({ showModifyCategoryDrawer: !prevState.showModifyCategoryDrawer }));

    toggleShowAddProductDrawer = () => 
        this.setState(prevState => ({ showAddProductDrawer: !prevState.showAddProductDrawer }));


    render() {
        const { showModifyCategoryDrawer, showAddProductDrawer } = this.state;
        const { businessOwner = false, id, visible, title = "", products = [] } = this.props;
        const { updateCategory, addNewProduct } = this.context;

        return(
            <div className="category">
                <h1>
                    {
                        title === ""
                        ?
                            <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .2)">
                                <Skeleton width="16rem" height="1.6rem" duration={3} />
                            </SkeletonTheme>
                        : title
                    }
                    {
                        businessOwner && 
                            <div className="editCategory">
                                <Button onClick={this.toggleShowModifyCategoryDrawer} appearance="primary" size="xs" ><Icon icon="gear" /></Button>
                            </div>
                    }
                </h1>
    
                <div className="categoryProductsContainer">
                    <div className="categoryProducts">
                        {
                            businessOwner && 
                                <div className="addNewProductContainer">
                                    <div className="addNewProduct" onClick={this.toggleShowAddProductDrawer}>
                                        <Icon icon="plus" />
                                    </div>
                                </div>
                        }

                        {
                            products.length > 0 
                            ?
                                products.map(product => 
                                    businessOwner 
                                    ?
                                        <ProductWithButtons 
                                            key={product.key}
                                            category={id}
                                            id={product.key}
                                            name={product.name}
                                            description={product.description}
                                            price={product.price}
                                            photoURL={product.photoURL}
                                        />
                                    :
                                        <Product
                                            key={product.key}
                                            id={product.key}
                                            name={product.name}
                                            description={product.description}
                                            price={product.price}
                                            photoURL={product.photoURL}
                                        />
                                )
                            :
    
                                <Fragment>
                                    <Product />
                                    <Product />
                                    <Product />
                                </Fragment>
                        }
                    </div>
                </div>



                <Drawer placement="bottom" full show={showModifyCategoryDrawer} onHide={this.toggleShowModifyCategoryDrawer}>
                    <Drawer.Header><h1>Modificar: {title}</h1></Drawer.Header>
                    <Drawer.Body>
                        <UpdateCategoryForm 
                            id={id}
                            visible={visible}
                            title={title}
                            updateCategory={updateCategory}
                            toggleShowModifyCategoryDrawer={this.toggleShowModifyCategoryDrawer}
                        />
                    </Drawer.Body>
                </Drawer>


                <Drawer placement="bottom" full show={showAddProductDrawer} onHide={this.toggleShowAddProductDrawer}>
                    <Drawer.Header><h1>Agregar nuevo producto</h1></Drawer.Header>
                    <Drawer.Body>
                        <AddNewProductForm 
                            id={id}
                            addNewProduct={addNewProduct}
                            toggleShowAddProductDrawer={this.toggleShowAddProductDrawer}
                        />
                    </Drawer.Body>
                </Drawer>

    
    
                <style jsx>{`
                    .category {
                        margin: 1rem;
                    }
    
                    .category h1 {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .6rem;
                    }
    
    
    
                    .categoryProductsContainer {
                        overflow-x: auto;
                        margin: auto -1rem;
                        padding: .6rem 1rem;
                    }
    
                    .categoryProducts {
                        display: inline-grid;
                        grid-gap: 1rem;
                        grid-auto-flow: column;
                    }
    
                    .addNewProductContainer {
                        background: rgba(255, 255, 255, .6);
                        width: 10rem;
                        height: 20rem;
                        border-radius: .6rem;
                        border: 1px solid rgb(0, 0, 0, .2);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                    .addNewProductContainer .addNewProduct {
                        border: 1px dashed rgba(0, 0, 0, .4);
                        border-radius: 50%;
                        padding: 1rem;
                        transition: .4s;
                    }

                    .addNewProductContainer .addNewProduct:hover {
                        background: rgba(0, 0, 0, .2);
                    }
                `}</style>
            </div>
        )
    }
}