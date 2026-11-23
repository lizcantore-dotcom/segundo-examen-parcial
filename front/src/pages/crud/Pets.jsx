import React from 'react'

import { useEffect, useState } from 'react'
import ItemLoading from '../../components/ItemLoading'
import ItemError from '../../components/ItemError'
import ItemMascota from '../../components/ItemMascota'
import { Link } from 'react-router'
import { useApiMascotas } from '../../services/mascotas.service'

export default function Pets() {
  const [mascotas, setMascotas] = useState([])
  const [estado, setEstado] = useState("LOADING")

  const { getMascotas } = useApiMascotas()
  const fetchApi = async () => {
    setEstado("LOADING")
    try {
      const data = await getMascotas()
      setMascotas(data);
      setEstado("READY")
    } catch (error) {
      console.error(error);
      setEstado("ERROR")
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  let contenido = ""
  switch (estado) {
    case "LOADING":
      contenido = <ItemLoading />
      break;
    case "READY":
      contenido = mascotas.map((mascota) => <ItemMascota key={mascota._id} mascota={mascota} />)
      break;
    case "ERROR":
      contenido = <ItemError />
      break;
    default:
      contenido = <ItemError />
      break;
  }

  return (
    <div>
      <h1>Listado de mascotas</h1>
      <Link to="/nueva-mascota" className='btn btn-outline-primary mt-3'>Nueva Mascota</Link>
      <table className='table table-striped mt-3'>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Especie / Sección</th>
            <th>Tamaño</th>
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