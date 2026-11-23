import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import ItemRefugio from '../../components/ItemRefugio'
import ItemLoading from '../../components/ItemLoading'
import ItemError from '../../components/ItemError'
import { useApiRefugios } from '../../services/refugios.service'

export default function Shelters() {
    const [refugios, setRefugios] = useState([])
    const [estado, setEstado] = useState("LOADING")
    const { getRefugios } = useApiRefugios()

    useEffect(() => {
        setEstado("LOADING")
        getRefugios()
            .then((data) => {
                setRefugios(data)
                setEstado("READY")
            })
            .catch(() => setEstado("ERROR"))
    }, [])

    let contenido = ""
    switch (estado) {
        case "LOADING":
            contenido = <ItemLoading />
            break
        case "READY":
            contenido = refugios.length > 0
                ? refugios.map((refugio) => (
                    <ItemRefugio key={refugio._id} refugio={refugio} />
                ))
                : (
                    <tr>
                        <td colSpan="4" className="text-center text-muted py-3">
                            No hay refugios registrados.
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
            <h1>Lista de Refugios</h1>
            <Link to="/nuevo-refugio" className="btn btn-primary mt-3">
                Nuevo Refugio
            </Link>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
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