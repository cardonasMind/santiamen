import { PureComponent } from "react";

import { Icon } from "rsuite";

import MenuDrawer from "./Drawer";
import Register from "./Register";

export default class extends PureComponent {    
    state = {
        showMenu: false
    }

    toggleShowMenu = () => this.setState(prevState => ({ showMenu: !prevState.showMenu }));    
    
    render() {
        const { showMenu } = this.state;
        
        return(
            <span>
                <Icon icon="bars" size="2x" onClick={this.toggleShowMenu} />
                <MenuDrawer showMenu={showMenu} toggleShowMenu={this.toggleShowMenu} />

                <Register />
            </span>
        )
    }
}