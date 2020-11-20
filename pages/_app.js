import React from "react";

import App from "next/app";
import Head from "next/head";

import { MainContextProvider } from "../src/config/MainContext";

import 'rsuite/lib/styles/index.less';

export default class extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        //Anything returned here can be access by the client
        return { pageProps };
    }
    
    render() {
        const { Component, pageProps } = this.props;
        
        return (
            <MainContextProvider>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>⚡️ Santiamén | Comida a domicilio en San Carlos Antioquia</title>
                    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
                    <meta name="theme-color" content="#FF3B3B" />

                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />

                    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
                    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
                </Head>

                <Component {...pageProps} />
                
                <style jsx global>{`
                    * {
                        font-size: 12px;
                        font-family: Poppins, Helvetica, Arial, sans-serif;
                        margin: 0;
                        box-sizing: border-box;
                        text-decoration: none !important;
                    }

                    body {
                        margin: 0;
                        background-color: #EFEFEF;
                    }

                    h1, h2, h3, h4, h5, h6 {
                        font-family: Poppins, Helvetica, Arial, sans-serif;
                        line-height: inherit;
                    }

                    h1 {
                        font-size: 1.6rem;
                    }

                    h2 {
                        font-size: 1.4rem;
                    }

                    h3 {
                        font-size: 1.2rem;
                    }

                    h4 {
                        font-size: 1.1rem;
                    }

                     :root {
                        --red: #FF3B3B;
                        --green: #4CAF50;
                    }  
                `}</style>
            </MainContextProvider>
        )
    }
}