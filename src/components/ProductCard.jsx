import React from "react";  
import { useContext } from 'react'; //A
import { CartContext } from "../components/CartContext"; //A
import { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Products (){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const { agregarAlCarrito } = useContext(CartContext);

    useEffect(() => {
        fetch('https://69189e0321a963594870a83b.mockapi.io/products')
            .then((respuesta)=>respuesta.json())
            .then((datos)=>{
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) =>{
                setError('Error al cargar los productos');
                setCargando(false);
            });
    }, []);

    //A
    const handleAgregar = (producto) => {
        agregarAlCarrito(producto);
    };

     if (cargando) return <p>Cargando personajes...</p>;
     if (error) return <p>Error...</p>;

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">Carta de Vinos</h2>
            <Row>
                {productos.map((prod) => (
                <Col key={prod.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src={prod.image} style={{ height: '200px', objectFit: 'cover' }} />
                    <Card.Body className="d-flex flex-column">
                        <Card.Title className="fw-bold">{prod.wine}</Card.Title>
                        <Card.Text className="text-muted">Producto: {prod.title}</Card.Text>
                        <Button variant="primary" className="mt-auto" onClick={() => handleAgregar(prod)}>
                            Agregar
                        </Button>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
    )


}
