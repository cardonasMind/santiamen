import { PureComponent } from "react";

import AddProduct from "./AddProduct";
import PrintProducts from "./PrintProducts";

export default class extends PureComponent {
    render() {
        const { isBusinessOwner, products } = this.props;
        
        return (
            <div className="categoryProductsContainer">
                <div className="categoryProducts">
                    <AddProduct isBusinessOwner={isBusinessOwner} />
                    <PrintProducts isBusinessOwner={isBusinessOwner} products={products} />
                </div>
                
                <style jsx>{`
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
                `}</style>
            </div>
        )
    }
}