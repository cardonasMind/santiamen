import React from "react";

import Link from "next/link";

import { Icon } from "rsuite";

export default function BackArrow({ back }) {
    if(back) 
        return (
            <span>
                <Link href="/">
                    <a><Icon icon="angle-left" size="2x" /></a>
                </Link>
            </span>
        );
    else return <span></span>
}