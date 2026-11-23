import React from 'react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import ItemLoading from '../../components/ItemLoading'
import ItemError from '../../components/ItemError'
import { useApiMascotas } from '../../services/mascotas.service'

export default function PetDetail() {
    const { id } = useParams()
    const [estado, setEstado] = useState("LOADING")
    const [mascota, setMascota] = useState(null)
    const { getMascotasById } = useApiMascotas()

    useEffect(() => {
         getMascotasById(id)
            .then(data => {
                setMascota(data)
                setEstado("READY")
            })
            .catch(err => setEstado("ERROR"))
    }, [])

    if (estado === "LOADING") return <ItemLoading />
    if (estado === "ERROR") return <ItemError />

    return (
        <>
            <div className='row'>
                <div className='col-12 col-md-6 col-lg-4'>
                    <img
                        style={{ maxWidth: "250px" }}
                        src={mascota?.img ? mascota.img : "https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png"}
                        alt={mascota.name}
                    />
                </div>
                <div className='col-12 col-md-6 col-lg-8'>
                    <h2>{mascota.name}</h2>
                    <p>Descripción: {mascota.description}</p>
                    <p>Sección: {mascota.section}</p>
                    <p>Tamaño: {mascota.size}</p>
                    <p>Estado: {mascota.status}</p>
                    {mascota.link && (
                        <p>
                            Link: <a href={mascota.link} target="_blank" rel="noreferrer">{mascota.link}</a>
                        </p>
                    )}
                </div>
            </div>
            <Link to="/mascotas" className="btn btn-outline-primary mt-5">Volver</Link>
        </>
    )
}