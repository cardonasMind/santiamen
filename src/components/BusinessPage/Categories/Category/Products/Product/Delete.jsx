import React from "react";

export default function DeleteProduct({ isBusinessOwner }) {
    if(isBusinessOwner) return <h1>ISBUSINESSOWNER</h1>
    else return null
}