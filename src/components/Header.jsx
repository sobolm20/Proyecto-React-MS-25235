import React from "react";
import {Container,Nav,Button} from "react-bootstrap";
import {Link,useNavigate} from 'react-router-dom'
import Navigation from "./Nav"

const Header = () =>{

    const navigate= useNavigate();
    const isAuth=localStorage.getItem('auth')==='true';

    const cerrarSesion=()=>
    {
        localStorage.removeItem('auth');
        navigate('/login');
    }

    return(
        <header bg="outline-primary" text-white py-4 shadow-sm>
            <Container>
                <h1 className="mb-1">Tienda Online</h1>
                <p className="lead">Elija su mejor Vino</p>
            </Container>
            <Navigation/>
            <Nav>
                {isAuth && (
                <>
                <Nav.Link as={Link} to="/perfil/usuario123">Perfil</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
                </>
                )}  
            </Nav>
            <Nav>
                {!isAuth ? (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                ) : (
                <Button variant="outline-light" onClick={cerrarSesion}>Cerrar sesión</Button>
                )}  
            </Nav>
        </header>
    );
};

export default Header;