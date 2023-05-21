import Offcanvas from 'react-bootstrap/Offcanvas';
import React from 'react';

export const OffCanvas = ({ showOffCanvas, handleClose }) => {
    return (
        <>
            <Offcanvas show={showOffCanvas} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Offcanvas</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default OffCanvas;