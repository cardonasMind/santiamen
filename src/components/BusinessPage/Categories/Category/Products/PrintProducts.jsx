import React, { Fragment } from "react";

import Product from "./Product";

export default function PrintProducts({ isBusinessOwner, categoryID, products }) {
    return products.length > 0 
        ?
            products.map(product =>
                <Product
                    key={product.key}
                    isBusinessOwner={isBusinessOwner}
					categoryID={categoryID}
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