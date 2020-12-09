import React, { useContext } from "react";

import { IconButton, Icon } from "rsuite";

import { mainContext } from "../../../../context";

import { numberToMoney } from "../../../../utils";

export default function OrderProduct({ id, name, photoURL, price, amount, showDelete }) {
    const { removeProductFromOrderCart } = useContext(mainContext).order;
	
	return (
		<div className="orderProduct">
            <div className="orderProductImage" />
            <div className="orderProductInfo">
                <h2><div className="orderProductAmount">x{amount}</div> {name}</h2>
                <h3 className="orderProductPrice">$ {numberToMoney(price)}</h3>
            </div>
			
			{
				showDelete && 
                    <IconButton color="red" icon={<Icon icon="trash-o" />} onClick={() => removeProductFromOrderCart(id)} />
			}
            
            <style jsx>{`
                .orderProduct {
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    grid-gap: .6rem;
                    margin-bottom: 1rem;
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
				
                .orderProductInfo h2 {
                    margin-bottom: .6rem;
                }
				
                .orderProductAmount {
                    display: inline;
                    font-size: 1.4rem;
                }
				
                .orderProductPrice {
                    color: var(--green);
                }
            `}</style>
        </div>
	)
}