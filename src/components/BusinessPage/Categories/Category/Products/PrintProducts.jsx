import React, { Fragment } from "react";

import Product from "./Product";

export default function PrintProducts({ isBusinessOwner, products }) {
    return products.length > 0 
        ?
            products.map(product =>
                <Product
                    key={product.key}
                    isBusinessOwner={isBusinessOwner}
                    id={product.key}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    photoURL={product.photoURL}
                />              
            )
        :
            <Fragment>
                <Product />
                <Product />
                <Product />
            </Fragment>
}