import getBusinessOrders from "./get-business-orders";
import processOrder from "./process-order";
import addProductToOrderCart from "./add-product-to-order-cart";
import removeProductFromOrderCart from "./remove-product-from-order-cart";
import sendOrder from "./send-order";
import resetOrderCart from "./reset-order-cart";

export const orderActions = {
	getBusinessOrders,
	processOrder,
	addProductToOrderCart,
	removeProductFromOrderCart,
	sendOrder,
	resetOrderCart
};