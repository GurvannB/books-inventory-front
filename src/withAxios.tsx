import axios from "axios";
import {useSearchParams} from "react-router-dom";
import toast from "react-hot-toast";

type Props = {
    children: React.JSX.Element
}

export default function WithAxios({ children }: Props): React.JSX.Element {
    const [params] = useSearchParams();
    const username = params.get('username');
    const password = params.get('password');
    if (!username || !password) {
        toast.error('Vous devez entrer des informations de connexion');
    }

    axios.interceptors.response.use(
        response => {
            return response;
        },
        async (error) => {
            if (error.response.status === 401) {
                toast.error("Aucun accès à la ressource, vous n'êtes pas connecté.e");
            } else if (error.response.status === 400) {
                toast.error("La requête est incomplète");
            } else {
                toast.error(error.response.data[0].message);
            }
            return await Promise.reject(error.response);
        },
    );

    axios.interceptors.request.use(async config => {
        config.headers['Content-Type'] = 'application/json;charset=UTF-8';
        const token = btoa(`${username}:${password}`);
        config.headers['Authorization'] = `Basic ${token}`;

        return config;
    });

    return children;
}