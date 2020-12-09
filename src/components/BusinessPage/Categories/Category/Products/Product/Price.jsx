import React from "react";

import { numberToMoney } from "../../../../../../utils";

export default function ProductPrice({ price }) {
    return price ? (
        <p>
            $ {numberToMoney(price)}
            <style jsx>{`
                p {
                    background: var(--green);
                    padding: 0 .4rem;
                    width: fit-content;
                    margin-left: auto;
                    margin-right: -1rem;
                }
            `}</style>
        </p>
    )
    : null
}