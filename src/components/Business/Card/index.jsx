import React from "react";

import Logo from "./Logo";
import Name from "./Name";
import State from "./State";

export default function BusinessCard({ photo, name, active }) {
    return(
        <div className="businessCard">
            <Logo photo={photo} />
            
            <div className="businessInfo">
                <Name name={name} />
                <State active={active} />
            </div>

            <style jsx>{`
                .businessCard {
                    background: rgba(0, 0, 0, .05);
                    border-radius: .4rem;
                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-gap: 1rem;
                    transition: .1s;
                }

                .businessCard:hover {
                    background: rgba(0, 0, 0, .08);
                }

                .businessInfo {
                    padding: 1rem 0;
                }
            `}</style>
        </div>
    )
}