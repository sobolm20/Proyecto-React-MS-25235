import React, { createContext, useState } from "react";

// Crear el contexto
export const CartContext = createContext();

// Proveedor del Contexto
export const CartProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    // agregar producto al carrito
    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const existe = prevCarrito.find(item => item.id === producto.id);
            if (existe) {
                // si ya existe, sumar cantidad
                return prevCarrito.map(item =>
                    item.id === producto.id ? {...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1}];
        });
    };

    // eliminar un producto
    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
    };

    // vaciar el carrito 
    const vaciarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CartContext.Provider
            value={{
                carrito,
                setCarrito,
                agregarAlCarrito,
                eliminarDelCarrito,
                vaciarCarrito
            }}
        >
            {children}
        </CartContext.Provider>  
    );
};