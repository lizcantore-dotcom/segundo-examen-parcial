import { Link } from 'react-router'
import { toast } from 'react-toastify'

export default function Contact() {
    const handleSubmit = (event) => {
        event.preventDefault()
        toast.success('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.')
        event.target.reset()
    }

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="card shadow-sm border-0 p-4 p-md-5">
                        <h2 className="fw-bold mb-3 text-center">Contáctanos</h2>
                        <p className="text-muted text-center mb-4">
                            ¿Tienes dudas sobre el proceso de adopción o representas a un refugio? Escríbenos y te responderemos a la brevedad.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label fw-semibold">
                                    Nombre y Apellido
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    placeholder="Ej: María López"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">
                                    Correo Electrónico
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="nombre@correo.com"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="motivo" className="form-label fw-semibold">
                                    Motivo del contacto
                                </label>
                                <select className="form-select" id="motivo" defaultValue="" required>
                                    <option value="" disabled>
                                        Selecciona una opción...
                                    </option>
                                    <option value="adopcion">Quiero consultar por una adopción</option>
                                    <option value="refugio">Soy un refugio y quiero registrarme</option>
                                    <option value="transito">Quiero ofrecer hogar de tránsito</option>
                                    <option value="otro">Otro motivo</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="mensaje" className="form-label fw-semibold">
                                    Mensaje
                                </label>
                                <textarea
                                    className="form-control"
                                    id="mensaje"
                                    rows="4"
                                    placeholder="Escribe tu consulta aquí..."
                                    required
                                ></textarea>
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    Enviar Mensaje
                                </button>
                                <Link to="/mascotas" className="btn btn-outline-secondary">
                                    Volver al catálogo
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}