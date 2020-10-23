import { PureComponent, createContext } from "react";

import firebase from "./firebase";

import { Notification } from "rsuite";

export const MainContext = createContext();

export class MainContextProvider extends PureComponent {
  constructor() {
    super();

    this.state = {
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

    /*                  GETTING BUSINESS FROM DB               */
    db.collection("business").onSnapshot(
      (docSnapshot) => {
        this.setState({ business: [], businessKeys: [] }); // Restart state

        docSnapshot.forEach((business) => {
          this.setState((prevState) => ({
            business: [...prevState.business, business.data()],
            businessKeys: [...prevState.businessKeys, business.id]
          }));
        });
      },
      (error) => {
        Notification.error({
          title: "Ocurrió un error",
          description: error
        });
      }
    );
  }

  /*              HANDLE ORDERLIST            */
  addProductToOrderList = (product) => {
    const { orderList } = this.state;
    const { id } = product;

    const orderListProductsIds = [];
    orderList.forEach((product) => {
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
      this.setState((prevState) => ({
        orderList: [...prevState.orderList, product]
      }));
    }
  };

  removeProductFromOrderList = (id) => {
    const { orderList } = this.state;

    const orderListProductsIds = [];
    orderList.forEach((product) => {
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

    const order = {
      name,
      lat,
      lng,
      order: orderList
    };

    db.collection("business")
      .doc("0LQSHQoXJmzQDPEIhUxN")
      .collection("orders")
      .add(order)
      .then((docRef) => {
        Notification.success({
          title: "Listo",
          description: "Tu pedido ha sido recibido."
        });

        secondCheckoutStage();

        this.setState({ orderList: [] });
      })
      .catch((error) => {
        Notification.error({
          title: "Ocurrió un error",
          description: error
        });
      });
  };

  resetOrderList = () => 
    this.setState({ orderList: [] });
    

  render() {
    return (
      <MainContext.Provider value={{ ...this.state }}>
        {this.props.children}
      </MainContext.Provider>
    );
  }
}
