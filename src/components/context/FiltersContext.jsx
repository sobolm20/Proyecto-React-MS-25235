import { createContext, useState } from "react";

export const FiltersContext = createContext()


export const FiltersProvider = ({ children }) => {

  const [filters, setFilters] = useState({
    minRating: 0, 
    winery: "all"
  })

  const filterProducts = (products) => {
    return(
      products.filter ((product) => {
        return(
          product.rating >= filters.rating ||
            (
            filters.winery == "all" || 
            product.winery == filters.winery
            )
        )
      }
      )
    )
  }

  return(
    <FiltersContext.Provider value={{filters,filterProducts,setFilters}}>  
    {children}
    </FiltersContext.Provider>
  )
}