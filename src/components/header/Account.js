import React, { Fragment, useContext } from "react";

import Link from "next/link";

import { MainContext } from "../../config/MainContext";

import Register from "./Register";
import Login from "./Login";

import { Button } from "rsuite";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Account = () => {
    const context = useContext(MainContext);

    const { uid, name, photoURL, handleLogout } = context;

    return(
        <div id="menu-account">
            <div id="account-data">
                {
                    uid !== ""
                    ?
                        <Fragment>
                            {
                                name ? <Link href={`/negocio/${uid}`}><a><h2>{name}</h2></a></Link>
                                :
                                    <h2><SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .2)">
                                        <Skeleton width="80%" height="1.4rem" duration={3} />
                                    </SkeletonTheme></h2>
                            }
                            <Button color="red" size="xs" onClick={handleLogout}>Cerrar sesión</Button>
                        </Fragment>
                    :
                        <Fragment>
                            <Register />
                            <Login />
                        </Fragment>
                }
                
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

export default Account;