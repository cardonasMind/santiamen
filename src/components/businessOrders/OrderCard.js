import { PureComponent, createRef } from "react";

import { Icon, Drawer, Button } from "rsuite";

import OrderProduct from "./OrderProduct";
import OrderStage from "../orderList/OrderStage";
import { render } from "less";

const ReducedOrderStage = ({ stage }) => {
    return(
        <div className="reducedOrderStage">
            <OrderStage hideMessage stage={stage} />

            <style jsx global>{`
                .reducedOrderStage {
                    margin: .4rem 0;
                }
                .reducedOrderStage .orderStage .orderStageProgress {
                    margin-top: .3rem;
                }

                .reducedOrderStage .orderStage .orderStageItem img {
                    width: 2.6rem;
                } 
                
                .reducedOrderStage .orderStage .orderStageItem p {
                    font-size: .8rem;
                }
            `}</style>
        </div>
    )
}

class OrderStageButton extends PureComponent {
    processOrderCooking = () => {
        const { processOrder, id, stage } = this.props;

        const time = prompt("Tiempo para preparar el pedido")

        processOrder(id, stage, time);
    }


    render() {
        const { processOrder, id, stage } = this.props;

        return(
            <div>
                {
                    stage == 0 &&
                        <Button onClick={this.processOrderCooking} color="green" block><img width="18px" src="/icons/cooking.svg" /> Confirmar y preparar pedido</Button>
                }

                {
                    stage == 1 &&
                        <Button onClick={() => processOrder(id, stage)} color="cyan" block><img width="18px" src="/icons/delivering.svg" /> Enviar pedido</Button>
                }

                {
                    stage == 2 &&
                        <Button onClick={() => processOrder(id, stage)} appearance="primary" block><img width="18px" src="/icons/delivered.svg" /> Pedido enviado</Button>
                }
            </div>
        )
    }
}

export default class extends PureComponent {
    state = {
        showOrderDetailsDrawer: false,
        mapRef: createRef()
    }

    toggleShowOrderDetailsDrawer = () => 
        this.setState(prevState => ({ showOrderDetailsDrawer: !prevState.showOrderDetailsDrawer }));

    renderMap = () => {
        const { mapRef } = this.state;
        const { lat, lng } = this.props;

        const map = L.map(mapRef.current).setView([lat, lng], 14);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lng]).addTo(map)
            .bindPopup('Enviar pedido aquí.')
            .openPopup();
    }

    render() {
        const { showOrderDetailsDrawer, mapRef } = this.state;
        const { date, name, details, order, stage, id, processOrder } = this.props;

        return(
            <div className="orderCard">
                <div className="order">
                    <p>{date}</p>
                    <h3>{name}</h3>
                </div>
                <div className="orderDetails" onClick={this.toggleShowOrderDetailsDrawer}>
                    <Icon icon="angle-right" size="2x" />
                </div>
                <ReducedOrderStage stage={stage} />
    
                <Drawer placement="right" full show={showOrderDetailsDrawer} onEnter={this.renderMap} onHide={this.toggleShowOrderDetailsDrawer} >
                    <Drawer.Header>
                        <p>{date}</p>
                        <h2>Pedido de: {name}</h2>
                    </Drawer.Header>
                    <Drawer.Body>
                        <ReducedOrderStage stage={stage} />

                        <div ref={mapRef} id="mapId"></div>
                        * {details}

                        <div id="order-products">
                            {
                                order.map(product => <OrderProduct key={product.id} {...product} />)
                            }
                        </div>
                    </Drawer.Body>
                    <Drawer.Footer>
                        <OrderStageButton processOrder={processOrder} id={id} stage={stage} />
                    </Drawer.Footer>
                </Drawer>
    
                <style jsx>{`
                    .orderCard {
                        background: rgba(0, 0, 0, .14);
                        padding: 1rem;
                        border-radius: .6rem 0 0 .6rem;
                        border: 1px solid rgba(0, 0, 0, .1);
                        display: grid;
                        grid-template-columns: 1fr auto;
                        grid-gap: 1rem;
                    }
    
                    .orderDetails {
                        background: rgba(0, 0, 0, .15);
                        padding: .6rem;
                        margin: -1rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    #mapId {
                        height: 240px;
                    }

                    #order-products {
                        display: grid;
                        grid-gap: 1rem;
                        margin: 1rem 0;
                    }
                `}</style>
            </div>
        )
    }
}