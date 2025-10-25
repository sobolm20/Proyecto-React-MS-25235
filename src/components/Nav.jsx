import React from "react";
import { Link } from "react-router-dom";
import { Navbar,Nav,Container } from "react-bootstrap";

const Navigation = () =>{
    return(
        <Navbar bg="dark" data-bs-theme="dark" variant="dark" text-white py-4 expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">Marca de la empresa</Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/Productos">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/Contacto">Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/Detalles">Detalles</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;