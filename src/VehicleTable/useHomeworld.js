import React, {useState, useCallback} from 'react';
import {getResource} from "./service";

const useHomeworld = () => {
    const [data, setData] = useState(null);

    const pickPlanetData = (planet) => {
        const name =
            planet?.name && planet.name !== 'unknown'
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

        setData(planetsCache);

    }, []);

    return [{data}, getHomeworlds];
};

export default useHomeworld;