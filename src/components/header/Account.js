import React from "react";

import Register from "./Register";
import Login from "./Login";

const Account = () => {
    return(
        <div id="menu-account">
            <div id="account-data">
                <Register />
                <Login />
            </div>
            <div id="account-photo" />

            <style jsx>{`
                #menu-account {
                    margin-bottom: 1rem;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    grid-gap: 1rem;
                }

                #account-photo {
                    width: 60px;
                    height: 60px;
                    border-radius: .6rem;
                    border: 1px solid rgb(0, 0, 0, .2);
                    background-color: rgba(0, 0, 0, .2);
                }
            
            `}</style>
        </div>
    )
}

export default Account;