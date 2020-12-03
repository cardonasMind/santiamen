import { PureComponent, Fragment } from "react";

import Head from "next/head";
import Link from "next/link";

import Header from "../src/components/Header";

export default class extends PureComponent {
    render() {
        return(
            <Fragment>
                <Head>
                    <title>Información legal - ⚡️ Santiamén | Comida a domicilio en San Carlos Antioquia</title>
                    <meta name="theme-color" content="#8c8a7e" />
                </Head>

                <Header back />

                <main>
                    <div>
                        <h1>Términos y condiciones de uso</h1>
                        <p>Santiamén es una plataforma intermediaría y como tal no nos hacemos cargo de los envíos, si en algún momento presenta inconformidad con algún pedido que hizo, hágasnolo saber <Link href="/hablar"><a>haciendo click aquí.</a></Link></p>
                        <p>Valoramos muchísimo su confianza, por ello únicamente permitimos negocios de comida confiables y que cumplan todas las normas sanitarias y legales.</p>
                    </div>

                    <div>
                        <h1>Políticas de privacidad</h1>
                        <p>Cualquier información que nos facilite será única y exclusivamente utilizada por los servicios de Google (servidores de almacenamiento y tratamiento de la información como Analytics) y en ningún momento le pediremos información sensible.</p>
                    </div>
                </main>

                <style jsx global>{`
                    body {
                        background: url("/images/misc/legal-background.jpg");
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
