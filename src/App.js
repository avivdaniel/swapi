import React, {useEffect, useCallback} from 'react';
import {swapiApi} from './client';
import './App.css';

function App() {
    const cache = {}

    function normalizeUrl(url) {
        return url.replace('https://swapi.dev/api', "");
    }

    const getResource = async (resourceUrl) => {
        //5
        if (!cache.hasOwnProperty(resourceUrl)) {
            try {
                const {data: fetchedDataFromUrl} = await swapiApi.get(resourceUrl);
                cache[resourceUrl] = fetchedDataFromUrl;
            } catch (error) {
                console.log(error);
            }
        }
        return cache[resourceUrl];
    }

    const cacheResource = (name) => {
        let url = `/${name}`

        return get(url);

        async function get(name) {
            if (url === null) return cache;
            console.log('name', name)

            //4
            const {next , results} = await getResource(name);
            results.forEach(result => cache[normalizeUrl(result.url)] = result);
            console.log('cheche:', cache)
            return next ? await get(normalizeUrl(next)) : null;
        }
    }

    const getVehicles = useCallback(async () => {
        //2
        try {
            await cacheResource("vehicles");
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        (async () => {
            //1
            await getVehicles();

        })();
    }, [getVehicles]);

    return (
        <div className="App">
        </div>
    );
}

export default App;
