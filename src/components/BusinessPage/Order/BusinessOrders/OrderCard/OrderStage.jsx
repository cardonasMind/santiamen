import React from "react";

export default function OrderStage({ stage }) {
	return (
		<div className="orderStage">
			{
				stage === 0 && <p><img width="18px" src="/icons/confirmed.svg" /> Esperando confirmación.</p>
			}
			
			{
				stage === 1 && <p><img width="18px" src="/icons/cooking.svg" /> Preparando pedido.</p>
			}
			
			{
				stage === 2 && <p><img width="18px" src="/icons/delivering.svg" /> Enviando pedido.</p>
			}
		
			<style jsx>{`
                .orderStage {
                    background: ${stage == 0 ? "rgba(0, 0, 0, .3)" : stage == 1 ? "rgb(76, 175, 80, .6)" : "rgba(0, 188, 212, .6)"};
                    padding: .4rem;
                    margin: 0 0 -1rem -1rem;
                    color: white;
					border-radius: 0 0 0 .4rem;
                }
			`}</style>
		</div>
	)
}