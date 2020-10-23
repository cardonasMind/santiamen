import { PureComponent } from "react";

import Router from "next/router";

export default class extends PureComponent {
    render() {
        typeof(document) !== 'undefined' && Router.replace('/')
        return null
    }
}