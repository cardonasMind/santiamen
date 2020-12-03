export default function addProductToOrderCart(product) {
    const { orderCart } = this.state.order;
    const { id } = product;

    const orderCartProductsIDs = [];
    orderCart.forEach(product => {
        orderCartProductsIDs.push(product.id);
    });

	// Check if orderCart have the id of the product so it can add more amount or add the product
    if (orderCartProductsIDs.includes(id)) {
        const productIndex = orderCartProductsIDs.indexOf(id);

        const productWithAmount = {
            ...product,
            amount: product.amount + orderCart[productIndex].amount
        };

        const newOrderCart = [...orderCart];
        newOrderCart[productIndex] = productWithAmount;
	
		this.setState(prevState => ({ order: {...prevState.order, orderCart: newOrderCart} }))
    } else {
		this.setState(prevState => ({ order: {...prevState.order, orderCart: [...prevState.order.orderCart, product]} }))
    }
}