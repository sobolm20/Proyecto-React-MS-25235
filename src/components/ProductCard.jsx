import React from "react";  
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";


export default function products (){
    const [productos, setProductos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useEffect(null)

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
        <div>
            <h2>Carta de Vinos</h2>
            <Row>
                {productos.map((prod) => (
                <Col key={prod.id} md={3}>
                    <Card className="mb-4 shadow-sm">
                    <Card.Img variant="top" src={prod.image} />
                    <Card.Body>
                        <Card.Title>{prod.wine}</Card.Title>
                        <Card.Text>Bodega: {prod.winery}</Card.Text>
                        <Button variant="primary">Agregar</Button>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
            </Row>
        </div>
    )


}
