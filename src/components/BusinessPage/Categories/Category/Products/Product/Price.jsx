import React from "react";

import { numberToMoney } from "../../../../../../utils";

export default function ProductPrice({ price }) {
    return (
        <p>
            { price ? `$ ${numberToMoney(price)}` : <div className="placeHolderElement" />}
            
            <style jsx>{`
                p {
                    background: var(--green);
                    padding: 0 .4rem;
                    width: fit-content;
                    margin-left: auto;
                    margin-right: -1rem;
                }

                .placeHolderElement {
                    background: rgba(255, 255, 255, .2);
                    width: 40%;
                    height: 1rem;
                }
            `}</style>
        
        </p>
    )
}