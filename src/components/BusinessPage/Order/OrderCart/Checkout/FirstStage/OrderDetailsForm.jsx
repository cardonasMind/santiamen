import React, { Fragment } from "react";

import { FormGroup, Input } from "rsuite";

export default function OrderDetailsForm({ details, name, handleChange }) {
	return (
		<Fragment>
			<FormGroup>
				<h2>Indicaciones</h2>
                <Input name="details" size="sm" placeholder="Casa color blanco al lado de..." value={details} onChange={handleChange} />
				* Ayúdanos a encontrarte más fácilmente.
            </FormGroup>

            <FormGroup>
				<h2>Digíta tu nombre</h2>
                <Input name="name" size="sm" value={name} onChange={handleChange} />
            </FormGroup>
			
			<style jsx>{`
                h2 {
					margin-bottom: .4rem;
				}
			`}</style>
		</Fragment>
	)
}