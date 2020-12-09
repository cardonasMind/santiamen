import React from "react";

import { numberToMoney } from "../../../../utils";

import OrderProduct from "./Product";

const calculateTotalPrice = products => {
    let totalPrice = 0;
    
    products.map(product => {
        let { price, amount } = product;

        totalPrice += price * amount;
    });

    return numberToMoney(totalPrice);
}

export default function OrderProductsList({ products, showDelete }) {
	return (
		<div className="orderProductsList">
			{
				products.map(product => <OrderProduct key={product.id} showDelete={showDelete} {...product} />)
			}
			
			<div className="orderTotalPrice">
                <h3>Total: ${calculateTotalPrice(products)}</h3>
            </div>
			
			<style jsx>{`
				.orderTotalPrice h3 {
                    color: var(--green);
                    text-align: right;
				}
            `}</style>
		</div>	
	)
}