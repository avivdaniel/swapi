import React, {useState, useCallback, useEffect} from 'react';
import {getResource} from "../VehicleTable/service";

const usePilots = () => {
    const [loading, setLoading] = useState(false);

    const pickData = (pilot) => {
        return {name: pilot?.name, homeworld: pilot?.homeworld}
    }

    const setPilotshomeworld = (pilots, planets) => {
        const pilotsWithHomeworlds = {};
        for (let key in pilots) {
            const homeworld = pilots[key].homeworld;
            pilotsWithHomeworlds[key] =
                {
                    ...pilots[key],
                    homeworld:
                        planets.hasOwnProperty(homeworld)
                            ? planets[homeworld]
                            : "unknown"
                }
        }
       return pilotsWithHomeworlds;
    }

    const setPilots = async (pilotCache) => {
        try {
            for (let key in pilotCache) {
                const result = await getResource(key);
                pilotCache[key] = pickData(result);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    const getPilots = useCallback(async (vehicles) => {
        setLoading(true);
        try {
            const pilotCache = {};
            Object.keys(vehicles).forEach(key => {
                return vehicles[key]?.pilots.forEach(pilot => {
                    if (!pilotCache?.pilot) {
                        return pilotCache[pilot] = pilot;
                    }
                })
            });
            await setPilots(pilotCache);
            return pilotCache;
        } catch (error) {
            console.error(error)
        }
        setLoading(false);
    }, []);

    return {getPilots, setPilotshomeworld, loading};
};

export default usePilots;