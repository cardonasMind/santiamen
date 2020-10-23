import { PureComponent, Fragment } from "react";

import Head from "next/head";

import Header from "../src/components/header";

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
                        background: url("/images/proposito-background.jpg");
                        background-size: cover;
                    }

                    #page {
                        background: linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .2));
                        height: 100vh;
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
