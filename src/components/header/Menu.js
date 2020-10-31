import { PureComponent } from "react";

import Link from "next/link";

import { Icon, Drawer } from "rsuite";

import { MainContext } from "../../config/MainContext";

import Account from "./Account";
import Register from "./Register";

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        showMenu: false
    }

    toggleShowMenu = () => this.setState(prevState => ({ showMenu: !prevState.showMenu }));

    render() {
        const { uid, name, registerBusiness } = this.context;

        return(
            <span>
                <Icon icon="bars" size="2x" onClick={this.toggleShowMenu} />

                <Drawer full placement="right" show={this.state.showMenu} onHide={this.toggleShowMenu}>
                    <Drawer.Header></Drawer.Header>
                    <Drawer.Body>
                        <div id="menu-body">
                            <h1>Tú</h1>
                            <Account />
                            <Link href="/hablar"><a><h1>Háblanos</h1></a></Link>
                            <Link href="/proposito"><a><h1>Propósito</h1></a></Link>
                            <Link href="/legal"><a><h1>Legal</h1></a></Link>
                        </div>
                    </Drawer.Body>
                </Drawer>


                <Register uid={uid} name={name} registerBusiness={registerBusiness} />

                <style jsx>{`
                    #menu-body {
                        text-align: right;
                    }

                    #menu-body * {
                        color: initial;
                        margin-bottom: .6rem;
                    }

                    #menu-body >:first-child {
                        margin-bottom: 0;
                    }
                `}</style>
            </span>
        )
    }
}