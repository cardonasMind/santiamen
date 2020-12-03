import React from "react";

import Header from "../../Header";
import { BusinessCard } from "../../Business";
import EditBusiness from "./EditBusiness";

export default function BusinessPageHeader({ isBusinessOwner, business }) {
    return(
        <header>
            <Header back />
    
            <BusinessCard 
                photo={business && business.photoURL}
                name={business && business.name}
                active={business && business.active}
            />
            
            <EditBusiness isBusinessOwner={isBusinessOwner} />
            
            <style jsx global>{`
                header {
                    height: 70vh;
                    display: grid;
                    align-items: flex-end;
                    background: rgba(255, 255, 255, .6);
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
                    background: linear-gradient(transparent, #2B2B2B);
                    z-index: -1;
                }

                .businessCard {
                    background: transparent !important;
                    border: none !important;
                    margin: 0 !important;
                    color: white;
                }
            `}</style>
        </header>
    )
}