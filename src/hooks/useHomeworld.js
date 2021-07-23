import React, {useState, useCallback} from 'react';
import {getResource} from "../VehicleTable/service";

const useHomeworld = () => {
    const [loading, setLoading] = useState(false);

    const pickPlanetData = (planet) => {
        const name =
            planet?.name
            && planet.name !== 'unknown'
                ? planet.name
                : null;
        const population =
            planet?.population
            && Number(planet.population)
                ? Number(planet.population)
                : 0;

        return !name ? null : {name, population}
    }

    const getHomeworlds = useCallback(async (pilots) => {
        setLoading(true);
        try {
            const planetsCache = {};
            for (let key in pilots) {
                const homeworld = pilots[key]?.homeworld;
                if (!planetsCache?.homeworld) {
                    const result = await getResource(homeworld);
                    if (pickPlanetData(result)) {
                        planetsCache[homeworld] = pickPlanetData(result);
                    }
                }
            }
            return planetsCache;
        } catch (error) {
            console.error(error)
        }
        setLoading(false);
    }, []);

    return {loading, getHomeworlds};
};

export default useHomeworld;