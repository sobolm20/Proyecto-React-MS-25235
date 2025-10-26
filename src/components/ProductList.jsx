import React from 'react';
import { useState, useEffect, useContext } from 'react'
import { FiltersContext } from '../components/context/FiltersContext.jsx'
import '../components/products/Products.css'
import Card from '../components/card/Card.jsx';

export default function Wines(){
  const [wines, setWine] = useState([]);
  const { filterProducts } = useContext(FiltersContext)

  const getProduct = async () => {
    const res = await fetch('https://api.sampleapis.com/wines/reds')
    const data = await res.json()
    setWine(data)
  }

  useEffect(() => {
    getProduct()
  },[])

  const filteredProducts = filterProducts(wines)

  return (
    <ul>
      {filteredProducts.length != 0 ? filteredProducts.map((wine) => {
        return (
          <Card key={wine.id} product={wine} /> 
        )
      }): <h2>NO HAY PRODUCTOS PARA EL FILTRO SELECCIONADO</h2> }
    </ul>
  )
}