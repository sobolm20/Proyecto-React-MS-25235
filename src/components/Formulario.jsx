import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    celular: '',
    consulta: ''
  });

  const [charCount, setCharCount] = useState(0);
  const [validated, setValidated] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'consulta' && value.length <= 100) {
      setFormData({ ...formData, [name]: value });
      setCharCount(value.length);
    } else if (name !== 'consulta') {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    } else {
      console.log('Datos del formulario:', formData);
      setShowSuccess(true);
      
      // Resetear formulario
      setFormData({
        nombre: '',
        apellido: '',
        email: '',
        celular: '',
        consulta: ''
      });
      setCharCount(0);
      setValidated(false);
      
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <Container className="py-5">
      <div className="bg-light p-4 rounded shadow-sm">
        <h2 className="text-center mb-4">Formulario de Contacto</h2>
        
        {showSuccess && (
          <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            ¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.
          </Alert>
        )}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese su nombre.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese su apellido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="ejemplo@correo.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese un email válido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formCelular">
                <Form.Label>Celular</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="+54 9 11 1234-5678"
                  name="celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Por favor ingrese su número de celular.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formConsulta">
            <Form.Label>Consulta</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Escriba su consulta aquí (máximo 100 caracteres)"
              name="consulta"
              value={formData.consulta}
              onChange={handleChange}
              maxLength={100}
              required
            />
            <Form.Text className="text-muted">
              {charCount}/100 caracteres
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Por favor escriba su consulta.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" size="lg">
              Enviar Consulta
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
}