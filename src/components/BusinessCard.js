import React from "react";

import { Tag } from "rsuite";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const BusinessCard = ({ photo, name, active }) => {
    return(
        <div className="businessCard">
            {
                photo === undefined
                ?
                    <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .2)">
                        <Skeleton width="80px" height="80px" duration={3} />
                    </SkeletonTheme>
                :
                    <div className="businessLogo" />
            }

            
            <div className="businessInfo">
                {
                    name ? <h2>{name}</h2>
                    :
                        <h2><SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .2)">
                            <Skeleton height="1.4rem" duration={3} />
                        </SkeletonTheme></h2>
                }

                {
                    active === undefined 
                    ? 
                        <SkeletonTheme color="rgba(0, 0, 0, .1)" highlightColor="rgba(0, 0, 0, .2)">
                            <Skeleton width="60%" height="1.4rem" duration={3} />
                        </SkeletonTheme>
                    :
                        active ? <Tag color="green">Recibiendo pedidos</Tag> : <Tag color="red">Cerrado</Tag>
                }
            </div>


            <style jsx>{`
                .businessCard {
                    background: rgba(255, 255, 255, .4);
                    padding: 1rem;
                    border-radius: 1rem;
                    border: 1px solid rgba(0, 0, 0, .1);
                    margin: 1rem 0;

                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-gap: 1rem;
                }

                .businessCard .businessLogo {
                    background-image: url(${photo});
                    background-size: cover;
                    background-position: center;
                    width: 80px;
                    height: 80px;
                    border-radius: .6rem;
                    border: 1px solid rgb(0, 0, 0, .2);
                    background-color: rgba(0, 0, 0, .2);
                }

                .businessCard .businessInfo h2 {
                    margin-bottom: .6rem;
                }
            `}</style>
            
        </div>
    )
}

export default BusinessCard;