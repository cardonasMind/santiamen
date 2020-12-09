import { PureComponent, createRef } from "react";

import { Progress } from 'rsuite';

export default class extends PureComponent {
    constructor() {
        super();

        this.firstItem = createRef();
        this.secondItem = createRef();
        this.thirdItem = createRef();
        this.fourthItem = createRef();

        this.state = {
            stage: 0,
    
            items: [
                this.firstItem,
                this.secondItem,
                this.thirdItem,
                this.fourthItem
            ],
    
            stages: [
                {
                    progress: 0,
                    message: "Espera a que confirmen tu pedido."
                },
                {
                    progress: 50,
                    message: `Están preparando tu pedido y estará listo en ___`
                },
                {
                    progress: 80,
                    message: "¡Tu pedido está llegando!"
                },
                {
                    progress: 100,
                    message: "Disfruta tu pedido 😋 y gracias por confiar en nosotros."
                }
            ]
        }
    }

    renderStage = () => {
        const { stage, items } = this.state;

        const stages = this.state.stages;
        stages[1].message = 
            `Están preparando tu pedido y estará listo en ${this.props.time}`;
        
        this.setState({ stage: this.props.stage, stages });        

        const paintItem = item => {
            const { children } = item.current;

            children[0].style.background = "var(--green)";
            children[1].style.background = "var(--green)";
            children[1].style.color = "white";
        }

        if(stage === 1) {
            paintItem(items[0]);
            paintItem(items[1]);
        } else if(stage === 2 || stage === 3) {
            for(let i = 0; i <= stage; i++) {
                paintItem(items[i]);
            }
        }
    }

    render() {
        const { stage, items, stages } = this.state;
        const stageInfo = stages[stage];

        this.renderStage();

        return(
            <div className="orderStage">
                <div className="orderStageProgress">
                    <Progress.Line strokeColor="var(--green)" percent={stageInfo.progress} showInfo={false} />
                </div>

                <div className="orderStageItems">
                    <div ref={items[0]} className="orderStageItem">
                        <img src="/icons/confirmed.svg" />
                        <p>Confirmado</p>
                    </div>

                    <div ref={items[1]} className="orderStageItem">
                        <img src="/icons/cooking.svg" />
                        <p>Preparando</p>
                    </div>

                    <div ref={items[2]} className="orderStageItem">
                        <img src="/icons/delivering.svg" />
                        <p>En camino</p>
                    </div>

                    <div ref={items[3]} className="orderStageItem">
                        <img src="/icons/delivered.svg"/>
                        <p>Entregado</p>
                    </div>
                </div>

                {
                    !this.props.hideMessage &&
                        <div id="order-stage-message">
                            <p>{stageInfo.message}</p>
                        </div>
                }
                    
                

                <style jsx>{`
                    .orderStage {
                        position: relative;
                    }
					
                    .orderStageProgress {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        margin: .8rem auto;
                        width: 90%;
                    }
					
                    .orderStageItems {
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr 1fr;
                        grid-gap: .4rem;
                        margin: 0 auto;
                    }
					
                    .orderStageItem {
                        text-align: center;
                        
                        z-index: 1;
                    }
					
                    .orderStageItem img {
                        width: 3.6rem;
                        background: #e5e5ea;
                        border-radius: 50%;
                        padding: .4rem;
                        margin-bottom: .2rem;
                    }
        
                    #order-stage-message {
                        margin-top: 1rem;
                        background: white;
                        border-top: 1px solid rgba(0, 0, 0, .6);
                        border-right: 1px solid rgba(0, 0, 0, .6);
                        border-bottom: 1px solid rgba(0, 0, 0, .6);
                        padding: .4rem;
                        color: initial;
                        width: 80%;
                        border-radius: 0 .4rem .4rem 0;
                    }
                `}</style>
            </div>
        )
    }
}