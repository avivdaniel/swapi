import React, {useCallback, useState} from 'react';
import {getResource} from "../VehicleTable/service";
import {api} from "../api";

const useVehicle = (source) => {
    const [loading, setLoading] = useState(false);

    const getHighestVehicle = (vehiclesTree) => {
            let populationSum;
            let result = [];
            Object.keys(vehiclesTree).forEach(key => {
                const {pilots} = vehiclesTree[key];
                const sum = pilots.reduce((sum, current) => sum + current.homeworld.population, 0)
                if (!populationSum) populationSum = sum;
                if (sum > populationSum) {
                    populationSum = sum
                    result.push(vehiclesTree[key])
                }
            })
            return result[result.length - 1];
        };

    const setVehiclesPilots = (vehicles, pilotsWithHomeWorlds) => {
        const vehiclesTree = {};
        for (let key in vehicles) {
            let {pilots} = vehicles[key];
            let pilotsData = pilots.map(url => pilotsWithHomeWorlds[url])
            vehiclesTree[key] = {...vehicles[key], pilots: pilotsData}
        }
        return vehiclesTree;
    }

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
        const url = `${api}/${source}`;
        const cache = {};

        await getPaginatedData(url);

        async function getPaginatedData(url) {
            if (url === null) return;
            setLoading(true);
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
                setLoading(false);
                console.error(err);
            }
        };

        const filteredVehicles = filterVehiclesWithPilots(cache);
        return filteredVehicles;

    }, [source]);

    return {
        loading,
        getVehicles,
        setVehiclesPilots,
        getHighestVehicle
    };
};

export default useVehicle;