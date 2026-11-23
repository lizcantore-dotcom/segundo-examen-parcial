import React from 'react'
import { Link } from 'react-router'

export default function ItemMascota({ mascota }) {
    return (
        <tr>
            <td>
                {mascota.img && (
                    <img
                        src={mascota.img}
                        alt={mascota.name}
                        style={{ width: "70px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                    />
                )}
            </td>
            <td>{mascota.name}</td>
            <td>{mascota.section}</td>
            <td>{mascota.size}</td>
            <td>{mascota.status}</td>
            <td>
                <Link className='btn btn-primary m-1' to={`/mascotas/${mascota._id}`}>Ver</Link>
                <Link className='btn btn-outline-warning m-1' to={`/editar-mascota/${mascota._id}`}>Editar</Link>
                <Link className='btn btn-danger m-1' to={`/eliminar-mascota/${mascota._id}`}>Eliminar</Link>
            </td>
        </tr>
    )
}