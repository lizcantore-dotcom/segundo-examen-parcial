
import { useForm } from "react-hook-form"
import { refugiosSchema } from "../../schemas/refugios"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router"
import { useApiRefugios } from "../../services/refugios.service"

export default function NuevoRefugio() {
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: zodResolver(refugiosSchema)
    })

    const { createRefugios } = useApiRefugios()
    
         const onSubmit = (datos) => {
            createRefugios(datos)
                .then(data => navigate("/refugios/" + data._id))
                .catch(err => console.log(err))
        }

    return (
        <div>
            <h2>Nuevo refugio</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="name">Nombre</label>
                    <input className="form-control" type="text" {...register("name")} id="name" />
                    {errors.name && <div className="text-danger">{errors.name.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="photo">Foto (URL)</label>
                    <input className="form-control" type="text" {...register("photo")} id="photo" />
                    {errors.photo && <div className="text-danger">{errors.photo.message}</div>}
                </div>

                <div className="mb-3">
                    <label className="form-label" htmlFor="description">Descripción</label>
                    <input className="form-control" type="text" {...register("description")} id="description" />
                    {errors.description && <div className="text-danger">{errors.description.message}</div>}
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">Guardar</button>
                    <Link to="/refugios" className="btn btn-outline-secondary">Cancelar</Link>
                </div>
            </form>
        </div>
    )
}