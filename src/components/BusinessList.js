import { Fragment, PureComponent } from "react";

import Link from "next/link";

import { MainContext } from "../config/MainContext";

import { Nav } from "rsuite";

import BusinessCard from "./BusinessCard";

const SelectCategoryNav = ({ active, onSelect, ...props }) => {
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect} >
        <Nav.Item eventKey="fast-food">🍔 Comida rápida</Nav.Item>
        <Nav.Item eventKey="restaurant">🥂 Restaurantes</Nav.Item>
      </Nav>
    );
};

export default class extends PureComponent {
    static contextType = MainContext;

    state = {
        active: "fast-food"
    }

    handleSelect = activeKey => this.setState({ active: activeKey });
    

    render() {
        const { active } = this.state;
        const { business, businessKeys } = this.context;

        return(
            <div id="business-list">
                <SelectCategoryNav appearance="subtle" active={active} onSelect={this.handleSelect} />

                {
                    business.length > 0 
                    ?
                        business.map((business, index) => {
                            if(business.category === active) {
                                return (
                                    <Link key={businessKeys[index]} href={`/negocio/${businessKeys[index]}`}>
                                        <a><BusinessCard
                                            photo={business.photoURL}
                                            name={business.name}
                                            active={business.active}
                                        /></a>
                                    </Link>
                                )
                                
                            }
                        })
                    :
                    <Fragment>
                        <BusinessCard />
                        <BusinessCard />
                        <BusinessCard />
                    </Fragment>
                }

                <style jsx>{`
                    #business-list {
                        padding: 1rem;
                    }
                `}</style>
            </div>
        )
    }
}