import React, { Fragment } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import Product from "./Product";

const Category = ({ title, products }) => {
    return(
        <div className="category">
            <h1>
                {
                    title === ""
                    ?
                        <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .2)">
                            <Skeleton width="60%" height="1.6rem" duration={3} />
                        </SkeletonTheme>
                    : title
                }
            </h1>

            <div className="category-products-container">
                <div className="category-products">
                    {
                        products.length > 0 
                        ?
                            products.map(product => 
                                 <Product
                                    key={product.key}
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
                </div>
            </div>


            <style jsx>{`
                .category {
                    margin: 1rem;
                }

                .category-products-container {
                    overflow-x: auto;
                    margin: auto -1rem;
                    padding: .6rem 1rem;
                }

                .category-products {
                    display: inline-grid;
                    grid-gap: 1rem;
                    grid-auto-flow: column;
                }

                .category-products * {
                    background: red;
                }
            `}</style>
        </div>
    )
}

export default Category;