import React, {useState, useCallback, useEffect} from 'react';
import {getResource} from "../VehicleTable/service";
import useHomeworld from "./useHomeworld";

const usePilots = () => {
    const [data, setData] = useState(null);
    const [pilotsWithPlanets, setPilotsWithPlanets] = useState(null);
    const [loading, setLoading] = useState(null);
    const [{data: planetsData}, getHomeworlds] = useHomeworld();

    const pickData = (pilot) => {
        return {name: pilot?.name, homeworld: pilot?.homeworld}
    }

    const setPilotshomeworld = useCallback((planetsCache) => {
        const pilots = {};

        for (let key in data) {
            const homeworld = data[key].homeworld;

            pilots[key]=
                {...data[key],
                    homeworld:
                        planetsCache.hasOwnProperty(homeworld)
                            ? planetsCache[homeworld]
                            : "unknown"
                }
        }

        setPilotsWithPlanets(pilots);

    }, [planetsData, pilotsWithPlanets])


    const setPilots = async (pilotCache) => {

        for (let key in pilotCache) {
            const result = await getResource(key);
            pilotCache[key] = pickData(result);
        }

        setData(pilotCache);
    }

    const getPilots = useCallback(async (vehicles) => {
        const pilotCache = {};

        Object.keys(vehicles).forEach(key => {
            return vehicles[key]?.pilots.forEach(pilot => {
                if (!pilotCache?.pilot) {
                    return pilotCache[pilot] = pilot;
                }
            })
        });

        await setPilots(pilotCache)
    }, []);

    useEffect(()=> {
        data && getHomeworlds(data);
    },[data, getHomeworlds])

    useEffect(()=> {
        planetsData && setPilotshomeworld(planetsData);
    },[planetsData])

    return [{data, pilotsWithPlanets}, getPilots];
};

export default usePilots;