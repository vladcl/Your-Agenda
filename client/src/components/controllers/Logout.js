import { useNavigate } from "react-router-dom";
import Axios from "axios";


function logout() {

    const Logout = () => {
        const navigate = useNavigate();
        Axios.get('http://localhost:3001/logout').then(() => {
            localStorage.clear()
            navigate('/');
        })
    }
}

export default logout