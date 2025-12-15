import React, { useEffect, useState } from "react";
import { Table, Button, Form, Model } from "react-bootstrap";

const API_URL="https://69189e0321a963594870a83b.mockapi.io/products"

const CrudProducts = () => {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        title:"",
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

//cierre
    const handleClose = () => {
    setShow(false);
    setForm({ title:"", description: "", image: "", price: "", stock: "", winery: "",});
    setEditId(null);
    };

//apertura
    const handleShow = (producto) => {
        setShow(true);
        if (producto){
            setForm({ 
            ...producto,
            price: Number(producto.price), 
            stock: Number(producto.stock), 
            });
        setEditId(producto.id);
        }
    };

//crear
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

//Eliminar
    const eliminarProducto = (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

        fetch(`${API_URL}/${id}`, { method: "DELETE" })
            .then((res) => {
                if (!res.ok) throw new Error("Error al guardar el producto");
                getProducts();
            })
            .catch((error) => console.error("Error:", error));
    };

//cargar los productos
    useEffect(() => {
    getProducts();
    }, []);

return (
    <div className="container mt-4">
        <h2>CRUD de Productos</h2>
        <button className="mb-3" onClick={() => handleShow()}>
            Agregar Producto
        </button>

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Image</th>
                    <th>Winery</th>
                </tr>
            </thead>
            <tbody>
                {productos.map((prod) => (
                    <tr key={prod.id}>
                        <td>{prod.title}</td>
                        <td>{prod.description}</td>
                        <td>${Number(prod.price).toFixed(2)}</td>
                        <td>{prod.stock}</td>
                        <td>{prod.image?.startWith("http") ? (
                            <img 
                                src={prod.image}
                                alt={prod.title}
                                width={50}
                                height={50}
                                style={{ objectFit: "cover" }}
                                />
                        ) : (
                            <span>{prod.image}</span>
                        )}</td>
                        <td>{prod.Winery}</td>
                        <td>
                            <Button
                            size="sm"
                            variant="warning"
                            onClick={() => handleShow(prod)}
                            >
                                Editar    
                            </Button>{" "}
                            <button
                            size="sm"
                            variant="danger"
                            onClick={() => eliminarProducto(prod.id)}
                            >
                                Eliminar
                            </button>
                        </td>
                    </tr>
                )
                )

                }
            </tbody>

        </Table>

    </div>
)
};