import { PureComponent } from "react";

import Link from "next/link";

import { Button } from "rsuite";

export default class extends PureComponent {
    render() {
        return(
            <div id="second-checkout-stage">
                <div id="header">
                    <h1>¡Todo en orden. Recibirás tu pedido en un santiamén!</h1>
                </div>
                
                <main>
                    <div>
                        <h2>Dirección de envio</h2>
                        <p>fodofdo fodofo dof</p>

                        <h2>Tu nombre</h2>
                        <p>Diego Cardona</p>
                    </div>

                    <div>
                        <p>Si no recibes tu pedido, <Link href="/hablar"><a>envíanos un mensaje</a></Link>, estaremos ahí para tí.</p>
                    </div>

                    <div>
                        <Link href="/"><a><Button appearance="primary" block>Volver al inicio</Button></a></Link>
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
                    }

                    #second-checkout-stage::after {
                        content: "";
                        background: linear-gradient(rgba(0, 0, 0, .2), rgb(255, 59, 59, .6));
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

                    main {
                        padding: 4rem;
                        display: grid;
                        grid-gap: 2rem;
                    }

                    main h2 {
                        margin-top: .4rem;
                    }
                `}</style>
            </div>
        )
    }
}