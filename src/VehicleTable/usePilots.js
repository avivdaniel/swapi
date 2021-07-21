import React, {useState, useCallback, useEffect} from 'react';
import {getResource} from "./service";

const usePilots = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);

    const mapAndPick = (pilots) => {
        return pilots.map(({name, homeworld}) => ({name, homeworld}))
    }

    const setPilots = async (pilots) => {
        const pilotsList = Object.keys(pilots).map(async (key) => await getResource(key))
        const data = mapAndPick(await Promise.all(pilotsList));
        setData(data);
    }

    const getPilots = useCallback(async (vehicles) => {
        const cache = {};

        Object.keys(vehicles).forEach(key => {
            return vehicles[key]?.pilots.forEach(pilot => {
                if (!cache?.pilot) {
                    return cache[pilot] = pilot;
                }
            })
        });

        await setPilots(cache)
    }, []);

    return [{data}, getPilots];
};

export default usePilots;