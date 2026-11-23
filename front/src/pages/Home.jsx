import { Link } from 'react-router'

export default function Home() {
    return (
        <>
            <header className="py-5 bg-white border-bottom shadow-sm">
                <div className="container text-center py-4">
                    <h1 className="display-4 fw-bold text-dark mb-3">
                        Encuentra a tu nuevo compañero
                    </h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '650px' }}>
                        Conectamos animales rescatados con familias responsables. Explora nuestras mascotas disponibles o conoce a los refugios que hacen posible su rescate.
                    </p>
                    <div className="d-flex justify-content-center gap-3 mt-4 flex-wrap">
                        <Link to="/mascotas" className="btn btn-primary btn-lg px-4 shadow-sm">
                            Ver Mascotas en Adopción
                        </Link>
                        <Link to="/refugios" className="btn btn-outline-secondary btn-lg px-4">
                            Conocer Refugios
                        </Link>
                    </div>
                </div>
            </header>

            <section className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card border-0 shadow-sm overflow-hidden">
                            <div className="card-header bg-dark text-white text-center fw-bold py-2">
                                Datos de la Entrega - Parcial 2
                            </div>
                            <div className="card-body p-4">
                                <div className="row align-items-center">
                                    <div className="perfil col-sm-4 text-center mb-3 mb-sm-0 mx-auto">
                                        <img
                                            src="/img/foto_perfil.jpeg"
                                            alt="Liz Jhoana Cantore Paiva"
                                            className="rounded-circle img-thumbnail shadow-sm"
                                        />
                                    </div>

                                    <div className="col-sm-8">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between px-0">
                                                <span className="text-muted">Alumna:</span>
                                                <strong>Liz Jhoana Cantore Paiva</strong>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between px-0">
                                                <span className="text-muted">Materia:</span>
                                                <span>Aplicaciones Híbridas</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between px-0">
                                                <span className="text-muted">Comisión:</span>
                                                <span>DWM4AV (Turno mañana)</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between px-0">
                                                <span className="text-muted">Año Lectivo:</span>
                                                <span>2026</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}