import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    let auth = { 'token': localStorage.getItem('token') }

    return (
        null,
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes;