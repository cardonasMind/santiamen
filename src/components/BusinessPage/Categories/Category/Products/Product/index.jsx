import { PureComponent } from "react";

import { Button } from "rsuite";

import DeleteProduct from "./Delete";
import Name from "./Name";
import Price from "./Price";
import AddToCart from "./AddToCart";

export default class extends PureComponent {
    render() {
        const { isBusinessOwner, categoryID, id, name, price, photoURL } = this.props;
        
        return (
            <div className="product">
				<DeleteProduct isBusinessOwner={isBusinessOwner} category={categoryID} id={id} name={name} />
                
                <div className="productInfo">
                    <Name name={name} />
                    <Price price={price} />
                </div>
                
                <AddToCart {...this.props} /> {/* id, isBusinessOwner, name, description, price, photoURL */}
                
                <style jsx>{`
                    .product {
                        width: 10rem;
                        height: 20rem;
                        border-radius: .4rem;
                        background-color: rgba(0, 0, 0, .1);
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
                        background: linear-gradient(rgba(0, 0, 0, .2), #2F2F2F);
                        z-index: -1;
                        border-radius: .4rem;
                    }

                    .productInfo {
                        margin-bottom: 1rem;
                        text-align: right;
                    }
                `}</style>
            </div>
        )
    }
}