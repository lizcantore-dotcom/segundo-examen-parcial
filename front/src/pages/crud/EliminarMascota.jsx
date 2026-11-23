import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import ItemLoading from '../../components/ItemLoading'
import ItemError from '../../components/ItemError'
import { useApiMascotas } from '../../services/mascotas.service'

export default function EliminarMascota() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [estado, setEstado] = useState("LOADING")
    const [mascota, setMascota] = useState(null)
    const { getMascotasById, deleteMascotas } = useApiMascotas()

    useEffect(() => {
        getMascotasById(id)
            .then(data => {
                setMascota(data)
                setEstado("READY")
            })
            .catch(() => setEstado("ERROR"))
    }, [id])

    if (estado === "ERROR") return <ItemError mensaje="Mascota no encontrada" />
    if (estado === "LOADING") return <ItemLoading />

    const handleBorrar = (e) => {
        e.preventDefault()
        deleteMascotas(id)
            .then(() => navigate("/mascotas"))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-4'>
                    <img
                        style={{ maxWidth: "250px" }}
                        src={mascota?.photo || mascota?.image || "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"}
                        alt={mascota.name || mascota.title}
                    />
                </div>
                <div className='col-12 col-md-6 col-lg-8'>
                    <h2>¿Desea borrar {mascota.name || mascota.title}?</h2>
                    {mascota.species && <p>Especie / Sección: {mascota.species}</p>}
                    {mascota.size && <p>Tamaño: {mascota.size}</p>}
                    {mascota.status && <p>Estado: {mascota.status}</p>}
                    {mascota.description && <p>Descripción: {mascota.description}</p>}
                    <form onSubmit={handleBorrar}>
                        <button type='submit' className='btn btn-outline-danger'>Borrar</button>
                    </form>
                </div>
            </div>
            <Link to="/mascotas" className="btn btn-outline-primary mt-5">Volver</Link>
        </>
    )
}