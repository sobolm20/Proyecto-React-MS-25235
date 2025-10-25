import { Children } from "react";
import { Navigate } from "react-router-dom";

export default function RutaProtegida({Children}) 
{
    const auth=localStorage.getItem('auth')==='true';
    return auth ? Children: <Navigate to="/login"/>


}