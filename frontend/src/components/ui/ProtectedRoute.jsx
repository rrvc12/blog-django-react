import api from '@/api'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router'
import Spinner from './Spinner'

const ProtectedRoute = ({ children }) => {


    const [isAuthorized, setIsAuthorized] = useState(null)

    const location = useLocation()

    useEffect(function () {
        // lanzamos la ejecución de authorize siempre que se renderiza el componente 
        authorize().catch(() => setIsAuthorized(false))
    }, [])

    async function refreshToken() {
        const refresh = localStorage.getItem("refresh")
        try {
            const response = await api.post("token/refresh/", { refresh })

            if (response.status === 200) {
                localStorage.setItem("access", response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (err) {
            setIsAuthorized(false)
            console.log(err)
        }
    }

    async function authorize() {
        // obtiene el token de acceso y valida si se encuentra autorizado,
        // si el token se encuentra expirado intenta el refresh
        const token = localStorage.getItem("access")
        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000 // Obtenemos el tiempo actual en segundos
        if (decodedToken.exp < currentTime) {
            // Token expirado e itentamos hacer el refresk
            await refreshToken()
        } else {
            // Token valido
            setIsAuthorized(true)
        }

    }

    if (isAuthorized === null) {
        return <Spinner />
    }


    return (
        <>{
            // si no está autorizado, redirige el usuario al login
            isAuthorized ? children : <Navigate to="/login" state={{ from: location }} replace />
        }</>
    )
}

export default ProtectedRoute