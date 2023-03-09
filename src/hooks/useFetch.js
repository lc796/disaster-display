import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw Error("Error fetching data...");
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
            })
    }, [url])

    return { data, error };
}

export default useFetch;