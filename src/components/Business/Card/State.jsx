import React, { Fragment } from "react";

import { Tag } from "rsuite";

import { PlaceHolderElement } from "../../../utils";

export default function State({ active }) {
	return (
		<Fragment>
			{
				active !== undefined 
					? active 
						? <Tag color="green" className="businessStateTag">Recibiendo pedidos</Tag> 
						: <Tag color="red" className="businessStateTag">Cerrado</Tag> 
					: <PlaceHolderElement width="40%" height="2rem" opacity=".1" />	
			}
	
			<style jsx>{`
                .businessStateTag {
                    width: fit-content;
                }
            `}</style>
		</Fragment>
	)
}