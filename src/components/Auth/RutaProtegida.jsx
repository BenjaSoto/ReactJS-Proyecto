import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const RutaProtegida = ({ children, rolesPermitidos }) => {
    const { user, loading } = useAuth();

    if (loading) return <p>Cargando...</p>;

    if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default RutaProtegida;
