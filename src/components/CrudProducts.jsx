import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";

const API_URL = "https://69189e0321a963594870a83b.mockapi.io/products";

const CrudProducts = () => {
    const [productos, setProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        image: "",
        price: "",
        stock: "",
        winery: "",
    });

    const [editId, setEditId] = useState(null);

    const getProducts = () => {
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error("Error al obtener productos:", error));
    };

    // cierre
    const handleClose = () => {
        setShow(false);
        setForm({ 
            title: "", 
            description: "", 
            image: "", 
            price: "", 
            stock: "", 
            winery: "" 
        });
        setEditId(null);
    };

    // apertura
    const handleShow = (producto) => {
        setShow(true);
        if (producto) {
            setForm({ 
                ...producto,
                price: Number(producto.price), 
                stock: Number(producto.stock), 
            });
            setEditId(producto.id);
        }
    };

    // crear/actualizar
    const handleSubmit = (e) => {
        e.preventDefault();

        const productData = {
            ...form,
            price: Number(form.price), 
            stock: Number(form.stock), 
        };

        const method = editId ? "PUT" : "POST";
        const url = editId ? `${API_URL}/${editId}` : API_URL;

        fetch(url, {
            method: method, 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Error al guardar el producto");
                return res.json();
            })
            .then(() => {
                handleClose();
                getProducts();
            })
            .catch((error) => console.error("Error:", error));
    };

    // Eliminar
    const eliminarProducto = (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Error al eliminar el producto");
                getProducts();
            })
            .catch((error) => console.error("Error:", error));
    };

    // cargar los productos
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="container mt-4">
            <h2>CRUD de Productos</h2>
            <Button className="mb-3" onClick={() => handleShow()}>
                Agregar Producto
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Image</th>
                        <th>Winery</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id}>
                            <td>{prod.title}</td>
                            <td>{prod.description}</td>
                            <td>${Number(prod.price).toFixed(2)}</td>
                            <td>{prod.stock}</td>
                            <td>
                                {prod.image?.startsWith("http") ? (
                                    <img 
                                        src={prod.image}
                                        alt={prod.title}
                                        width={50}
                                        height={50}
                                        style={{ objectFit: "cover" }}
                                    />
                                ) : (
                                    <span>{prod.image}</span>
                                )}
                            </td>
                            <td>{prod.winery}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="warning"
                                    onClick={() => handleShow(prod)}
                                >
                                    Editar    
                                </Button>{" "}
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => eliminarProducto(prod.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                required
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                required
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                step="0.01"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                required
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                value={form.stock}
                                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                                required
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>URL de Imagen</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                            />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                            <Form.Label>Bodega</Form.Label>
                            <Form.Control
                                type="text"
                                value={form.winery}
                                onChange={(e) => setForm({ ...form, winery: e.target.value })}
                            />
                        </Form.Group>
                        
                        <Button variant="primary" type="submit">
                            {editId ? "Actualizar" : "Crear"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CrudProducts;