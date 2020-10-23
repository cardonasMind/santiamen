import { Fragment, PureComponent } from "react";

import Head from "next/head";

import firebase from "../../src/config/firebase";

import { MainContext } from "../../src/config/MainContext";

import Header from "../../src/components/header";
import BusinessCard from "../../src/components/BusinessCard";
import Category from "../../src/components/Category";
import OrderList from "../../src/components/orderList";

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
        }
    }

    static getInitialProps({ query }) {
        return { query }
    }

    componentDidMount() {
        const businessKey = this.props.query.negocio;
        const db = firebase.firestore();

        /*             GETTING CATEGORIES AND THEIR PRODUCTS            */
        // Category1
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

        // Category2
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
    }

    render() {
        const { category1, category2 } = this.state;

        const businessKey = this.props.query.negocio;
        const business = this.context.business[this.context.businessKeys.indexOf(businessKey)];

        return(
            <Fragment>
                <Head>
                    <title>{business && `Pedir comida en ${business.name} |`} ⚡️ Santiamén | Comida a domicilio en San Carlos Antioquia</title>
                </Head>

                <header>
                    <Header back />
    
                    <BusinessCard 
                        photo={business && business.photoURL}
                        name={business && business.name}
                        active={business && business.active}
                    />
                </header>

                <main>
                    <Category title={category1.title} products={category1.products} />
                    <Category title={category2.title} products={category2.products} />
                </main>

                <OrderList />


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