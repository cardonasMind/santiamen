import { PureComponent } from "react";

import Link from "next/link";

import { Button } from "rsuite";

import { MainContext } from "../../config/MainContext";

import { NumberToMoney } from "../../config/Utils";

import OrderListProduct from "./OrderListProduct";

export default class extends PureComponent {
    static contextType = MainContext;

    componentDidMount() {
        const { lat, lng } = this.context.orderInfo;

        const map = L.map('mapId').setView([lat, lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map).bindPopup('Enviaremos tu pedido aquí.').openPopup();
    }

    calculateTotalPrice = () => {
        const { orderList } = this.context;
        let totalPrice = 0;

        orderList.map(product => {
            let { price, amount } = product;

            totalPrice += price * amount;
        });

        return NumberToMoney(totalPrice);
    }

    render() {
        const { orderList, orderInfo, resetOrderList } = this.context;
        const { details } = orderInfo;

        return (
            <div id="second-checkout-stage">
                <div id="header">
                    <h1>¡Todo en orden. Recibirás tu pedido en un santiamén!</h1>
                </div>

                <main>
                    <div>
                        <h2>Dirección de envio</h2>
                        <div id="mapId" />
                        * {details}
                    </div>

                    <div id="order-container">
                        <h2>Tu pedido</h2>
                        <div id="order-products">
                            {
                                orderList.map(product => 
                                    <OrderListProduct key={product.id} {...product} />
                                )
                            }
                        </div>

                        <h3>Total: ${this.calculateTotalPrice()}</h3>
                    </div>

                    <div>
                        <p>Si no recibes tu pedido, <Link href="/hablar"><a>envíanos un mensaje</a></Link>, 
                        estaremos ahí para tí.</p>
                    </div>

                    <div>
                        <Link href="/">
                            <a><Button onClick={resetOrderList} appearance="primary" block>
                                    Volver al inicio
                            </Button></a>
                        </Link>
                    </div>
                </main>

                <style jsx>{`
                    #second-checkout-stage {
                        background: url("/images/hablar-background.jpg");
                        background-size: cover;
                        height: 100%;
                        color: white;
                        z-index: -1;
                        position: relative;
                        padding-bottom: 4rem;
                        overflow-x: auto;
                    }

                    #second-checkout-stage::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0, 0.6));
                        position: fixed;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        z-index: -1;
                    }

                    #header {
                        text-align: right;
                        padding: 2rem 4rem 0;
                    }

                    main {
                        padding: 2rem 4rem;
                        display: grid;
                        grid-gap: 1rem;
                    }

                    main h2 {
                        margin-bottom: 0.4rem;
                    }

                    #mapId {
                        height: 240px;
                        margin: 0 -4rem;
                    }

                    #order-container {
                        background: rgba(0, 0, 0, .2);
                        margin: auto -4rem;
                        padding: .4rem 4rem;
                    }

                    #order-products {
                        max-height: 14rem;
                        overflow-x: auto;
                    }

                    #order-container h3 {
                        background: var(--green);
                        margin-top: .4rem;
                    }
                `}</style>
            </div>
        );
    }
}
