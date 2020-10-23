import React from "react";

import Link from "next/link";

import { Icon } from 'rsuite';

import Menu from "./Menu";

const Header = ({ back, resetOrderList }) => {
    return(
        <div id="header-navigation">
            <span>
                {back && 
                    <div onClick={resetOrderList}>
                        <Link href="/" >
                            <a><Icon icon="angle-left" size="2x" /></a>
                        </Link>
                    </div>
                }
            </span>

            <Menu />

            <style jsx global>{`
                #header-navigation {
                    display: inline-flex;
                    justify-content: space-between;
                    padding: .6rem 1rem;
                    position: absolute;
                    top: 0;
                    right: 0;
                    left: 0;
                }

                #header-navigation span * {
                    color: white;
                }
            
            `}</style>
        </div>
    )
}

export default Header;