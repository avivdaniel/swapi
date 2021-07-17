import React, {useCallback, useEffect} from 'react';
import {swapiApi} from './client';
import './App.css';

function App() {

    let cache = {};

    // let [cache, setCache] = useState({});
    //
    // const updateCache = (key, value) => {
    //     let newCache = {...cache}
    //     newCache[key] = value;
    //     setCache(newCache);
    // }

    function normalizeUrl(url) {
        return url.replace('https://swapi.dev/api', "");
    }

    async function getResources(items) {
        try {
            console.log({items})
            const results = await Promise.all(items.map(async (item) => {
                const {data: fetchedDataFromUrl} = await swapiApi(normalizeUrl(item));
                return fetchedDataFromUrl;
            }))
            return results;
        } catch (error) {
            console.error(error);
        }
    }

    async function getResource(resourceUrl) {
        try {
            const {data: fetchedDataFromUrl} = await swapiApi.get(resourceUrl);
            return fetchedDataFromUrl;
        } catch (error) {
            console.log(error);
        }
    }

    function cacheResource(name) {
        let url = `/${name}`

        return get(url);

        async function get(name) {
            if (url === null) return cache;
            try {
                const {next, results} = await getResource(name);
                results.forEach(result => {
                    const resultUrl = normalizeUrl(result.url);
                    if (!cache.hasOwnProperty(resultUrl)) {
                        return cache[normalizeUrl(result.url)] = result;
                    }
                });
                return next ? await get(normalizeUrl(next)) : cache;
            } catch (error) {
                console.error(error)
            }

        }
    }

    function filterOnlyVehiclesWithPilots(vehicles) {
        let result = {};

        Object.keys(vehicles).forEach(key => {
                if (vehicles[key].hasOwnProperty("pilots") && vehicles[key]["pilots"].length > 0) {
                    result[key] = {name: vehicles[key]["name"], pilots: vehicles[key]["pilots"]}
                }
            }
        )

        return result;
    }


    const getPlanetForPilot = async (pilot) => {
        let {data: {name, diameter: diameterNumber}} = await swapiApi.get(normalizeUrl(pilot.homeworld));
        return {name, diameter: Number(diameterNumber) || 0}
    }


    const getPilotsForVehicles = useCallback(async (vehicles) => {
        for (let key in vehicles) {
            let pilots = await getResources(vehicles[key]["pilots"]);
            const pilotsWithPlanets = await Promise.all(pilots.map(async (pilot) => {
                return {
                    name: pilot.name,
                    homeworld: await getPlanetForPilot(pilot)
                }
            }))
            vehicles[key]["pilots"] = pilotsWithPlanets
        }

        return vehicles;

    }, []);


    const getVehicles = useCallback(async () => {
        const vehicles = await cacheResource("vehicles");
        const filteredVehicles = filterOnlyVehiclesWithPilots(vehicles);
        return filteredVehicles;
    }, []);

    const calcHeighest = (vehicles) => {
        let diameterSum;
        let result = [];
        for (let key in vehicles) {
            const sumPilotDiameter = vehicles[key]["pilots"].reduce((sum, key) => {
                    return sum + key.homeworld.diameter;
                }, 0
            )
            if (!diameterSum) {
                diameterSum = sumPilotDiameter;
            }
            if (sumPilotDiameter > diameterSum) {
                diameterSum = sumPilotDiameter;
                result.push(vehicles[key]);
            }
        }
        return result;
    }

    useEffect(() => {
        (async () => {
            //1
            const vehicles = await getVehicles();
            console.log({vehicles})
            const vehiclesWithPilotsWithPlanets = await getPilotsForVehicles(vehicles);
            // const height = calcHeighest(vehiclesWithPilotsWithPlanets);

        })();
    }, [getVehicles, getPilotsForVehicles]);

    return (
        <div className="App">
            <div className="container">
                <table id="vehicle-table">
                    <tbody>
                    <tr>
                        <td>Vehicle name with the largest population sum</td>
                        <td>vehicle name comes HERE</td>
                    </tr>
                    <tr>
                        <td>Related home planets and their respective population</td>
                        <td>{`[{name}, {number}]`}</td>
                    </tr>
                    <tr>
                        <td>Related pilot names</td>
                        <td>{`[name]`}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
