import axios from "axios";
import {useSearchParams} from "react-router-dom";

type Props = {
    children: React.JSX.Element
}

export default function WithAxios({ children }: Props): React.JSX.Element {
    const [params] = useSearchParams();
    const username = params.get('username');
    const password = params.get('password');
    if (!username || !password) {
        alert('No credentials')
    }

    axios.interceptors.response.use(
        response => {
            return response;
        },
        async (error) => {
            alert(error.response?.data[0]?.message ?? 'Une erreur est survenue');
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