import { PureComponent, createContext } from "react";

import firebase from "./firebase";

import { Notification } from "rsuite";

export const MainContext = createContext();

export class MainContextProvider extends PureComponent {
    constructor() {
        super();

        this.state = {
            userIsInDb: null,
            uid: "",
            name: "",
            photoURL: "",
            backgroundURL: "",
            active: null,
            orders: [],
            registerBusiness: this.registerBusiness,
            handleLogout: this.handleLogout,
            updateBusiness: this.updateBusiness,
            processOrder: this.processOrder,
            updateCategory: this.updateCategory,
            addNewProduct: this.addNewProduct,
            deleteProduct: this.deleteProduct,
            
            

            business: [],
            businessKeys: [],

            orderList: [],
            orderInfo: {
                name: "",
                details: "",
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



    userAccountFromDB = uid => {
        const db = firebase.firestore();

        // For the moment only will be business accounts
        const userInDbRef = db.collection("business").doc(uid);

        userInDbRef.onSnapshot(doc => {
            if(doc.exists) {
                const userDataFromDb = doc.data();
                const { active, name, photoURL, backgroundURL } = userDataFromDb;

                this.setState({ active, name, photoURL, backgroundURL, userIsInDb: true });

                this.getBusinessOrders(uid);
            } else {
                this.setState({ userIsInDb: false });
            }
        },
        error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        })
    }

    registerBusiness = (name, category, photoURL) => {
        const { uid } = this.state;
        const db = firebase.firestore();
        const storageRef = firebase.storage().ref();

        const uploadBusinessLogo = storageRef.child(`business/${uid}/logo`)
            .putString(photoURL, 'data_url');

        Notification.info({
            title: "Espera",
            description: "Subiendo imágen."
        });

        uploadBusinessLogo.then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                db.collection('business').doc(uid).set({
                    active: false,
                    name,
                    category,
                    photoURL: downloadURL,
                    backgroundURL: ""
                })
                .then(docRef => {
                    // Adding the 6 categories to the business
                    for(let i = 1; i < 7; i++) {
                        db.doc(`business/${uid}/category${i}/info`).set({
                            visible: false,
                            title: `Categoría ${i}`
                        })
                        .catch(error => Notification.error({
                            title: "Ocurrió un error",
                            description: error
                        }));
                    }

                    Notification.success({
                        title: "Perfecto",
                        description: "¡Acabas de registrar tu negocio!"
                    });
                })
                .catch(error => Notification.error({
                        title: "Ocurrió un error",
                        description: error
                    })
                ); 
            })
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
        db.collection("business").doc(uid).collection("orders").where("sent", "==", false).orderBy("timestamp", "desc").onSnapshot(docSnapshot => {
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

    updateBusiness = (active, name, photoURL, backgroundURL) => {
        const { uid } = this.state;
        const db = firebase.firestore();

        db.collection('business').doc(uid).update({
            active,
            name,
            photoURL,
            backgroundURL
        })
        .then(() => {
            Notification.success({
                title: "Listo",
                description: `Tu negocio ha sido actualizado.`
            });
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    }

    processOrder = orderId => {
        const { uid } = this.state;
        const db = firebase.firestore();

        db.collection('business').doc(uid).collection('orders').doc(orderId).update({
            sent: true
        })
        .then(() => {
            Notification.success({
                title: "Listo",
                description: `Has enviado la orden ${orderId}`
            });
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    }

    updateCategory = (category, title, visible) => {
        const { uid } = this.state;
        const db = firebase.firestore();

        db.collection('business').doc(uid).collection(category).doc('info').update({
            title,
            visible
        })
        .then(() => {
            Notification.success({
                title: "Listo",
                description: `Categoría actualizada.`
            });
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    }

    addNewProduct = (category, name, price, photoURL, description, toggleShowAddProductDrawer) => {
        const { uid } = this.state;
        const db = firebase.firestore();
        const storageRef = firebase.storage().ref();

        const newProductRef = db.collection('business').doc(uid).collection(category).doc();

        Notification.info({
            title: "Espera",
            description: "Subiendo imágen."
        });

        // Upload the selected image to firebase and then get the URL
        const uploadProductImage = storageRef.child(`business/${uid}/${category}/${newProductRef.id}`)
            .putString(photoURL, 'data_url');
                    
        uploadProductImage.then(snapshot => {
            snapshot.ref.getDownloadURL().then(downloadURL => {
                newProductRef.set({
                    name,
                    price,
                    photoURL: downloadURL,
                    description
                })
                .then(docRef => {
                    Notification.success({
                        title: "Perfecto",
                        description: `Acabas de agregar un nuevo producto: ${name}`
                    });

                    toggleShowAddProductDrawer();
                })
                .catch(error => {
                    Notification.error({
                        title: "Ocurrió un error",
                        description: error
                    });
                }); 
            })
        })
        .catch(error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
    }

    deleteProduct = (category, productId) => {
        const { uid } = this.state;
        const db = firebase.firestore();

        db.collection('business').doc(uid).collection(category).doc(productId).delete().then(() => {
            Notification.success({
                title: "Listo",
                description: "Producto eliminado correctamente."
            });
        }).catch(error => {
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

    sendOrder = (name, details, businessKey, lat, lng, secondCheckoutStage) => {
        this.setState({ orderInfo: { name, details, lat, lng } });
    
        const { orderList } = this.state;

        const db = firebase.firestore();
    
        const fullDate = new Date();
        const humanDate = fullDate.toLocaleString('es-CO', { hour12: true }).split(",");
        const date = `${humanDate[0]} - ${humanDate[1]}`
    
        const order = {
            timestamp: fullDate,
            date,
            name,
            details,
            sent: false,
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