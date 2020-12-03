import { PureComponent } from "react";

import { Badge, Icon } from "rsuite";

export default class extends PureComponent {
    render() {
        return (
            <div id="order-list">
                <Badge content={1}>
                    Tu pedido <Icon icon="shopping-cart" />
                </Badge>     
                
                <style jsx>{`
                    #order-list {
                        position: fixed;
                        right: 0;
                        bottom: 0;//${orderList.length > 0 ? 0 : "-100vh"};
                        left: 0;
                        background: white;
                        padding: 1rem;
                        transition: .4s;
                        z-index: 999;
                    }
                `}</style>
            </div>
        )
    }
}