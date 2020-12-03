import { PureComponent, createContext } from "react";

import { firebase } from "../config";

export const mainContext = createContext();

import { userState, userActions } from "./user";
import { businessState, businessActions } from "./business";
import { orderState, orderActions } from "./order";

// Function that receives functions (actions) and bind them to MainContextProvider so they can use this of MainContextProvider
/*function bindActions(actions) {
    for (let [key, value] of Object.entries(actions)) {
        // value is the function (the action)
		return value = value.bind(this);
    }
}*/

export class MainContextProvider extends PureComponent {
    constructor () {
        super();
        
        /*bindActions = bindActions.bind(this);
        
		// bind those actions
        bindActions(userActions);*/
		
		// THIS NEEDS TO BE FIXED, I DON´T WANT TO BIND ALL ACTIONS MANUALLY
		
		
		
		// userActions binded
		userActions.accountFromDB = userActions.accountFromDB.bind(this);
		userActions.updateBusinessAccount = userActions.updateBusinessAccount.bind(this);
		
		// businessActions binded
		businessActions.getBusinessList = businessActions.getBusinessList.bind(this);
		businessActions.registerBusiness = businessActions.registerBusiness.bind(this);
		businessActions.updateCategory = businessActions.updateCategory.bind(this);
		businessActions.newProduct = businessActions.newProduct.bind(this);
		businessActions.deleteProduct = businessActions.deleteProduct.bind(this);
		
		// orderActions binded
		orderActions.getBusinessOrders = orderActions.getBusinessOrders.bind(this);
		orderActions.processOrder = orderActions.processOrder.bind(this);
		orderActions.addProductToOrderCart = orderActions.addProductToOrderCart.bind(this);
		orderActions.removeProductFromOrderCart = orderActions.removeProductFromOrderCart.bind(this);
		orderActions.sendOrder = orderActions.sendOrder.bind(this);
		orderActions.resetOrderCart = orderActions.resetOrderCart.bind(this);
	  
        this.state = {
            user: {...userState, ...userActions},
			business: {...businessState, ...businessActions},
			order: {...orderState, ...orderActions}
        }
		
		this.baseState = this.state;

        const db = firebase.firestore();
  
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
				// Get user data from DB
				userActions.accountFromDB();
				
                // User is logged
                /*const { uid } = user;
                this.setState({ uid });*/

                // Load data from DB
                //this.userAccountFromDB(uid);
            } else {
                // User isn´t logged now
                this.setState(this.baseState);
            }
        });
		
		/*                  GETTING BUSINESS FROM DB               */
		businessActions.getBusinessList()
    }
    
    render() {
        return (
            <mainContext.Provider value={this.state}>
                {this.props.children}
            </mainContext.Provider>
        )
    }
}