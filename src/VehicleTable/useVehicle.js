import React, {useCallback, useState, useMemo} from 'react';
import {getResource} from "./service";

const useVehicle = (source) => {
    const [data, setData] = useState(null);
    const [populatedVehicles, setPopulatedVehicles] = useState(null);
    const [loading, setLoading] = useState(false);


    const getHighestVehicle = () => {
        if (populatedVehicles) {
            let populationSum;
            let result = [];
            populatedVehicles && Object.keys(populatedVehicles).forEach(key => {
                const {pilots} = populatedVehicles[key];
                const sum = pilots.reduce((sum, current) => sum + current.homeworld.population, 0)
                if (!populationSum) populationSum = sum;
                if (sum > populationSum) {
                    populationSum = sum
                    result.push(populatedVehicles[key])
                }
            })
            return result[result.length - 1];
        }
    };

    const highestVehicle = useMemo(getHighestVehicle, [populatedVehicles]);

    const setVehiclesPilots = useCallback((pilotsCache) => {
        const vehicles = {};
        for (let key in data) {
            let {pilots} = data[key];
            let pilotsData = pilots.map(url => pilotsCache[url])
            vehicles[key] = {...data[key], pilots: pilotsData}
        }

        setPopulatedVehicles(vehicles);
    }, [data])

    const filterVehiclesWithPilots = (vehicles) => {
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

        const filteredVehicles = filterVehiclesWithPilots(cache);
        setData(filteredVehicles);

    }, [source]);

    return [
        {data, highestVehicle, loading},
        getVehicles,
        setVehiclesPilots,
        getHighestVehicle
    ];
};

export default useVehicle;