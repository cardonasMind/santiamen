import { PureComponent } from "react";

import Category from "./Category";

// Show to user only categories that has at least one product (products.length > 0) and is visible
// For the business owner, show all the six categories
export default class extends PureComponent {
	render() {
		const { isBusinessOwner, categories = [] } = this.props;
		
		return categories.map((category, index) => {
			const { visible, products } = category;
			
			if(isBusinessOwner) return <Category key={index} id={index+1} isBusinessOwner {...category} />
			else {
				if(visible !== undefined) {
					if(visible && products.length > 0) return <Category key={index} {...category} />
					else return null
				}
				else return <Category key={index} products={[]} />
			}
		})
	}
}