import { PureComponent } from "react";

import { mainContext } from "../../../../../../../context";

import { InputNumber, Button } from "rsuite";

import { numberToMoney } from "../../../../../../../utils";

export default class extends PureComponent {
    static contextType = mainContext;

    state = {
        amount: 1
    }

    handleChange = amount => this.setState({ amount: Number(amount) });

    addProductToOrderCart = () => {
        const { amount } = this.state;
        const { id, photoURL, name, price, toggleShowProductDrawer } = this.props;
        const { addProductToOrderCart } = this.context.order;

        const product = {
            id,
            photoURL,
            name,
            price,
            amount
        };

        addProductToOrderCart(product);
        toggleShowProductDrawer();
    }

    render() {
        const { amount } = this.state;
        const { photoURL, name, price, description } = this.props;
        
        return(
            <div className="productDrawer">
                <div className="addProduct">
                    <InputNumber value={amount} min={1} onChange={this.handleChange} />
                    <Button appearance="primary" onClick={this.addProductToOrderCart}>Añadir</Button>
                </div>

                <div className="productDetails">
                    <div className="productImage" />
                    <div className="productData">
                        <h1>{name}</h1>
                        <h2>$ {numberToMoney(price)}</h2>
                    </div>
                </div>

                <div className="productDescription">
                    <p>{description}</p>
                </div>

                <style jsx>{`
                    .productDrawer {
                        display: grid;
                        grid-gap: 1rem;
                    }

                    .addProduct {
                        display: grid;
                        grid-template-columns: 20% 1fr;
                        grid-gap: .6rem;
                    }

                    .productDetails {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .6rem;
                        text-align: left;
                    }

                    .productData h1 {
                        margin-bottom: .6rem;
                    }

                    .productData h2 {
                        color: var(--green);
                    }

                    .productImage {
                        width: 10rem;
                        height: 20rem;
                        border-radius: .6rem;
                        background-color: rgba(0, 0, 0, .1);
                        background-image: url(${photoURL});
                        background-size: cover;
                        background-position: center;
                    }
                `}</style>
            </div>
        )
    }
}