import { PureComponent } from "react";

import { Icon } from "rsuite";

import { MainContext } from "../../../config/MainContext";

import MenuDrawer from "./MenuDrawer";
import Register from "./Register";

export default class extends PureComponent {    
    static contextType = MainContext;

    state = {
        showMenu: false
    }

    toggleShowMenu = () => this.setState(prevState => ({ showMenu: !prevState.showMenu }));    
    
    render() {
        const { showMenu } = this.state;
        const { userIsInDb, registerBusiness } = this.context;
        
        return(
            <span>
                <Icon icon="bars" size="2x" onClick={this.toggleShowMenu} />
                <MenuDrawer showMenu={showMenu} toggleShowMenu={this.toggleShowMenu} />

                <Register userIsInDb={userIsInDb} registerBusiness={registerBusiness} />
            </span>
        )
    }
}