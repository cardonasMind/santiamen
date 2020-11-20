import React from "react";

import { numberToMoney } from "../../utils";

const OrderProduct = ({ amount, name, photoURL, price }) => {
    return(
        <div className="orderProduct">
            <div className="orderProductImage" />
            <div className="orderProductInfo">
                <h2><div className="orderProductAmount">x{amount}</div> {name}</h2>
                <h3>$ {numberToMoney(price)}</h3>
            </div>

            <style jsx>{`
                .orderProduct {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-gap: .6rem;
                }

                .orderProductImage {
                    width: 5rem;
                    height: 10rem;
                    border-radius: .6rem;
                    background-color: rgba(0, 0, 0, .6);
                    background-image: url(${photoURL});
                    background-size: cover;
                    background-position: center;
                }

                .orderProductAmount {
                    display: inline;
                    font-size: 1.4rem;
                }

                h3 {
                    color: var(--green);
                }
            
            
            `}</style>
        </div>
    )
}

export default OrderProduct;