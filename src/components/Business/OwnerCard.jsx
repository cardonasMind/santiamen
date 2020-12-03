import React, { useContext } from "react";

import { mainContext } from "../../context";

import Link from "next/link";

import BusinessCard from "./Card";

export default function BusinessOwnerCard() {
	// Getting that information from user context wich is in mainContext
    const { uid, name, photoURL, active } = useContext(mainContext).user;
    
    if(uid !== "") 
        return (
            <div id="business-owner-card">
                <h2>Tú negocio</h2>
                <Link href={`/negocio/${uid}`}><a>
                    <BusinessCard 
                        photo={photoURL}
                        name={name}
                        active={active}
                    />
                </a></Link>
                
                <style jsx>{`
                    #business-owner-card {
                        padding: 1rem;
                        background: white;
                        margin: 0 1rem;
                        margin-top: -2rem;
                        border-radius: .6rem;
                    }
                `}</style> 
            </div>
        )
    else return null 
}