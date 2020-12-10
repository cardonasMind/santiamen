import React from "react";

import { Form, FormGroup, Input, RadioGroup, Radio, Button } from "rsuite";

import { PreviewAndGetImage } from "../../../../utils";

export default function RegisterForm({ name, category, photoURL, handleName, handleCategory, handlePhotoURL, handleRegister }) {
    return(
        <Form>
            <FormGroup>
                <h1>Configura tu negocio</h1>
            </FormGroup>

            <FormGroup>
                <h2>Nombre</h2>
                <Input style={{ color: "initial" }} size="sm" value={name} onChange={handleName} />
            </FormGroup>

            <FormGroup>
                <h2>Categoría</h2>
                <RadioGroup value={category} onChange={handleCategory}>
                    <Radio value="fast-food">Comida rápida</Radio>
                </RadioGroup>
            </FormGroup>

            <FormGroup>
                <h2>Logo</h2>
                <div id="logo-uploader">
                    <div id="logo-preview" />
                    <PreviewAndGetImage handleImage={handlePhotoURL} toWidth={80}>
                        <p style={{ color: "initial" }}>Seleccionar logo</p>
                    </PreviewAndGetImage>
                </div>
            </FormGroup>

            <FormGroup>
                <Button block appearance="primary" onClick={handleRegister}>Registrar mi negocio</Button>
            </FormGroup>
            
            <style jsx>{`
                h2 {
                    margin-bottom: .4rem;
                }

                #logo-uploader {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-gap: .6rem;
                    overflow-x: auto;
                    position: relative;
                }

                #logo-preview {
                    background-image: url(${photoURL ? photoURL : ""});
                    background-size: cover;
                    background-position: center;
                    width: 80px;
                    height: 80px;
                    border-radius: .6rem;
                    border: 1px solid rgb(0, 0, 0, .2);
                    background-color: rgba(255, 255, 255, .2);
                }
            `}</style>
        </Form>
    )
}