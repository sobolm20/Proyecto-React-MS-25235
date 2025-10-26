import { Container } from 'react-bootstrap';

export default function Home() {
    return (
        <div 
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=1920")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
                position: 'relative'
            }}
        >
            {/* Overlay oscuro para mejor legibilidad */}
            <div 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)'
                }}
            ></div>

            <Container 
                className="d-flex align-items-center justify-content-center"
                style={{
                    minHeight: '100vh',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                <div className="text-center text-white">
                    <h1 className="display-1 fw-bold mb-4">Bienvenidos</h1>
                    <p className="lead fs-3">Descubre nuestra selección de vinos</p>
                </div>
            </Container>
        </div>
    )
}