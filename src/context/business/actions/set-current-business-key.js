export default function setCurrentBusinessKey(businessKey) {
	const { currentBusinessKey } = this.state.business;
	
	/* This function is called in /negocio/index.jsx on componentDidUpdate method so in order to avoid 
	setState currentBusinessKey with the same value (this is because componentDidUpdate is called multiples times) */
	if(currentBusinessKey !== businessKey)
		this.setState(prevState => ({ business: {...prevState.business, currentBusinessKey: businessKey} }))	
}