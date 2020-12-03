import { PureComponent } from "react";

import Title from "./Title";
import Products from "./Products";

export default class extends PureComponent {
    render() {
        const { isBusinessOwner, id, visible, title, products } = this.props;
        
        return(
            <div className="category">
                <Title isBusinessOwner={isBusinessOwner} id={id} visible={visible} title={title} />
                <Products isBusinessOwner={isBusinessOwner} id={id} products={products} />
                
                <style jsx>{`
                    .category {
                        margin: 1rem;
                    }
                `}</style>
            </div>
        )
    }
}