import { PureComponent } from "react";

import { Button, Icon, Drawer, Form, FormGroup, Toggle, Input, Uploader, Dropdown } from "rsuite";

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
                                <div id="logo-uploader">
                                    <div id="logo-preview" />
                                    <div>
                                        <Uploader action="" draggable>
                                            <p>Seleccionar logo</p>
                                        </Uploader>
                                    </div>
                                </div>
                            </FormGroup>

                            <FormGroup>
                                <h2>Imágen de fondo</h2>
                                <div id="background-uploader">
                                    <div id="background-preview" />
                                    <Uploader action="" draggable>
                                        <p>Seleccionar imágen de fondo</p>
                                    </Uploader>
                                </div>
                                <h3>Preseleccionados</h3>
                                <Dropdown title="Seleccionar">
                                    <Dropdown.Item>New File</Dropdown.Item>
                                    <Dropdown.Item>New File with Current Profile</Dropdown.Item>
                                    <Dropdown.Item>Download As...</Dropdown.Item>
                                    <Dropdown.Item>Export PDF</Dropdown.Item>
                                    <Dropdown.Item>Export HTML</Dropdown.Item>
                                    <Dropdown.Item>Settings</Dropdown.Item>
                                    <Dropdown.Item>About</Dropdown.Item>
                                </Dropdown>
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

                    #logo-uploader {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .6rem;
                    }

                    #logo-preview {
                        //background-image: url(${photo ? photo : ""});
                        background-size: cover;
                        background-position: center;
                        width: 80px;
                        height: 80px;
                        border-radius: .6rem;
                        border: 1px solid rgb(0, 0, 0, .2);
                        background-color: rgba(0, 0, 0, .2);
                    }

                    #background-uploader {

                    }

                    #background-preview {
                        width: 100%;
                        height: 140px;
                        border: 1px solid rgb(0, 0, 0, .2);
                        background-color: rgba(0, 0, 0, .2);
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