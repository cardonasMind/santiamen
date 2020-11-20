import React, { Fragment, useContext } from "react";

import { MainContext } from "../../../../config/MainContext";

import Logged from "./Logged";
import Login from "./Login";

export default function Account() {
    const context = useContext(MainContext);

    const { uid, name, photoURL, handleLogout } = context;
    
    return(
        <div id="menu-account">
            <div id="account-data">
                { uid !== "" ? <Logged name={name} uid={uid} handleLogout={handleLogout} /> : <Login /> }   
            </div>
            <div id="account-photo" />

            <style jsx>{`
                #menu-account {
                    margin-bottom: 1rem;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    grid-gap: 1rem;
                }

                #account-data h2 {
                    margin-bottom: .4rem;
                }

                #account-photo {
                    width: 60px;
                    height: 60px;
                    border-radius: .6rem;
                    border: 1px solid rgb(0, 0, 0, .2);
                    background-color: rgba(0, 0, 0, .2);
                    background-image: url(${photoURL});
                    background-size: cover;
                    background-position: center;
                }
            `}</style>
        </div>
    )
}