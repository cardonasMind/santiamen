import react from "react";

import Title from "./Title";
import Products from "./Products";

export default function Category({ isBusinessOwner, id, visible, title, products }) {
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