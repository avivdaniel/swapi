import React, {useCallback, useEffect, useState} from 'react';
import {swapiApi} from './client';
import './App.css';
import axios from "axios";

function App() {
    const [vehicles, setVehicles] = useState({});
    const [pilots, setPilots] = useState({});
    const [planets, setPlanets] = useState({});
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
        let url = `https://swapi.dev/api/vehicles/`;
        let cacheVehicles = {};

        (async ()=> {
        await get(url);
        setVehicles(cacheVehicles);
        })();

        async function get(url) {
            if (url === null);
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

    const fetchPilots = async () => {
        for (let key in vehicles) {
            // console.log(vehicles[key])
            //
            // vehicles[key]["pilots"].map((url) => {
            //     if (!pilots.hasOwnProperty(url)) {
            //         const result = getResource(url);
            //         setPilots(prevPilots => {
            //             return {
            //                 ...prevPilots,
            //                 [result.url]: result
            //             }
            //         })
            //     }
            // })

            // let pilots = await getResources(vehicles[key]["pilots"]);
            // const pilotsWithPlanets = await Promise.all(pilots.map(async (pilot) => {
            //     return {
            //         name: pilot.name,
            //         homeworld: await getPlanetForPilot(pilot)
            //     }
            // }))
            // vehicles[key]["pilots"] = pilotsWithPlanets
        }
    }

    useEffect(() => {
        (async()=> {
             await fetchVehicles();
        })();
    }, []);

    useEffect(() => {
        console.log(vehicles)
    },[vehicles])


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
