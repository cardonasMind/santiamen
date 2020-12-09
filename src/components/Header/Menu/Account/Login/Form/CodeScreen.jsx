import React from "react";

import { Form, FormGroup, Input, Button } from "rsuite";

export default function CodeScreen({ phoneCode, handleChange, handlePhoneCode }) {
	return(
		<Form>
			<FormGroup>
				<h2>Código de verificación</h2>
                <Input 
                    type="number"
                    size="sm" 
                    name="phoneCode"
                    value={phoneCode}
					onChange={handleChange}
                />
            </FormGroup>

            <FormGroup>
				<Button appearance="primary" onClick={handlePhoneCode}>Acceder</Button>
            </FormGroup>
			
			<style jsx>{`
				h2 {
					margin-bottom: .4rem;
				}
			`}</style>
        </Form>
	)
}