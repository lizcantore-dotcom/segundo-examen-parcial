import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ItemLoading from '../../components/ItemLoading'
import ItemError from '../../components/ItemError'
import ItemMascota from '../../components/ItemMascota'
import { useApiRefugios } from '../../services/refugios.service'

export default function ShelterPets() {
    const { id } = useParams()
    const [mascotas, setMascotas] = useState([])
    const [estado, setEstado] = useState("LOADING")
    const { getMascotasByRefugio } = useApiRefugios()

    useEffect(() => {
        setEstado("LOADING")
        getMascotasByRefugio(id)
            .then((data) => {
                setMascotas(data)
                setEstado("READY")
            })
            .catch(() => setEstado("ERROR"))
    }, [id])

    let contenido = ""
    switch (estado) {
        case "LOADING":
            contenido = <ItemLoading />
            break
        case "READY":
            contenido = mascotas.length > 0
                ? mascotas.map((mascota) => (
                    <ItemMascota key={mascota._id} mascota={mascota} />
                ))
                : (
                    <tr>
                        <td colSpan="6" className="text-center text-muted py-3">
                            Este refugio aún no tiene mascotas registradas.
                        </td>
                    </tr>
                )
            break
        case "ERROR":
        default:
            contenido = <ItemError />
            break
    }

    return (
        <div>
            <h1>Mascotas del refugio</h1>
            <Link to="/refugios" className="btn btn-outline-primary mt-3">
                Volver a Refugios
            </Link>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Especie / Sección</th>
                        <th>Tamaño</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {contenido}
                </tbody>
            </table>
        </div>
    )
}