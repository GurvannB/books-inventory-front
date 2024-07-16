import axios from 'axios';
import {useEffect} from "react";

interface IProps {
    children: React.JSX.Element;
    username: string,
    password: string
}

export default function WithAxios({ children, username, password }: IProps): React.JSX.Element {
    useEffect(() => {
        const responseInterceptor = axios.interceptors.response.use(
            response => {
                return response;
            },
            async (error) => {
                if (error.response?.status === 401) {
                    alert(401)
                } else {
                    alert(error)
                }
                return await Promise.reject(error.response);
            },
        );

        const requestInterceptor = axios.interceptors.request.use(async config => {
            config.headers['Content-Type'] = 'application/json;charset=UTF-8';
            config.headers['Authorization'] = `Basic ${btoa(`${username}:${password}`)}`;

            return config;
        });

        return () => {
            axios.interceptors.response.eject(responseInterceptor);
            axios.interceptors.request.eject(requestInterceptor);
        };
    }, []);

    return children;
}
