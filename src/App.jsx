import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Contacto from "./pages/Contacto";
import Detalles from "./pages/Detalles";
import RutaProtegida from './components/RutaProtegida';
import Administracion from './pages/Administracion';

function App() {
  
  return(
    <BrowserRouter>
      <Header/>
      <Container>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/productos' element={<Productos/>}/>
          <Route path='/contacto' element={<Contacto/>}></Route>  
          <Route path='/detalles' element={<Detalles/>}></Route>  

          <Route path='/admin' element={
            <RutaProtegida>
              <Administracion/>
            </RutaProtegida>
            }/>
        </Routes>
      </Container>
      <Footer/>
    </BrowserRouter>
  );
}

export default App
