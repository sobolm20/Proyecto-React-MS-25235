import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { FiltersContext } from '../../context/FiltersContext.jsx';
import './Products.css'
import Card from '../card/Card.jsx';

  export default function Wines(){
    const [wines, setWines] = useState([]);
    const { filterProducts } = useContext(FiltersContext)

    const getProduct = async () => {
      const res = await fetch('https://api.sampleapis.com/wines/reds')
      const data = await res.json()
      setWines(data.wines)
    }
  
    useEffect(() => {
      getProduct()
    },[])

    const filteredProducts = filterProducts(wines)

    return (
      <ul>
        {filteredProducts.length != 0 ? filteredProducts.map((product) => {
          return (
            <Card key={wines.id} product={wines} />
          )
        }): <h2>NO HAY PRODUCTOS PARA EL FILTRO SELECCIONADO</h2> }
      </ul>
    )
  }