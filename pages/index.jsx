import { PureComponent, Fragment } from "react";

import { mainContext } from "../src/context";

//import Header from "../src/components/Header";
import { BusinessOwnerCard, BusinessList } from "../src/components/Business";

export default class extends PureComponent {
    static contextType = mainContext;

    render () {
        return (
            <Fragment>
                {/*<Header />*/}

                <header>
                    <h1>Santiamén</h1>
                </header>

                <BusinessOwnerCard />

                <main>
                    <BusinessList />
                </main>
        
                <style jsx global>{`
                    header {
                        background-color: var(--red);
                        background-image: url("/images/misc/index-background.jpg");
                        background-attachment: fixed;
                        background-size: contain;
                        height: 200px;
                        display: flex;
                        align-items: flex-end;
                        justify-content: center;
                    }

                    header h1 {
                        color: white;        
                        font-size: 2rem;
                        margin: 3rem 0;    
                    }
                `}</style>
            </Fragment>    
        )
    }
}