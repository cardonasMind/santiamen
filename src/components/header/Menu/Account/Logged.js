import React, { Fragment } from "react";

import Link from "next/link";

import { Button } from "rsuite";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Logged({ name, uid, handleLogout }) {
    return(
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
    )
}