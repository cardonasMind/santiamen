import React from "react";

import { Nav } from "rsuite";

export default function SelectCategoryNav({ active, onSelect, ...props }) {
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect} >
        <Nav.Item eventKey="fast-food">🍔 Comida rápida</Nav.Item>
      </Nav>
    );
};