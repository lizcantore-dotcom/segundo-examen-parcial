import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { mascotasSchema } from "../../schemas/mascotas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"
import { useApiMascotas } from "../../services/mascotas.service"
import { useApiRefugios } from "../../services/refugios.service"

export default function NuevaMascota() {
    const navigate = useNavigate()
    const [refugios, setRefugios] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(mascotasSchema),
        defaultValues: {
            status: "disponible"
        }
    })

    const { createMascotas } = useApiMascotas()
    const { getRefugios } = useApiRefugios()

    useEffect(() => {
        getRefugios()
            .then(data => setRefugios(data))
            .catch(err => console.log(err))
    }, [])

    const onSubmit = (datos) => {
        createMascotas(datos)
            .then(data => navigate("/mascotas/" + data._id))
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h2>Nueva mascota</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="shelter_id">Refugio asignado</label>
                    <select className="form-control" {...register("shelter_id")} id="shelter_id">
                        <option value="">Selecciona un refugio...</option>
                        {refugios.map((r) => (
                            <option key={r._id} value={r._id}>{r.name}</option>
                        ))}
                    </select>
                    {errors.shelter_id && <div className="text-danger">{errors.shelter_id.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Nombre</label>
                    <input className="form-control" type="text" {...register("name")} id="name" />
                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Descripción</label>
                    <input className="form-control" type="text" {...register("description")} id="description" />
                    {errors.description && <div className="text-danger">{errors.description.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="section">Sección / Especie</label>
                    <input className="form-control" type="text" {...register("section")} id="section" />
                    {errors.section && <div className="text-danger">{errors.section.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="size">Tamaño</label>
                    <select className="form-control" {...register("size")} id="size">
                        <option value="">Selecciona un tamaño...</option>
                        <option value="chico">Chico</option>
                        <option value="mediano">Mediano</option>
                        <option value="grande">Grande</option>
                    </select>
                    {errors.size && <div className="text-danger">{errors.size.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="status">Estado</label>
                    <select className="form-control" {...register("status")} id="status">
                        <option value="disponible">Disponible</option>
                        <option value="adoptado">Adoptado</option>
                    </select>
                    {errors.status && <div className="text-danger">{errors.status.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="link">Link</label>
                    <input className="form-control" type="text" {...register("link")} id="link" />
                    {errors.link && <div className="text-danger">{errors.link.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="img">Imagen (URL)</label>
                    <input className="form-control" type="text" {...register("img")} id="img" />
                    {errors.img && <div className="text-danger">{errors.img.message}</div>}
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">Guardar</button>
                    <Link to="/mascotas" className="btn btn-outline-secondary">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}