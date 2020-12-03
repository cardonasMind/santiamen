import { PureComponent } from "react";

import { Notification, Form, FormGroup, Toggle, Input, Button } from "rsuite";

export default class extends PureComponent {
    state = {
        title: this.props.title,
        visible: this.props.visible
    }

    handleTitle = title => this.setState({ title });

    handleVisible = visible => this.setState({ visible });

    updateCategory = () => {
        const { title, visible } = this.state;
        const { id, updateCategory, toggleShowEditCategoryDrawer } = this.props;
        
        alert("¡¡ACTUALIZAR CATEGORÍA!!");

        /*if(title !== "") {
            updateCategory(`category${id}`, title, visible);
            toggleShowEditCategoryDrawer();
        } else {
            Notification.info({
                title: "Espera",
                description: "Escribe el nombre de la categoría."
            });
        }*/
    }

    render() {
        const { visible, title } = this.state;
        const { toggleShowEditCategoryDrawer } = this.props;
        
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
                        <Button appearance="subtle" onClick={toggleShowEditCategoryDrawer}>Cancelar</Button>
                    </div>
                </FormGroup>

                <style jsx>{`
                    h2 {
                        margin-bottom: .4rem;
                    }

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