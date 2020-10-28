import { PureComponent, createRef } from "react";

import { Icon, Drawer, Button } from "rsuite";

import OrderProduct from "./OrderProduct";

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

    processOrder = () => {
        const { id, processOrder } = this.props;

        processOrder(id);
    }

    render() {
        const { showOrderDetailsDrawer, mapRef } = this.state;
        const { date, name, order } = this.props;

        return(
            <div className="orderCard">
                <div className="order">
                    <p>{date}</p>
                    <h3>{name}</h3>
                </div>
                <div className="orderDetails" onClick={this.toggleShowOrderDetailsDrawer}>
                    <Icon icon="angle-right" size="2x" />
                </div>
    
                <Drawer placement="right" full show={showOrderDetailsDrawer} onEnter={this.renderMap} onHide={this.toggleShowOrderDetailsDrawer} >
                    <Drawer.Header>
                        <Drawer.Title></Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        <p>{date}</p>
                        <h2>Pedido de: {name}</h2>
                        <div ref={mapRef} id="mapId"></div>

                        <div id="order-products">
                            {
                                order.map(product => <OrderProduct {...product} />)
                            }
                        </div>

                        <Button appearance="primary" block onClick={this.processOrder}>Se envió el pedido</Button>
                    </Drawer.Body>
                </Drawer>
    
                <style jsx>{`
                    .orderCard {
                        background: rgba(0, 0, 0, .1);
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
                        margin: 1rem 0;
                    }

                    #order-products {
                        display: grid;
                        grid-gap: 1rem;
                        margin-bottom: 1rem;
                    }
                `}</style>
            </div>
        )
    }
}