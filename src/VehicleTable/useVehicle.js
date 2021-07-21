import React, {useCallback, useState, useEffect} from 'react';
import {getResource} from "./service";

const useVehicle = (source) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getVehiclesWithPilots = (vehicles) => {
        const result = {};
        Object.keys(vehicles).forEach(key => {
            if (vehicles[key]?.pilots.length) {
                const {name, pilots} = vehicles[key];
                result[key] = {
                    name,
                    pilots
                }
            }
        })
        return result;
    }

    const getVehicles = useCallback(async () => {
        console.log('Step 1 fetch Vhicles')
        const url = `https://swapi.dev/api/${source}`;
        const cache = {};

        await getPaginatedData(url);

        async function getPaginatedData(url) {
            if (url === null) return;
            try {
                const data = await getResource(url);
                data.results.forEach(result => {
                    const id = result?.url;
                    if (!cache?.id) {
                        cache[id] = result;
                    }
                });
                if (data?.next) await getPaginatedData(data.next);
            } catch (err) {
                console.error(err);
            }
        };

        const filteredVehicles = getVehiclesWithPilots(cache);
        setData(filteredVehicles);

    }, [source, setData, setLoading]);

    return [{data, loading}, getVehicles];
};

export default useVehicle;