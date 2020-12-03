import React from "react";

import Link from "next/link";

import { Drawer } from "rsuite";

import Account from "./Account";

export default function MenuDrawer({ showMenu, toggleShowMenu }) {
    return(
        <Drawer full placement="right" show={showMenu} onHide={toggleShowMenu}>
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
        </Drawer>
    )
}