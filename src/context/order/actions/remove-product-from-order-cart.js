export default function removeProductFromOrderCart(id) {
    const { orderCart } = this.state.order;
    
    const orderCartProductsIDs = [];
    orderCart.forEach(product => {
		orderCartProductsIDs.push(product.id);
    });
    
    const newOrderCart = [...orderCart];
    
    newOrderCart.splice(orderCartProductsIDs.indexOf(id), 1);
    
	this.setState(prevState => ({ order: {...prevState.order, orderCart: newOrderCart } }))
};