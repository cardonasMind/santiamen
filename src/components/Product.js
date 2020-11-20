import { PureComponent } from "react";

import { Button, Drawer, InputNumber } from "rsuite";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { MainContext } from "../config/MainContext";
import { numberToMoney } from "../utils";

class ProductDrawer extends PureComponent {
    static contextType = MainContext;

    state = {
        productAmount: 1
    }

    handleChange = value => this.setState({ productAmount: Number(value) });
    

    addProductToOrderList = () => {
        const { productAmount } = this.state;
        const { id, photoURL, name, price, toggleShowProductDrawer } = this.props;

        const product = {
            id,
            photoURL,
            name,
            price,
            amount: productAmount
        };

        this.context.addProductToOrderList(product);

        toggleShowProductDrawer();
    }


    render() {
        const { productAmount } = this.state;
        const { photoURL, name, price, description } = this.props;

        return(
            <div className="product-drawer">
                <div className="add-product">
                    <InputNumber value={productAmount} min={1} onChange={this.handleChange} />
                    <Button appearance="primary" onClick={this.addProductToOrderList}>Añadir</Button>
                </div>

                <div className="product-details">
                    <div className="product-image" />
                    <div className="product-data">
                        <h1>{name}</h1>
                        <h2>$ {numberToMoney(price)}</h2>
                    </div>
                </div>

                <div className="product-description">
                    <p>{description}</p>
                </div>

                <style jsx>{`
                    .product-drawer {
                        display: grid;
                        grid-gap: 1rem;
                    }

                    .add-product {
                        display: grid;
                        grid-template-columns: 20% 1fr;
                        grid-gap: .6rem;
                    }

                    .product-details {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .6rem;
                        text-align: left;
                    }

                    .product-data h1 {
                        margin-bottom: .6rem;
                    }

                    .product-data h2 {
                        color: var(--green);
                    }

                    .product-image {
                        width: 10rem;
                        height: 20rem;
                        border-radius: .6rem;
                        background-color: rgba(0, 0, 0, .6);
                        background-image: url(${photoURL});
                        background-size: cover;
                        background-position: center;
                    }
                `}</style>
            </div>
        )
    }
}






export default class extends PureComponent {
    state = {
        showProductDrawer: false
    }

    toggleShowProductDrawer = () => 
        this.setState(prevState => ({ showProductDrawer: !prevState.showProductDrawer }));

    render() {
        const { photoURL, name, price } = this.props;

        return(
            <div className="product">
                <div className="product-info">
                    {
                        name ? <h3>{name}</h3>
                        :
                            <h3><SkeletonTheme color="rgba(255, 255, 255, .1)" highlightColor="rgba(255, 255, 255, .2)">
                                <Skeleton height="1.2rem" duration={3} />
                            </SkeletonTheme></h3>
                    }

                    {
                        price ? <p>$ {numberToMoney(price)}</p>
                        :
                            <SkeletonTheme color="rgba(255, 255, 255, .1)" highlightColor="rgba(255, 255, 255, .2)">
                                <Skeleton width="60%" duration={3} />
                            </SkeletonTheme>
                    }
                </div>
                <Button size="xs" block onClick={name && this.toggleShowProductDrawer}>Añadir</Button>

                <Drawer full placement={"bottom"} show={this.state.showProductDrawer} onHide={this.toggleShowProductDrawer}>
                    <Drawer.Header></Drawer.Header>
                    <Drawer.Body>
                        <ProductDrawer toggleShowProductDrawer={this.toggleShowProductDrawer} {...this.props} />
                    </Drawer.Body>
                </Drawer>


                <style jsx>{`
                    .product {
                        width: 10rem;
                        height: 20rem;
                        border-radius: .6rem;
                        border: 1px solid rgb(0, 0, 0, .2);
                        background-color: rgba(0, 0, 0, .2);
                        background-image: url(${photoURL});
                        background-size: cover;
                        background-position: center;
                        background-repeat: no-repeat;
                        position: relative;
                        color: white;
                        display: grid;
                        grid-template-rows: 1fr auto;
                        align-items: flex-end;
                        padding: .4rem;
                        z-index: 1;
                    }

                    .product::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        background: linear-gradient(rgba(0, 0, 0, .2), rgba(0, 0, 0, .6));
                        z-index: -1;
                        border-radius: .6rem;
                    }

                    .product-info {
                        margin-bottom: 1rem;
                        text-align: right;
                    }

                    .product-info p {
                        background: var(--green);
                        padding: 0 .4rem;
                        width: fit-content;
                        margin-left: auto;
                        margin-right: -1rem;
                    }
                `}</style>
            </div>
        )
    }
}