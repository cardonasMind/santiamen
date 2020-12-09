import { PureComponent } from "react";

import NewProduct from "./NewProduct";
import PrintProducts from "./PrintProducts";

export default class extends PureComponent {
    render() {
        const { isBusinessOwner, id, products } = this.props;
        
        return (
            <div className="categoryProductsContainer">
                <div className="categoryProducts">
					<NewProduct isBusinessOwner={isBusinessOwner} id={id} />
                    <PrintProducts isBusinessOwner={isBusinessOwner} categoryID={id} products={products} />
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