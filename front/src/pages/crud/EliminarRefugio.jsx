import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import ItemLoading from '../../components/ItemLoading'
import ItemError from '../../components/ItemError'
import { useApiRefugios } from '../../services/refugios.service'

export default function EliminarRefugio() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [estado, setEstado] = useState("LOADING")
    const [refugio, setRefugio] = useState(null)
    const { getRefugiosById, deleteRefugios } = useApiRefugios()

    useEffect(() => {
        getRefugiosById(id)
            .then(data => {
                setRefugio(data)
                setEstado("READY")
            })
            .catch(() => setEstado("ERROR"))
    }, [id])

    if (estado === "ERROR") return <ItemError mensaje="Refugio no encontrado" />
    if (estado === "LOADING") return <ItemLoading />

    const handleBorrar = (e) => {
        e.preventDefault()
        deleteRefugios(id)
            .then(() => navigate("/refugios"))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-4'>
                    <img
                        style={{ maxWidth: "250px" }}
                        src={refugio?.photo || "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"}
                        alt={refugio.name}
                    />
                </div>
                <div className='col-12 col-md-6 col-lg-8'>
                    <h2>¿Desea borrar {refugio.name}?</h2>
                    {refugio.description && <p>Descripción: {refugio.description}</p>}
                    {refugio.address && <p>Dirección: {refugio.address}</p>}
                    {refugio.phone && <p>Teléfono: {refugio.phone}</p>}
                    <form onSubmit={handleBorrar}>
                        <button type='submit' className='btn btn-outline-danger'>Borrar</button>
                    </form>
                </div>
            </div>
            <Link to="/refugios" className="btn btn-outline-primary mt-5">Volver</Link>
        </>
    )
}