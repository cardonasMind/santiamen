import { Fragment, PureComponent } from "react";

import { Drawer } from "rsuite";

export default class extends PureComponent {
    state = {
        showRegisterDrawer: false
    }

    toggleShowRegisterDrawer = () => 
        this.setState(prevState => ({ showRegisterDrawer: !prevState.showRegisterDrawer}))

    render() {
        return(
            <Fragment>
                <h2 onClick={this.toggleShowRegisterDrawer}>Registrarse</h2>

                
                <Drawer full placement={"bottom"} show={this.state.showRegisterDrawer} onHide={this.toggleShowRegisterDrawer}>
                    <Drawer.Header></Drawer.Header>
                    <Drawer.Body>
                        <h1>Registra tu negocio</h1>
                    </Drawer.Body>
                </Drawer>



                <style jsx>{`
                
                `}</style>
            </Fragment>
        )
    }
}