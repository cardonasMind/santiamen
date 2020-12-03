import React from "react";

export default function PlaceHolderElement({ width, height, opacity }) {
    return (
        <div className="placeHolderElement">
            <style jsx>{`
                .placeHolderElement {
                    background: rgba(0, 0, 0, ${opacity});
                    width: ${width};
                    height: ${height};
                    border-radius: .2rem;
                }
            `}</style>
        </div>
    )
}