import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const getUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            setUser(data);
        } catch (error) {
            // Handle the error (e.g., the user is not authenticated)
            setUser(null);
        }
    }

    useEffect(() => {
        csrf(); // Ensure CSRF token is set
        getUser(); // Attempt to fetch the user data
    }, []);

    const login = async ({ email, password }) => {

        await csrf();

        try {
            const response = await axios.post('/login', {email, password});
            console.log(response.config.headers[2]);


            await getUser();
            navigate('/');

        } catch(e) {

            console.log(e);
            if(e.response.status === 422){
                setErrors(e.response.data.errors);
            }
            
        }
    } 

    const register = async ({ name, email, password, password_confirmation }) => {

        await csrf();

        try {
            await axios.post('/register', {name, email, password, password_confirmation});
            await getUser();
            navigate('/');

        } catch(e) {
            console.log(e);
            if(e.response.status === 422){
                setErrors(e.response.data.errors);
            }
        }
    } 

    const logout = () => {
        axios.post('/logout').then(() => {
            setUser(null);
        });
    }

    return <AuthContext.Provider value={{ user, errors, getUser, login, register, logout }}>
        { children }
    </AuthContext.Provider>

}

export default function useAuthContext(){
    return useContext(AuthContext);
}