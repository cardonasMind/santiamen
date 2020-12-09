import { PureComponent } from "react";

import { Icon } from "rsuite";

import NewProductDrawer from "./Drawer";
import NewProductForm from "./Form";

export default class extends PureComponent {
    state = {
        showNewProductDrawer: false
    }
	
	toggleShowNewProductDrawer = () => this.setState(prevState => ({ showNewProductDrawer: !prevState.showNewProductDrawer }));

    render() {
		const { showNewProductDrawer } = this.state;
        const { isBusinessOwner, id } = this.props;
        
        if(isBusinessOwner)
            return (
                <div className="newProductContainer">
                    <div className="newProductButton" onClick={this.toggleShowNewProductDrawer}>
                        <Icon icon="plus" />
                    </div>
					
					<NewProductDrawer showNewProductDrawer={showNewProductDrawer} 
						toggleShowNewProductDrawer={this.toggleShowNewProductDrawer}>
						<NewProductForm toggleShowNewProductDrawer={this.toggleShowNewProductDrawer} id={id} />
					</NewProductDrawer>
                    
                    <style jsx>{`
                        .newProductContainer {
                            background: white;
                            width: 10rem;
                            height: 20rem;
                            border-radius: .4rem;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }

                        .newProductButton {
                            border: 1px dashed rgba(0, 0, 0, .4);
							background: rgba(0, 0, 0, .1);
                            border-radius: 50%;
                            padding: 1rem;
                            transition: .2s;
                        }

                        .newProductButton:hover {
                            background: rgba(0, 0, 0, .2);
                        }
                    `}</style>
                </div>
            )
        else return null;
    }
}