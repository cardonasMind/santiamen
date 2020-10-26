import React from "react";

import { Icon } from "rsuite";

const OrderCard = ({ key, date, name }) => {
    return(
        <div className="orderCard">
            <div className="order">
                <h2>{date}</h2>
                <h3>{name}</h3>
            </div>
            <div className="orderDetails">
                <Icon icon="angle-right" size="2x" />
            </div>

            <style jsx>{`
                .orderCard {
                    background: rgba(0, 0, 0, .1);
                    padding: 1rem;
                    border-radius: 1rem;
                    border: 1px solid rgba(0, 0, 0, .1);
                    display: grid;
                    grid-template-columns: 1fr auto;
                    grid-gap: 1rem;
                }

                .orderDetails {
                    background: rgba(0, 0, 0, .2);
                    padding: .6rem;
                    margin: -1rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
            
            `}</style>
        </div>
    )
}

export default OrderCard;