import React from "react";

import { IconButton, Icon } from "rsuite";

import { numberToMoney } from "../../utils";

const OrderListProduct = ({ id, name, photoURL, price, amount, removeProductFromOrderList }) => {
    return(
        <div className="orderListProduct">
            <div className="orderListProductImage" />
            <div className="orderListProductInfo">
                <h2><div className="orderListProductAmount">x{amount}</div> {name}</h2>
                <h3 className="orderListProductPrice">$ {numberToMoney(price)}</h3>
            </div>
            {
                removeProductFromOrderList && 
                    <IconButton color="red" icon={<Icon icon="trash-o" />} onClick={() => removeProductFromOrderList(id)} />
            }
            
            <style jsx>{`
                .orderListProduct {
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    grid-gap: .6rem;
                    margin-bottom: 1rem;
                }

                .orderListProductImage {
                    width: 5rem;
                    height: 10rem;
                    border-radius: .6rem;
                    background-color: rgba(0, 0, 0, .6);
                    background-image: url(${photoURL});
                    background-size: cover;
                    background-position: center;
                }

                .orderListProductInfo h2 {
                    margin-bottom: .6rem;
                }

                .orderListProductAmount {
                    display: inline;
                    font-size: 1.4rem;
                }

                .orderListProductPrice {
                    color: var(--green);
                }
            `}</style>
        </div>
    )
}

export default OrderListProduct;