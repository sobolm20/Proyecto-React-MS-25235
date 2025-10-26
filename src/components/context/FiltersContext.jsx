import { createContext, useState } from "react";

export const FiltersContext = createContext()


export const FiltersProvider = ({ children }) => {

  const [filters, setFilters] = useState({
    minRating: 0, 
    winery: "all"
  })

  const filterProducts = (wines) => {
    return(
      wines.filter ((wine => {
        return(
          wine.rating >= filters.rating ||
            (
            filters.winery == "all" || 
            wine.winery == filters.winery
            )
        )
      }
      )
    ))
  }

  return(
    <FiltersContext.Provider value={{filters,filterProducts,setFilters}}>  
    {children}
    </FiltersContext.Provider>
  )
}