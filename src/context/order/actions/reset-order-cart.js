export default function resetOrderCart() {
	this.setState(prevState => ({ order: {...prevState.order, orderCart: []} }))
}
