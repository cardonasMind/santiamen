import { PureComponent } from "react";

import { Button, Icon, Drawer, Form, FormGroup, Toggle, Input } from "rsuite";

import { MainContext } from "../config/MainContext";

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        showEditBusinessDrawer: false,

        active: this.context.active,
        name: this.context.name,
        photoURL: "",
        backgroundURL: ""
    }

    toggleShowEditBusinessDrawer = () => 
        this.setState(prevState => ({ showEditBusinessDrawer: !prevState.showEditBusinessDrawer }))

    handleName = name => this.setState({ name });

    handleActive = active => this.setState({ active });

    updateBusiness = () => {
        const { active, name } = this.state;
        const { updateBusiness } = this.context;

        updateBusiness(active, name);
        this.toggleShowEditBusinessDrawer();
    }

    render() {
        const { showEditBusinessDrawer, active, name } = this.state;

        return (
            <div id="edit-business">
                <Button appearance="primary" size="xs" onClick={this.toggleShowEditBusinessDrawer} ><Icon icon="gear" /></Button>

                <Drawer placement="bottom" full show={showEditBusinessDrawer} onHide={this.toggleShowEditBusinessDrawer}>
                    <Drawer.Header><h1>Editar mi negocio</h1></Drawer.Header>
                    <Drawer.Body>
                        <Form>
                            <FormGroup>
                                <h2>Estado del negocio</h2>
                                <Toggle 
                                    checkedChildren="Recibiendo pedidos" unCheckedChildren="Cerrado"
                                    checked={active} onChange={this.handleActive}
                                />
                            </FormGroup>

                            <FormGroup>
                                <h2>Nombre</h2>
                                <Input size="sm" value={name} onChange={this.handleName} />
                            </FormGroup>

                            <FormGroup>
                                <h2>Logo</h2>
                            </FormGroup>

                            <FormGroup>
                                <h2>Imágen de fondo</h2>
                            </FormGroup>

                            <FormGroup>
                                <div id="business-buttons">
                                    <Button appearance="primary" onClick={this.updateBusiness}>Guardar</Button>
                                    <Button appearance="subtle" onClick={this.toggleShowEditBusinessDrawer} >Cancelar</Button>
                                </div>
                            </FormGroup>
                        </Form>

                    </Drawer.Body>
                </Drawer>


                <style jsx>{`
                    #edit-business {
                        position: absolute;
                        right: 1rem;
                        bottom: 1rem;
                    }

                    h2 {
                        margin-bottom: .4rem;
                    }

                    #business-buttons {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-gap: .6rem;
                    }
                `}</style>
            </div>
        )
    }
}