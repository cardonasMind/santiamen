import { PureComponent, Fragment } from "react";

import Head from "next/head";
import Link from "next/link";

import { Input, Button, Icon } from "rsuite";

import Header from "../src/components/header";

export default class extends PureComponent {
    state = {
        message: ""
    }

    handleChange = value => this.setState({ message: value })

    render() {
        const { message } = this.state;

        return(
            <Fragment>
                <Head>
                    <title>Envíanos un mensaje - ⚡️ Santiamén | Comida a domicilio en San Carlos Antioquia</title>
                    <meta name="theme-color" content="#edcc3b" />
                </Head>

                <Header back />

                <main>
                    <h1>Envianos un mensaje</h1>
                    <Input value={message} onChange={this.handleChange} componentClass="textarea" rows={8} placeholder="Tu mensaje aquí" />
                    <div id="form-buttons">
                        <Link href={`https://wa.me/573216328834?text=${message}`}>
                            <a><Button color="green" block>
                                Enviar WhatsApp <Icon icon="whatsapp" />
                            </Button></a>
                        </Link>
                    </div>

                    <div id="contact-info">
                        <b>Celular</b> 
                        <p>+57 3216328834</p>
                        <br />
                        <b>Email</b>
                        <p>person.cardonadiego@gmail.com</p>
                    </div>
                </main>
                
                <style jsx global>{`
                    body {
                        background: url("/images/misc/hablar-background.jpg");
                        background-size: cover;
                    }

                    #page {
                        background: linear-gradient(rgba(0, 0, 0, .6), transparent);
                    }

                    main {
                        padding: 6rem 1rem;
                        display: grid;
                        grid-gap: 1rem;
                    }

                    main h1 {
                        color: white;
                        text-align: right;
                    }

                    #contact-info {
                        background: rgba(255, 255, 255, .6);
                        margin: auto -1rem;
                        padding: 2rem;
                    }       
                `}</style>
            </Fragment>
        )
    }
}
