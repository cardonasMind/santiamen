import { PureComponent, Fragment } from "react";

import Header from "../src/components/header";
import BusinessList from "../src/components/BusinessList";

export default class extends PureComponent {
  render() {
    return (
      <Fragment>
        <Header />

        <header>
          <h1>Santiamén</h1>
        </header>

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
        `}</style>
      </Fragment>
    );
  }
}
