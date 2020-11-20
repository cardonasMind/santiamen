import React from "react";

import BackArrow from "./BackArrow";
import Menu from "./Menu";

export default function Header(props) {
    return(
        <div id="header-navigation">
            <BackArrow {...props} />
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