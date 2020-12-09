import { PureComponent } from "react";

import EditCategory from "./EditCategory";

import { PlaceHolderElement } from "../../../../../utils";

export default class extends PureComponent {
    render() {
        const { title } = this.props;
        
        return(
            <h1>
                {title ? title : <PlaceHolderElement width="60vw" height="1.6rem" opacity=".1" />}
                
                <EditCategory {...this.props} /> {/* isBusinessOwner, id, visible, title */}
                
                <style jsx>{`
                    h1 {
                        display: grid;
                        grid-template-columns: auto 1fr;
                        grid-gap: .6rem;
                        color: white;
                    }
                `}</style>
            </h1>
        )
    }
}