import { PureComponent } from "react";

import { Button, Icon } from "rsuite";

import EditBusinessDrawer from "./Drawer";
import EditBusinessForm from "./Form";

export default class extends PureComponent {
    state = {
        showEditBusinessDrawer: false
    }

    toggleShowEditBusinessDrawer = () => 
        this.setState(prevState => ({ showEditBusinessDrawer: !prevState.showEditBusinessDrawer }));
    
    render() {
        const { isBusinessOwner } = this.props;
        const { showEditBusinessDrawer } = this.state;

        if(isBusinessOwner) 
            return (
                <div id="edit-business">
                    <Button appearance="primary" size="xs" onClick={this.toggleShowEditBusinessDrawer} >
                        <Icon icon="gear" />
                    </Button>
                          
                    <EditBusinessDrawer showEditBusinessDrawer={showEditBusinessDrawer} 
                        toggleShowEditBusinessDrawer={this.toggleShowEditBusinessDrawer}>
                        <EditBusinessForm toggleShowEditBusinessDrawer={this.toggleShowEditBusinessDrawer} />
                    </EditBusinessDrawer>
                    
                    <style jsx>{`
                        #edit-business {
                            position: absolute;
                            right: 1rem;
                            bottom: 1rem;
                        }
                    `}</style>
                </div>
            )
        else return null
    }
}