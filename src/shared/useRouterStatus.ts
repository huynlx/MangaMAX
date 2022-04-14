import { useState, useEffect } from 'react';
import Router from 'next/router';

export default function useRouterStatus() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const start = () => {
            setIsLoading(true);
        };
        const complete = () => {
            setIsLoading(false);
            setIsError(false);
        };
        // const error = (error: any) => {
        //     console.log('error');
        //     setIsLoading(false);
        //     setIsError(true);
        //     setError(error);
        // };

        Router.events.on('routeChangeStart', start);
        Router.events.on('routeChangeComplete', complete);
        // Router.events.on('routeChangeError', error);

        return () => {
            Router.events.off('routeChangeStart', start);
            Router.events.off('routeChangeComplete', complete);
            // Router.events.off('routeChangeError', error);
        };
    }, []);

    return { isLoading, isError, error };
}