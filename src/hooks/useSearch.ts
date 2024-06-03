import { useState, useEffect } from 'react';
import Fuse, { FuseResult } from 'fuse.js';
import { fuseOptions } from '../lib/fuseOptions';

const useSearch = (query: string) => {
    const [results, setResults] = useState<FuseResult<any>[]>([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('api/movies');
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (query && data.length > 0) {
            const options = { keys: ['title','director'] }
            const myIndex = Fuse.createIndex(options.keys, data)
            const fuse = new Fuse(data, fuseOptions,myIndex);
            const result = fuse.search(query);
            setResults(result);
        } else {
            setResults([]);
        }
    }, [query, data]);

    return { results, loading };
};

export default useSearch;
