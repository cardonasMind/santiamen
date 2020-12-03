import { PureComponent } from "react";

import EditCategory from "./EditCategory";

export default class extends PureComponent {
    render() {
        const { title } = this.props;
        
        return(
            <h1>
                {title ? title : <div className="placeHolderElement" />}
                
                <EditCategory {...this.props} /> {/* isBusinessOwner, id, visible, title */}
                
                <style jsx>{`
                    h1 {
                        display: grid;
                        grid-template-columns: 1fr auto;
                        grid-gap: .6rem;
                        color: white;
                    }

                    .placeHolderElement {
                        background: rgba(255, 255, 255, .2);
                        width: 60%;
                        height: 1.6rem;
                    }
                `}</style>
            </h1>
        )
    }
}