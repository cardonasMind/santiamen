import React, { Fragment } from "react";

import Link from "next/link";

import { Button } from "rsuite";

import { PlaceHolderElement } from "../../../../utils";

export default function Logged({ name, uid, handleLogout }) {
    return(
        <Fragment>
            {
                name 
                    ? <Link href={`/negocio/${uid}`}><a><h2>{name}</h2></a></Link>
                    : <h2><PlaceHolderElement width="100%" height="1.4rem" opacity=".1" /></h2>
            }
            
            <Button color="red" size="xs" onClick={handleLogout}>Cerrar sesión</Button>
            
            <style jsx>{`
                h2 {
                    margin-bottom: .4rem;
                }
            `}</style>
        </Fragment>
    )
}