import React, { Fragment } from "react";

import { PlaceHolderElement } from "../../../utils";

export default function Name({ name }) {
    return <h2>{ name ? name : <PlaceHolderElement width="90%" height="1.4rem" opacity=".1" /> }</h2>
}