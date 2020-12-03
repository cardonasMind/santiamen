import React, { Fragment } from "react";

import Link from "next/link";

import BusinessCard from "../Card";

export default function PrintBusiness({ category, business, businessKeys }) {
    return (
        business.length > 0 
            ?
                business.map((business, index) => {
                    // Selected category in SelectCategoryNav.js
                    if(business.category === category) {
                        return (
                            <Link key={businessKeys[index]} href={`/negocio/${businessKeys[index]}`}>
                                <a><BusinessCard
                                    photo={business.photoURL}
                                    name={business.name}
                                    active={business.active}
                                /></a>
                            </Link>
                        )            
                    }
                })
            :
                <Fragment>
                    <BusinessCard />
                    <BusinessCard />
                    <BusinessCard />
                </Fragment>
    )
}