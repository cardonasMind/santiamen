import React from "react";

import BackArrow from "./BackArrow";
import Menu from "./Menu";

export default function Header({ back }) {
    return(
        <div id="header-navigation">
            <BackArrow back={back} />
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