import { PureComponent } from "react";

export default class extends PureComponent {
    state = {
        showAddProductDrawer: false
    }

    render() {
        const { isBusinessOwner } = this.props;
        
        if(isBusinessOwner)
            return (
                <div className="addNewProductContainer">
                    <div className="addNewProduct" onClick={this.toggleShowAddProductDrawer}>
                        <Icon icon="plus" />
                    </div>
                    
                    <style jsx>{`
                        .addNewProductContainer {
                            background: rgba(255, 255, 255, .6);
                            width: 10rem;
                            height: 20rem;
                            border-radius: .6rem;
                            border: 1px solid rgb(0, 0, 0, .2);
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            margin-top: ${products.length > 0 ? "auto" : "initial"};
                        }

                        .addNewProductContainer .addNewProduct {
                            border: 1px dashed rgba(0, 0, 0, .4);
                            border-radius: 50%;
                            padding: 1rem;
                            transition: .4s;
                        }

                        .addNewProductContainer .addNewProduct:hover {
                            background: rgba(0, 0, 0, .2);
                        }
                    `}</style>
                </div>
            )
        else return null;
    }
}