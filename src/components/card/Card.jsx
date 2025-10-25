import React from "react"
import './Card.css'


const Card = ({ products }) => {
    return (
        <li key={id}>
            <img src={image} alt={wine} />
            <h2>{wine}</h2>
            <p>{winery}</p>
        </li>
    )
}

export default Card