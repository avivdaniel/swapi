import React, {useEffect, useState, useMemo} from 'react';
import {api} from "../api";
import {getResource} from "../VehicleTable/service";
import Graph from "../components/Graph/Graph";

const Population = ({loading, setLoading}) => {
    const [planets, setPlanets] = useState(null);

    const chartData = useMemo(()=> {
        if (planets) {
            const data = planets
                .filter(result => result?.count === 1)
                .map(({results}) => {
                    const [{name, population}] = results;
                    return {name, value: Number(population)}
                });
            return data;
        } else {
            return [];
        }
    }, [planets]);


    const getQueryUrl = (source, query) => {
        return `${api}/${source}?search=${query}`;
    }

    useEffect(() => {
        (async function getRequestedPlanets(names) {
            setLoading(true);
            try {
            const queriesPromises = names.map(async name => await getResource(getQueryUrl('planets',name)));
            let results = await Promise.all(queriesPromises);
            setPlanets(results);
            } catch (error) {
                console.error(error);
            }
        })(['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor']);
    },[setLoading]);

    return <Graph data={chartData}/>
};

export default Population;