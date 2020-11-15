import { PureComponent } from "react";

import Link from "next/link";
import Router from "next/router";

import { Button, Notification, Modal, Icon } from "rsuite";

import { MainContext } from "../../config/MainContext";

import { NumberToMoney } from "../../config/Utils";

import OrderListProduct from "./OrderListProduct";
import OrderStage from "./OrderStage";

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        stage: 0,
        time: "",

        showGoHomeModal: false
    }

    toggleShowGoHomeModal = () => 
        this.setState(prevState => ({ showGoHomeModal: !prevState.showGoHomeModal }));

    componentDidMount() {
        const { orderInfo } = this.context;
        const { lat, lng } = orderInfo;

        const map = L.map('mapId').setView([lat, lng], 16);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map).bindPopup('Enviaremos tu pedido aquí.').openPopup();


        const { ref } = orderInfo;
        ref.onSnapshot(doc => {
            const { stage, time } = doc.data();

            this.setState({ stage, time });
        },
        error => {
            Notification.error({
                title: "Ocurrió un error",
                description: error
            });
        });
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

    goHome = () => {
        const { resetOrderList } = this.context;
        
        resetOrderList();

        Router.replace('/')
        return null
    }

    render() {
        const { stage, time, showGoHomeModal } = this.state;
        const { orderList, orderInfo } = this.context;
        const { details } = orderInfo;

        return (
            <div id="second-checkout-stage">
                <div id="header">
                    <h1>¡Todo en orden. Recibirás tu pedido en un santiamén!</h1>
                </div>

                <div id="order-stage">
                    <OrderStage stage={stage} time={time} />
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
                        <Button onClick={this.toggleShowGoHomeModal} appearance="primary" block>
                            Volver al inicio
                        </Button>

                        <Modal show={showGoHomeModal} style={{ width: "auto" }}>
                            <Modal.Body>
                                <div style={{ textAlign: "center", marginBottom: "1rem" }}>
                                    <Icon
                                        icon="remind"
                                        style={{
                                            color: '#ffb300',
                                            fontSize: "2rem"
                                        }}
                                    />
                                </div>
                                <p style={{ textAlign: "justify" }}>Si vuelves al inicio no podrás conocer el estado de tu pedido.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={this.goHome} appearance="primary">
                                    Volver al inicio
                                </Button>
                                <Button onClick={this.toggleShowGoHomeModal} appearance="subtle">
                                    Cancelar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </main>

                <style jsx>{`
                    #second-checkout-stage {
                        background: url("/images/hablar-background.jpg");
                        color: white;
                        z-index: -1;
                        position: relative;
                        padding-bottom: 4rem;
                        overflow-x: auto;
                    }

                    #second-checkout-stage::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, 0.2), rgb(0, 0, 0, 0.6));
                        position: absolute;
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

                    #order-stage {
                        margin-top: 2rem;
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
