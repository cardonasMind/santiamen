import { Fragment, PureComponent } from "react";

import Head from "next/head";

import firebase from "../../src/config/firebase";

import { MainContext } from "../../src/config/MainContext";

import Header from "../../src/components/header";
import BusinessCard from "../../src/components/BusinessCard";
import Category from "../../src/components/Category";
import OrderList from "../../src/components/orderList";
import BusinessOrders from "../../src/components/businessOrders";

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
        const db = firebase.firestore();

        /*             GETTING CATEGORIES AND THEIR PRODUCTS            */
        // THIS NEED TO BE FIXED
        db.collection(`business/${businessKey}/category1`).get().then(documents => {
            documents.forEach(document => {
                if(document.id === "info") {
                    const { title, visible } = document.data();

                    this.setState(prevState => ({ category1: {...prevState.category1, title, visible } }))
                } else {
                    const { name, description, price, photoURL } = document.data();

                    const product = {
                        key: document.id,
                        name,
                        description,
                        price,
                        photoURL
                    };

                    this.setState(prevState => ({ category1: {...prevState.category1, products: [...prevState.category1.products, product] } }))
                }
            })
        })

        db.collection(`business/${businessKey}/category2`).get().then(documents => {
            documents.forEach(document => {
                if(document.id === "info") {
                    const { title, visible } = document.data();

                    this.setState(prevState => ({ category2: {...prevState.category2, title, visible } }))
                } else {
                    const { name, description, price, photoURL } = document.data();

                    const product = {
                        key: document.id,
                        name,
                        description,
                        price,
                        photoURL
                    };

                    this.setState(prevState => ({ category2: {...prevState.category2, products: [...prevState.category2.products, product] } }))
                }
            })
        })

        db.collection(`business/${businessKey}/category3`).get().then(documents => {
            documents.forEach(document => {
                if(document.id === "info") {
                    const { title, visible } = document.data();

                    this.setState(prevState => ({ category3: {...prevState.category3, title, visible } }))
                } else {
                    const { name, description, price, photoURL } = document.data();

                    const product = {
                        key: document.id,
                        name,
                        description,
                        price,
                        photoURL
                    };

                    this.setState(prevState => ({ category3: {...prevState.category3, products: [...prevState.category3.products, product] } }))
                }
            })
        })

        db.collection(`business/${businessKey}/category4`).get().then(documents => {
            documents.forEach(document => {
                if(document.id === "info") {
                    const { title, visible } = document.data();

                    this.setState(prevState => ({ category4: {...prevState.category4, title, visible } }))
                } else {
                    const { name, description, price, photoURL } = document.data();

                    const product = {
                        key: document.id,
                        name,
                        description,
                        price,
                        photoURL
                    };

                    this.setState(prevState => ({ category4: {...prevState.category4, products: [...prevState.category4.products, product] } }))
                }
            })
        })

        db.collection(`business/${businessKey}/category5`).get().then(documents => {
            documents.forEach(document => {
                if(document.id === "info") {
                    const { title, visible } = document.data();

                    this.setState(prevState => ({ category5: {...prevState.category5, title, visible } }))
                } else {
                    const { name, description, price, photoURL } = document.data();

                    const product = {
                        key: document.id,
                        name,
                        description,
                        price,
                        photoURL
                    };

                    this.setState(prevState => ({ category5: {...prevState.category5, products: [...prevState.category5.products, product] } }))
                }
            })
        })

        db.collection(`business/${businessKey}/category6`).get().then(documents => {
            documents.forEach(document => {
                if(document.id === "info") {
                    const { title, visible } = document.data();

                    this.setState(prevState => ({ category6: {...prevState.category6, title, visible } }))
                } else {
                    const { name, description, price, photoURL } = document.data();

                    const product = {
                        key: document.id,
                        name,
                        description,
                        price,
                        photoURL
                    };

                    this.setState(prevState => ({ category6: {...prevState.category6, products: [...prevState.category6.products, product] } }))
                }
            })
        })
    }

    render() {
        const businessKey = this.props.query.negocio;
        const business = this.context.business[this.context.businessKeys.indexOf(businessKey)];

        const { resetOrderList, uid } = this.context;

        const isBusinessOwner = uid === businessKey;

        let categories = [this.state];
        categories = Object.values(categories[0]);

        return(
            <Fragment>
                <Head>
                    <title>{business && `Pedir comida en ${business.name} |`} ⚡️ Santiamén | Comida a domicilio en San Carlos Antioquia</title>
                </Head>

                <header>
                    <Header back resetOrderList={resetOrderList} />
    
                    <BusinessCard 
                        photo={business && business.photoURL}
                        name={business && business.name}
                        active={business && business.active}
                    />
                </header>

                <main>
                    {
                        !isBusinessOwner &&
                            categories.length > 0 &&
                                categories.map((category, index) => 
                                    category.visible ?
                                        category.products.length > 0 &&
                                            <Category key={index} title={category.title} products={category.products} />     
                                    :
                                        <Category />
                                )
                    }

                    {
                        isBusinessOwner &&
                            categories.map((category, index) => 
                                <Category key={index} businessOwner={true} title={category.title} products={category.products} />
                            )
                    }       
                </main>

                {!isBusinessOwner && <OrderList businessKey={businessKey} />}
                
                {isBusinessOwner && <BusinessOrders />}

                <style jsx global>{`
                    body {
                        padding-bottom: 4rem;
                    }

                    header {
                        background: rgba(0, 0, 0, .4);
                        height: 180px;
                        display: grid;
                        align-items: flex-end;
                        background-image: url(${business && business.backgroundURL});
                        background-attachment: fixed;
                        position: relative;
                        z-index: 1;
                    }
    
                    header::after {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        background: linear-gradient(transparent, #121212);
                        z-index: -1;
                    }
    
                    .businessCard {
                        background: transparent !important;
                        border: none !important;
                        margin: 0 !important;
                        color: white;
                    }
                `}</style>
            </Fragment>
        )
    }
}