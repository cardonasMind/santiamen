import { PureComponent, Fragment } from "react";

import LoginDrawer from "./Drawer";
import LoginForm from "./Form";

export default class extends PureComponent {
	state = {
		showLoginDrawer: false
	}
	
	toggleShowLoginDrawer = () => this.setState(prevState => ({ showLoginDrawer: !prevState.showLoginDrawer }));
	
	render() {
		const { showLoginDrawer } = this.state;
		
		return(
			<Fragment>
				<h2 onClick={this.toggleShowLoginDrawer}>Acceder</h2>
			
				<LoginDrawer showLoginDrawer={showLoginDrawer} toggleShowLoginDrawer={this.toggleShowLoginDrawer}>
                    <LoginForm />
                </LoginDrawer>
			</Fragment>
		)
	}
}