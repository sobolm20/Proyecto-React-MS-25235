import { Button, Card, Col } from "react-bootstrap";

export default function ingredients (){

    return(
        <div>
            <Row>
                {productos.map((prod)=>(
                    <Col key={prod.id}>
                        <Card className="mb-4 shadow-sm">
                            <Card.Img variant="top" src="{prod.img}" />
                            <Card.Body>
                                <Card.Title>{prod.nombre}</Card.Title>
                                <Card.Text>{prod.precio}</Card.Text>
                                <Button variant="primary">Agregar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))
                }
            </Row>
        </div>

    )
}