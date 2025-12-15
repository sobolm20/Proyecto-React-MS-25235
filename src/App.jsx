import { StrictMode } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "../src/pages/Contacto";
import Detalles from "../src/pages/Detalles";
import Carrito from "../src/components/Carrito";
import RutaProtegida from '../src/components/RutaProtegida';
import Administracion from '../src/pages/Administracion';
import { CartProvider } from '../src/components/CartContext';

function App() {
  
  return(
    <StrictMode>
      <CartProvider>
        <BrowserRouter>
          <Header/>
          <Container>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/productos' element={<Productos/>}/>
              <Route path='/contacto' element={<Contacto/>}/>
              <Route path='/detalles' element={<Detalles/>}/>
              <Route path="/carrito" element={<Carrito />} />
              <Route path='/admin' element={
                <RutaProtegida>
                  <Administracion/>
                </RutaProtegida>
              }/>
            </Routes>
          </Container>
          <Footer/>
        </BrowserRouter>
      </CartProvider>
    </StrictMode>
  );
}

export default App;
