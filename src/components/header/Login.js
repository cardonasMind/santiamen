import { Fragment, PureComponent } from "react";

import { Drawer } from "rsuite";

export default class extends PureComponent {
    state = {
        showLoginDrawer: false
    }

    toggleShowLoginDrawer = () => 
        this.setState(prevState => ({ showLoginDrawer: !prevState.showLoginDrawer}))

    render() {
        return(
            <Fragment>
                <h2 onClick={this.toggleShowLoginDrawer}>Acceder</h2>

                
                <Drawer full placement={"bottom"} show={this.state.showLoginDrawer} onHide={this.toggleShowLoginDrawer}>
                    <Drawer.Header></Drawer.Header>
                    <Drawer.Body>
                        <h1>Accede a tu negocio</h1>
                    </Drawer.Body>
                </Drawer>



                <style jsx>{`
                
                `}</style>
            </Fragment>
        )
    }
}