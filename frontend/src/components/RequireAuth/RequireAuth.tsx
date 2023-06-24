import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

interface AuthData {
    roles: string[];
    user: any; // Adjust the type of 'user' property if necessary
}

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const { auth }: { auth?: AuthData } = useAuth() || {}; // Provide empty object as fallback
    const location = useLocation();

    return (
        auth?.roles?.find((role: string) => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/dashboard/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;
