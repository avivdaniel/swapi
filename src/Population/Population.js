import React, {useEffect, useState, useMemo} from 'react';
import BarChart from "../components/BarChart/BarChart";
import {getResource} from "../VehicleTable/service";
import {api} from "../api";

const Population = () => {
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


    const getQueryUrl = (query) => {
        return `${api}/planets?search=${query}`;
    }

    useEffect(() => {
        (async function getRequestedPlanets(names) {
            const queriesPromises = names.map(async name => await getResource(getQueryUrl(name)));
            let results = await Promise.all(queriesPromises);
            setPlanets(results);
        })(['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor']);
    },[]);

    return <BarChart data={chartData} normalize={0.00000008}/>
};

export default Population;