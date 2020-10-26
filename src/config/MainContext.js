import { PureComponent, createContext } from "react";

import firebase from "./firebase";

import { Notification } from "rsuite";

export const MainContext = createContext();

export class MainContextProvider extends PureComponent {
    constructor() {
        super();

        this.state = {
            uid: "",
            name: "",
            photoURL: "",
            active: null,
            orders: [],
            handleLogout: this.handleLogout,
            
            

            business: [],
            businessKeys: [],

            orderList: [],
            orderInfo: {
                name: "",
                lat: 0,
                lng: 0
            },
            addProductToOrderList: this.addProductToOrderList,
            removeProductFromOrderList: this.removeProductFromOrderList,
            sendOrder: this.sendOrder,
            resetOrderList: this.resetOrderList
        };

        this.baseState = this.state;

        const db = firebase.firestore();
  
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                // User is logged
                const { uid } = user;
                this.setState({ uid });

                // Load data from DB
                this.userAccountFromDB(uid);
            } else {
                // User isn´t logged
                this.setState(this.baseState);
            }
        });


        /*                  GETTING BUSINESS FROM DB               */
        db.collection("business").onSnapshot(docSnapshot => {
            this.setState({ business: [], businessKeys: [] }); // Restart state

            docSnapshot.forEach(business => {
                this.setState(prevState => ({
                    business: [...prevState.business, business.data()],
                    businessKeys: [...prevState.businessKeys, business.id]
                }));
            });
        },
        error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        })
    }



    /*              HANDLE ACCOUNT                */
    userAccountFromDB = uid => {
        const db = firebase.firestore();

        // For the moment only will be business accounts
        const userInDbRef = db.collection("business").doc(uid);

        userInDbRef.get().then(doc => {
            if (doc.exists) {
                const userDataFromDb = doc.data();
                const { name, photoURL, active } = userDataFromDb;

                this.setState({ name, photoURL, active });

                this.getBusinessOrders(uid);
            } else {
                // If user isn´t in the DB, add it XD
                /*db.collection("users").doc(uid).set({
                    accountType: "normal",
                    displayName: this.state.displayName,
                    photoURL: this.state.photoURL
                })
                .then(() => {
        this.setState({ accountType: "normal" });
                    console.log("User is now in the DB :o");
                })
                .catch(error => {
                    Notification["error"]({
                        title: "Ocurrió un error :(",
                        description: error.message
                    });
                });*/
            }
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    }

    handleLogout = () => {
        firebase.auth().signOut().then(() => {
            Notification.success({
                title: "Listo",
                description: "Acabas de cerrar sesión."
            });
    
            this.setState(this.baseState);
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        })
    }

    getBusinessOrders = uid => {
        /*                  GETTING ORDERS FOR BUSINESS OWNERS FROM DB               */
        const db = firebase.firestore();
        db.collection("business").doc(uid).collection("orders").onSnapshot(docSnapshot => {
            this.setState({ orders: [] }); // Restart state
    
            docSnapshot.forEach(order => {
                const orderData = {
                    key: order.id,
                    ...order.data(),
                };

                this.setState(prevState => ({ orders: [...prevState.orders, orderData] }) );
            });
        },
        error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    }








    /*              HANDLE ORDERLIST            */
    addProductToOrderList = product => {
        const { orderList } = this.state;
        const { id } = product;

        const orderListProductsIds = [];
        orderList.forEach(product => {
            orderListProductsIds.push(product.id);
        });

        if (orderListProductsIds.includes(id)) {
            const productIndex = orderListProductsIds.indexOf(id);

            const productWithAmount = {
                ...product,
                amount: product.amount + orderList[productIndex].amount
            };

            const newOrderList = [...orderList];
            newOrderList[productIndex] = productWithAmount;

            this.setState({ orderList: newOrderList });
        } else {
            this.setState(prevState => ({
                orderList: [...prevState.orderList, product]
            }));
        }
    }

    removeProductFromOrderList = id => {
        const { orderList } = this.state;
    
        const orderListProductsIds = [];
        orderList.forEach(product => {
          orderListProductsIds.push(product.id);
        });
    
        const newOrderList = [...orderList];
    
        newOrderList.splice(orderListProductsIds.indexOf(id), 1);
    
        this.setState({ orderList: newOrderList });
    };

    sendOrder = (name, businessKey, lat, lng, secondCheckoutStage) => {
        this.setState({ orderInfo: { name, lat, lng } });
    
        const { orderList } = this.state;

        const db = firebase.firestore();
    
        const fullDate = new Date();
        const date = `${fullDate.getDate()}/${fullDate.getMonth()+1}/${fullDate.getFullYear()}`;
    
        const order = {
            timestamp: fullDate,
            date,
            name,
            lat,
            lng,
            order: orderList
        };
    
        db.collection("business").doc(businessKey).collection("orders").add(order).then(docRef => {
            Notification.success({
              title: "Listo",
              description: "Tu pedido ha sido recibido."
            });
    
            secondCheckoutStage();
    
            this.resetOrderList();
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    }
    
    resetOrderList = () => this.setState({ orderList: [] });

    render() {
        return (
            <MainContext.Provider value={{ ...this.state }}>
              {this.props.children}
            </MainContext.Provider>
        );
    }
}