import React from "react";

import Link from "next/link";

import { Icon } from "rsuite";

export default function BackArrow({ back, resetOrderList }) {
    if(back) 
        return (
            <span>
                <div onClick={resetOrderList}>
                    <Link href="/" >
                        <a><Icon icon="angle-left" size="2x" /></a>
                    </Link>
                </div>
            </span>
        );
    else return <span></span>
}