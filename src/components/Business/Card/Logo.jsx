import React from "react";

export default function Logo({ photo }) {
    return (
        <div className="businessLogo">
            <style jsx>{`
                .businessLogo {
                    background-image: url(${photo ? photo : ""});
                    background-color: rgba(0, 0, 0, .15);
                    background-size: cover;
                    background-position: center;
                    width: 80px;
                    height: 80px;
                    border-radius: .4rem;
                }
            `}</style>
        </div>
    )
}