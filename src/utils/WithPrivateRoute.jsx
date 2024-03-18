import {Navigate} from "react-router-dom";
import {createContext, useContext} from "react";

const AuthContext = createContext();
function useAuth() {
    return useContext(AuthContext);
}

const WithPrivateRoute = ({ children }) => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return children;
    }

    return <Navigate to="/login" />
};

export default WithPrivateRoute;