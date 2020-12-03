import React from "react";

import Category from "./Category";

export default function BusinessPageCategories({ isBusinessOwner, categories }) {
    if(isBusinessOwner)
        return categories.map((category, index) => 
            <Category key={index} id={index+1} isBusinessOwner {...category} />
        )
    else 
        return categories.length > 0 &&
            categories.map((category, index) => {
                const { visible, products } = category;

                if(visible !== undefined) {
                    if(visible && products.length > 0) 
                        return <Category key={index} {...category} />
                    else 
                        return null
                } else 
                    return <Category key={index} products={[]} />
            })
}