import { PureComponent } from "react";

import { Button, Icon } from "rsuite";

import EditCategoryDrawer from "./Drawer";
import EditCategoryForm from "./Form";

export default class extends PureComponent {
    state = {
        showEditCategoryDrawer: false
    }

    toggleShowEditCategoryDrawer = () =>
        this.setState(prevState => ({ showEditCategoryDrawer: !prevState.showEditCategoryDrawer }));
    
    render() {
        const { showEditCategoryDrawer } = this.state;
        const { isBusinessOwner, id, visible, title } = this.props;
        
        if (isBusinessOwner)
            return (
                <div className="editCategory">
                    <Button onClick={this.showEditCategoryDrawer} appearance="primary" size="xs" >
                        <Icon icon="gear" />
                    </Button>
                    
                    <EditCategoryDrawer title={title} showEditCategoryDrawer={showEditCategoryDrawer} 
                        toggleShowEditCategoryDrawer={this.toggleShowEditCategoryDrawer}>
                        <EditCategoryForm id={id} visible={visible} title={title} 
                            toggleShowEditCategoryDrawer={this.toggleShowEditCategoryDrawer} />
                    </EditCategoryDrawer>
                </div>
            )
        else return null
    }
}