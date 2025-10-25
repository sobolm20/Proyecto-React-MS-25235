import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { FiltersContext } from '../../context/FiltersContext.jsx';
import './Products.css'
import Card from '../card/Card.jsx';

  export default function Products(){
    const [products, setProducts] = useState([]);
    const { filterProducts } = useContext(FiltersContext)

    const getProduct = async () => {
      const res = await fetch('https://api.sampleapis.com/wines/reds')
      const data = await res.json()
      setProducts(data.products)
    }
  
    useEffect(() => {
      getProduct()
    },[])

    const filteredProducts = filterProducts(products)

    return (
      <ul>
        {filteredProducts.length != 0 ? filteredProducts.map((product) => {
          return (
            <Card key={product.id} product={product} />
          )
        }): <h2>NO HAY PRODUCTOS PARA EL FILTRO SELECCIONADO</h2> }
      </ul>
    )
  }

    