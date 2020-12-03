import { PureComponent } from "react";

import { mainContext } from "../../../context";

import SelectCategoryNav from "./SelectCategoryNav";
import PrintBusiness from "./PrintBusiness";

export default class extends PureComponent {
    static contextType = mainContext;

    state = {
        category: "fast-food"
    }

    handleSelect = category => this.setState({ category });

    render() {
        const { category } = this.state;
        const { business, businessKeys } = this.context.business;
        
        return(
            <div id="business-list-container">
                <SelectCategoryNav appearance="subtle" active={category} onSelect={this.handleSelect} />
                
                <div id="business-list">
                    <PrintBusiness category={category} business={business} businessKeys={businessKeys} />
                </div>
                
                <style jsx>{`
                    #business-list-container {
                        padding: 1rem;
                    }

                    #business-list {
                        padding: 1rem 0;
                        display: grid;
                        grid-gap: 1rem;
                    }
                `}</style>
            </div>    
        )
    }
}