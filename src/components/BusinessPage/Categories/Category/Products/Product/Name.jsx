import React from "react";

export default function ProductName({ name }) {
    return (
        <h3>
            { name ? name : <div className="placeHolderElement" />}
            
            <style jsx>{`
                .placeHolderElement {
                    background: rgba(255, 255, 255, .2);
                    width: 80%;
                    height: 1.2rem;
                }
            `}</style>
        </h3>
    )
}