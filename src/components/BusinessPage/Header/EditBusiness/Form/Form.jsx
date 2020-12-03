import React from "react";

import { Form, FormGroup, Toggle, Input, Button } from "rsuite";

import { PreviewAndGetImage } from "../../../../../utils";

export default function EditBusinessForm({ active, name, photoURL, backgroundURL, handleActive, handleName, handlePhotoURL, handleBackgroundURL, updateBusiness, toggleShowEditBusinessDrawer }) {
    return (
        <Form>
            <FormGroup>
                <h2>Estado del negocio</h2>
                <Toggle 
                    checkedChildren="Recibiendo pedidos" unCheckedChildren="Cerrado"
                    checked={active} onChange={handleActive}
                />
            </FormGroup>

            <FormGroup>
                <h2>Nombre</h2>
                <Input size="sm" value={name} onChange={handleName} />
            </FormGroup>

            <FormGroup>
                <h2>Logo</h2>
                <div id="logo-uploader">
                    <div id="logo-preview" />
                    <PreviewAndGetImage handleImage={handlePhotoURL} toWidth={80}>
                        <p>Seleccionar logo</p>
                    </PreviewAndGetImage>
                </div>
            </FormGroup>

            <FormGroup>
                <h2>Imágen de fondo</h2>
                <div id="background-uploader">
                    <div id="background-preview" />
                    <PreviewAndGetImage handleImage={handleBackgroundURL} toWidth={600}>
                        <p>Seleccionar imágen de fondo</p>
                    </PreviewAndGetImage>
                </div>
            </FormGroup>

            <FormGroup>
                <div id="business-buttons">
                    <Button appearance="primary" onClick={updateBusiness}>Guardar</Button>
                    <Button appearance="subtle" onClick={toggleShowEditBusinessDrawer} >Cancelar</Button>
                </div>
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
                    background-color: rgba(0, 0, 0, .2);
                }

                #background-uploader {
                    display: grid;
                    grid-gap: .6rem;
                    overflow-x: auto;
                    position: relative;
                }

                #background-preview {
                    width: 100%;
                    height: 140px;
                    border: 1px solid rgb(0, 0, 0, .2);
                    background-color: rgba(0, 0, 0, .2);
                    background-image: url(${backgroundURL ? backgroundURL : ""});
                    background-size: cover;
                    background-position: center;
                }

                #business-buttons {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-gap: .6rem;
                }
            `}</style>
        </Form>
    )
}