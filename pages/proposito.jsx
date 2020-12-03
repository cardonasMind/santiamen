import { PureComponent, Fragment } from "react";

import Head from "next/head";

import Header from "../src/components/Header";

export default class extends PureComponent {
    render() {
        return(
            <Fragment>
                <Head>
                    <title>Nuestro propósito - ⚡️ Santiamén | Comida a domicilio en San Carlos Antioquia</title>
                    <meta name="theme-color" content="#89a09c" />
                </Head>

                <Header back />

                <main>
                    <div>
                        <h1>La razón de nuestra existencia</h1>
                        <p>Santiamén nace con la iniciativa de ser la plataforma de comida a domicilio #1 en el municipio de San Carlos.</p>
                    </div>

                    <div>
                        <h1>Planes a futuro</h1>
                        <p>Apenas somos un pequeño proyecto que se busca un lugar en las reuniones familiares, los parches con los amigos, y los momentos de comida en casa, rápido y sin costo adicional.</p>
                    </div>
                </main>

                <style jsx global>{`
                    body {
                        background: url("/images/misc/proposito-background.jpg");
                        background-size: cover;
                        height: 100vh;
                        z-index: 1;
                    }

                    body::after {
                        position: absolute;
                        content: "";
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        background: linear-gradient(rgba(0, 0, 0, .6), transparent);
                        z-index: -1;
                    }

                    main {
                        padding: 4rem 1rem;
                        color: white;
                        display: grid;
                        grid-gap: 2rem;
                        text-align: justify;
                    }

                    h1 {
                        text-align: right;
                        margin-bottom: .6rem;
                    }
                `}</style>
            </Fragment>
        )
    }
}
