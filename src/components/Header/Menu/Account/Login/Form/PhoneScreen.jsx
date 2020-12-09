import React from "react";

import { Form, FormGroup, Input, Button } from "rsuite";

export default function PhoneScreen({ phoneNumber, handleChange, handleSendPhoneCode }) {
	return(
		<Form>
            <FormGroup>
				<h2>Tu número de celular</h2>
                <Input 
					size="sm" 
                    value={phoneNumber}
                    type="number"
                    name="phoneNumber"
                    onChange={handleChange}
                />
            </FormGroup>

            <FormGroup>
                <Button 
                    appearance="primary" 
                    onClick={e => handleSendPhoneCode(e)}
                >
					Enviar código
				</Button>
            </FormGroup>
			
			<style jsx>{`
				h2 {
					margin-bottom: .4rem;
				}
			`}</style>
        </Form>
	)
}