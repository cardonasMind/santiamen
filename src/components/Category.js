import React, { Fragment } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Button, Icon } from "rsuite";

import Product from "./Product";

const Category = ({ businessOwner = false, title = "", products = [] }) => {
    return(
        <div className="category">
            <h1>
                {
                    title === ""
                    ?
                        <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .2)">
                            <Skeleton height="1.6rem" duration={3} />
                        </SkeletonTheme>
                    : title
                }
                {
                    businessOwner && 
                        <div className="editCategory">
                            <Button appearance="primary" size="xs" ><Icon icon="gear" /></Button>
                        </div>
                }
            </h1>

            <div className="categoryProductsContainer">
                <div className="categoryProducts">
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

                .category h1 {
                    display: grid;
                    grid-template-columns: fit-content auto;
                    grid-gap: .6rem;
                }



                .categoryProductsContainer {
                    overflow-x: auto;
                    margin: auto -1rem;
                    padding: .6rem 1rem;
                }

                .categoryProducts {
                    display: inline-grid;
                    grid-gap: 1rem;
                    grid-auto-flow: column;
                }

                .categoryProducts * {
                    background: red;
                }
            `}</style>
        </div>
    )
}

export default Category;