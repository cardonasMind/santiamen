import { PureComponent, Fragment } from "react";

import { Button, Drawer } from "rsuite";

import DrawerContent from "./DrawerContent";

export default class extends PureComponent {
    state = {
        showProductDrawer: false
    }

    toggleShowProductDrawer = () => {
        const { isBusinessOwner } = this.props;
        
        if(!isBusinessOwner) this.setState(prevState => ({ showProductDrawer: !prevState.showProductDrawer }));
    }
    
    render() {
        const { showProductDrawer } = this.state;
        const { id, name, description, price, photoURL } = this.props;
        
        return name ? (
            <Fragment>
                <Button size="xs" block onClick={this.toggleShowProductDrawer}>
                    Añadir
                </Button>
            
                <Drawer full placement={"bottom"} show={showProductDrawer} onHide={this.toggleShowProductDrawer}>
                    <Drawer.Header></Drawer.Header>
                    <Drawer.Body>
                        <DrawerContent toggleShowProductDrawer={this.toggleShowProductDrawer} id={id} name={name} 
                            description={description} price={price} photoURL={photoURL} />
                    </Drawer.Body>
                </Drawer>
            </Fragment>
        ) 
        : null
    }
}