import React, {useCallback, useEffect, useState} from 'react';
import {swapiApi} from './client';
import './App.css';
import axios from "axios";

function App() {
    const [vehicles, setVehicles] = useState(null);
    const [pilots, setPilots] = useState(null);
    const [planets, setPlanets] = useState(null);
    let cache = {};

    // let [cache, setCache] = useState({});
    //
    // const updateCache = (key, value) => {
    //     let newCache = {...cache}
    //     newCache[key] = value;
    //     setCache(newCache);
    // }
    //
    // function normalizeUrl(url) {
    //     return url.replace('https://swapi.dev/api', "");
    // }

    // async function getResources(items) {
    //     try {
    //         //loop over pilots
    //         const results = await Promise.all(items.map(async (item) => {
    //             if (!cache.hasOwnProperty(item)) {
    //                 const {data: fetchedDataFromUrl} = await axios.get(item);
    //                 return cache[item] = fetchedDataFromUrl;
    //             }
    //         }))
    //         console.log(cache);
    //         return results;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async function getResource(url) {
        try {
            const {data} = await axios.get(url);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    function fetchVehicles() {
        console.log('Step 1 fetch Vhicles')
        let url = `https://swapi.dev/api/vehicles/`;
        let cacheVehicles = {};

        (async () => {
            await get(url);
            const onlyVehiclesWithPilots =  filterOnlyVehiclesWithPilots(cacheVehicles);
            setVehicles(onlyVehiclesWithPilots);
        })();

        async function get(url) {
            if (url === null) ;
            try {
                const data = await getResource(url);
                data.results.forEach(result => {
                    if (!cacheVehicles.hasOwnProperty(result.url)) {
                        cacheVehicles[result.url] = result
                    }
                });
                if (data?.next) {
                    await get(data.next)
                }
            } catch (error) {
                console.error(error)
            }

        }

        // console.log({cacheVehicles})
    }

    // const getPlanetForPilot = async (pilot) => {
    //     let {data: {name, diameter: diameterNumber}} = await swapiApi.get(normalizeUrl(pilot.homeworld));
    //     return {name, diameter: Number(diameterNumber) || 0}
    // }


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


    const getPilotsForVehicles = useCallback(async (vehicles) => {
        for (let key in vehicles) {
            // let pilots = await getResources(vehicles[key]["pilots"]);
            // const pilotsWithPlanets = await Promise.all(pilots.map(async (pilot) => {
            //     return {
            //         name: pilot.name,
            //         homeworld: await getPlanetForPilot(pilot)
            //     }
            // }))
            // vehicles[key]["pilots"] = pilotsWithPlanets
        }

        return vehicles;

    }, []);


    // const calcHeighest = (vehicles) => {
    //     let diameterSum;
    //     let result = [];
    //     for (let key in vehicles) {
    //         const sumPilotDiameter = vehicles[key]["pilots"].reduce((sum, key) => {
    //                 return sum + key.homeworld.diameter;
    //             }, 0
    //         )
    //         if (!diameterSum) {
    //             diameterSum = sumPilotDiameter;
    //         }
    //         if (sumPilotDiameter > diameterSum) {
    //             diameterSum = sumPilotDiameter;
    //             result.push(vehicles[key]);
    //         }
    //     }
    //     return result;
    // }

    const fetchPlanets = () => {
        console.log('Step 3 fetch Planets');
    }
    const fetchPilots = async () => {
        console.log('Step 2 fetch pilots')
        const cachePilots = {};

        for (let key in vehicles) {
            await Promise.all(vehicles[key]["pilots"].map(async (url) => {
                if (!cachePilots.hasOwnProperty(url)) {
                    const result = await getResource(url);
                    cachePilots[url] = result
                }
            }))
            //
            // let pilots = await getResources(vehicles[key]["pilots"]);
            // const pilotsWithPlanets = await Promise.all(pilots.map(async (pilot) => {
            //     return {
            //         name: pilot.name,
            //         homeworld: await getPlanetForPilot(pilot)
            //     }
            // }))
            // vehicles[key]["pilots"] = pilotsWithPlanets
        }
        setPilots(cachePilots);
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(()=> {
        vehicles && fetchPilots();
    },[vehicles])

    useEffect(()=>{
        // console.log(pilots);
        pilots && fetchPlanets();
    },[pilots])



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
