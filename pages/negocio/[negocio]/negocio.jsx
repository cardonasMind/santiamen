import { PureComponent, Fragment } from "react";

import Head from "next/head";

import { BusinessPageHeader, BusinessPageCategories, BusinessPageOrders } from "../../../src/components/BusinessPage";

export default class extends PureComponent {
    render() {
        const { isBusinessOwner, business, categories } = this.props;
    
        return (
            <Fragment>
                <Head>
                    <title>{business && `Pedir comida en ${business.name} |`} ⚡️ Santiamén | Comida a domicilio en San Carlos Antioquia</title>
                </Head>
            
                <BusinessPageHeader isBusinessOwner={isBusinessOwner} business={business} />
                
                <main>
                    <BusinessPageCategories isBusinessOwner={isBusinessOwner} categories={categories} />
                </main>
            
                <BusinessPageOrders isBusinessOwner={isBusinessOwner} />

                <style jsx global>{`
                    body {
                        padding-bottom: 4rem;
                        background: #2B2B2B !important;
                    }
                `}</style>
            </Fragment>
        )
    }
}