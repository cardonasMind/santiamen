import { PureComponent, Fragment } from "react";

import { MainContext } from "../../../src/context";

import { firebase } from "../../../src/config";

import { Notification } from "rsuite";

import NegocioPage from "./negocio";

export default class extends PureComponent {
    static contextType = MainContext;
    
    state = {
        category1: {
            title: "",
            visible: undefined,
            products: []
        },
        category2: {
            title: "",
            visible: undefined,
            products: []
        },
        category3: {
            title: "",
            visible: undefined,
            products: []
        },
        category4: {
            title: "",
            visible: undefined,
            products: []
        },
        category5: {
            title: "",
            visible: undefined,
            products: []
        },
        category6: {
            title: "",
            visible: undefined,
            products: []
        }
    }

    static getInitialProps({ query }) {
        return { query }
    }

    componentDidMount() {
        const businessKey = this.props.query.negocio;
        const { uid } = this.context;

        /*             GETTING CATEGORIES AND THEIR PRODUCTS            */
        for(let i = 1; i < 7; i++) {
            firebase.firestore().collection(`business/${businessKey}/category${i}`).onSnapshot(documents => {
                // Restart
                this.setState({ [`category${i}`]: { title: "", visible: undefined, products: [] } });
                
                documents.forEach(document => {
                    if(document.id === "info") {
                        const { title, visible } = document.data();

                        this.setState(prevState => ({ [`category${i}`]: {...prevState[`category${i}`], title, visible } }))
                    } else {
                        const { name, description, price, photoURL } = document.data();
    
                        const product = {
                            key: document.id,
                            name,
                            description,
                            price,
                            photoURL
                        };

                        this.setState(prevState => ({ [`category${i}`]: {...prevState[`category${i}`], 
                            products: [...prevState[`category${i}`].products, product] } }))
                    }
                })
            },
            error => {
                Notification.error({
                    title: "Ocurrió un error",
                    description: error
                });
            })
        }
    }

    componentWillUnmount() {
        const { resetOrderList } = this.context;
        
        resetOrderList();
    }

    render() {
        const { uid, business, businessKeys } = this.context;
        const businessKey = this.props.query.negocio;
        const businessData = business[businessKeys.indexOf(businessKey)];
        
        const categories = Object.values([this.state][0])
        
        const isBusinessOwner = uid === businessKey;
        
        return <NegocioPage isBusinessOwner={isBusinessOwner} business={businessData} categories={categories} />
    }
}