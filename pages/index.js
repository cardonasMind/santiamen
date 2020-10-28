import { PureComponent, Fragment } from "react";

import Link from "next/link";

import { MainContext } from "../src/config/MainContext";

import Header from "../src/components/header";
import BusinessList from "../src/components/BusinessList";
import BusinessCard from "../src/components/BusinessCard";

export default class extends PureComponent {
  static contextType = MainContext;

  render() {
    const { uid, name, photoURL, active } = this.context;

    return (
        <Fragment>
            <Header />

            <header>
                <h1>Santiamén</h1>
            </header>

            {
                uid !== "" &&
                    <div id="your-business-card">
                        <h2>Tú negocio</h2>
                        <Link href={`/negocio/${uid}`}><a>
                            <BusinessCard 
                                photo={photoURL}
                                name={name}
                                active={active}
                            />
                        </a></Link>
                    </div>
            } 
        
            <main>
                <BusinessList />
            </main>

            <style jsx global>{`
                header {
                    background-color: var(--red);
                    background-image: url("/images/index-background.jpg");
                    background-attachment: fixed;
                    background-size: contain;
                    height: 180px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                }

                header h1 {
                    color: white;
                    font-size: 2rem;
                    margin: 3rem 0;
                }

                #your-business-card {
                    padding: 1rem;
                    background: white;
                    margin: 0 1rem;
                    margin-top: -2rem;
                    border-radius: .6rem;
                }
            `}</style>
        </Fragment>
        );
    }
}
