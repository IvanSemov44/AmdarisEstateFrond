import { useLocalStorage } from "../CustemHooks/UseLocalStorage";
import { AuthContext } from "./AuthContext"

export const AuthProvider = ({
    children
}) => {
    const [auth, setAuth] = useLocalStorage('auth', {});

    const userLogin = (authData) => {
        setAuth(authData)
    };

    const userLogout = () => {
        setAuth({});
    }
    return (
        <AuthContext.Provider value={{ user: auth, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}