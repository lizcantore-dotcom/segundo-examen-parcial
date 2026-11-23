import React from 'react'
import { Link } from 'react-router'

export default function ItemRefugio({ refugio }) {
    return (
        <tr>
            <td>
                {refugio.photo && (
                    <img
                        src={refugio.photo}
                        alt={refugio.name}
                        style={{ width: "70px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
                    />
                )}
            </td>
            <td>{refugio.name}</td>
            <td>{refugio.description}</td>
            <td>
                <Link className="btn btn-primary btn-sm" to={`/refugios/${refugio._id}`}>Ver Mascotas</Link>
                <Link className='btn btn-outline-warning m-1' to={`/editar-refugio/${refugio._id}`}>Editar</Link>
                <Link className='btn btn-danger m-1' to={`/eliminar-refugio/${refugio._id}`}>Eliminar</Link>
            </td>
        </tr>
    )
}