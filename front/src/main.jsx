import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { createBrowserRouter, RouterProvider } from "react-router"
import Layout from './components/Layout.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { SessionProvider } from './context/Session.Context.jsx';

const Home = lazy(() => import('./pages/Home.jsx'))
const Contact = lazy(() => import('./pages/Contacto.jsx'))

// Carpeta crud
const Pets = lazy(() => import('./pages/crud/Pets.jsx'))
const PetDetail = lazy(() => import('./pages/crud/PetDetail.jsx'))
const NuevaMascota = lazy(() => import('./pages/crud/NuevaMascota.jsx'))
const EditarMascota = lazy(() => import('./pages/crud/EditarMascota.jsx'))
const EliminarMascota = lazy(() => import('./pages/crud/EliminarMascota.jsx'))

const Shelters = lazy(() => import('./pages/crud/Shelters.jsx'))
const ShelterPets = lazy(() => import('./pages/crud/ShelterPets.jsx'))
const NuevoRefugio = lazy(() => import('./pages/crud/NuevoRefugio.jsx'))
const EditarRefugio = lazy(() => import('./pages/crud/EditarRefugio.jsx'))
const EliminarRefugio = lazy(() => import('./pages/crud/EliminarRefugio.jsx'))

// Carpeta auth
const Login = lazy(() => import('./pages/auth/Login.jsx'))
const Register = lazy(() => import('./pages/auth/Register.jsx'))
const Logout = lazy(() => import('./pages/auth/Logout.jsx'))
const Usuarios = lazy(() => import('./pages/usuarios.jsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<div>Cargando...</div>}><Home /></Suspense>,
      },
      {
        path: "/contact",
        element: <Suspense fallback={<div>Cargando...</div>}><Contact /></Suspense>,
      },
      {
        path: "/mascotas",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<Pets />} rol={["user", "admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/mascotas/:id",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<PetDetail />} rol={["user", "admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/nueva-mascota",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<NuevaMascota />} rol={["admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/editar-mascota/:id",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<EditarMascota />} rol={["admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/eliminar-mascota/:id",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<EliminarMascota />} rol={["superadmin"]} /></Suspense>
      },
      {
        path: "/refugios",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<Shelters />} rol={["user", "admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/refugios/:id",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<ShelterPets />} rol={["user", "admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/nuevo-refugio",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<NuevoRefugio />} rol={["admin", "superadmin"]} /></Suspense>
      },
      {
        path: "/editar-refugio/:id",
        element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<EditarRefugio />} rol={["admin", "superadmin"]} /></Suspense>
      },
      {
         path: "/eliminar-refugio/:id",
         element: <Suspense fallback={<div>Cargando...</div>}><ProtectedRoute element={<EliminarRefugio />} rol={["superadmin"]} /></Suspense>
      },
      {
        path: "/login",
        element: <Suspense fallback={<div>Cargando...</div>}><Login /></Suspense>
      },
      {
        path: "/salir",
        element: <Suspense fallback={<div>Cargando...</div>} ><Logout /></Suspense>
      },
      {
        path: "/register",
        element: <Suspense fallback={<div>Cargando...</div>}><Register /></Suspense>
      },
      {
        path: "/usuarios",
        element: <Suspense fallback={<div>Cargando...</div>} >
          <ProtectedRoute element={<Usuarios />} rol={["superadmin"]} />
        </Suspense>
      },
    ]
  },
  {
    path: "*",
    element: <div className="container py-5 text-center"><h2>404 - Página no encontrada</h2></div>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>,
)