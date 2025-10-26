import React from "react";  
import { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from "react-bootstrap";


export default function Products (){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://api.sampleapis.com/wines/reds')
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
                        <Card.Text className="text-muted">Bodega: {prod.winery}</Card.Text>
                        <Button variant="primary" className="mt-auto">Agregar</Button>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
    )


}
