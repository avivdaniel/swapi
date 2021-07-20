import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

import './vehicleTable.scss';

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState(null);
    const [pilots, setPilots] = useState(null);
    const [cachePlanet, setCachePlanet] = useState(null);

    async function getResource(url) {
        try {
            const {data} = await axios.get(url);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchVehicles() {
        console.log('Step 1 fetch Vhicles')
        let url = `https://swapi.dev/api/vehicles/`;
        let cacheVehicles = {};

        await get(url);
        const onlyVehiclesWithPilots = filterOnlyVehiclesWithPilots(cacheVehicles);
        setVehicles(onlyVehiclesWithPilots);


        // (async () => {
        //     await get(url);
        //     const onlyVehiclesWithPilots = filterOnlyVehiclesWithPilots(cacheVehicles);
        //     setVehicles(onlyVehiclesWithPilots);
        // })();

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

    // async function fetchPlanets(newP) {
    //     console.log('Step 3 fetch planets')
    //     const cachePlanets = {};
    //     // let newP = {...pilots}
    //     for (let key in newP) {
    //         const homeWorldUrl = newP[key]["homeworld"];
    //         if (!cachePlanets.hasOwnProperty(homeWorldUrl)) {
    //             const planet = await getResource(homeWorldUrl);
    //             cachePlanets[homeWorldUrl] = {name: planet.name, diameter: planet.diameter}
    //             newP[key]["homeworld"] = cachePlanets[homeWorldUrl]
    //         } else {
    //             newP[key]["homeworld"] = cachePlanets[homeWorldUrl]
    //         }
    //     }
    //
    //     return newP;
    // }
    async function fetchPlanetsForPilot(pilot) {
        console.log('Step 3 fetch planets')
        const cache = {...cachePlanet};
        const homeWorldUrl = pilot.homeworld;
        if (!cache.hasOwnProperty(homeWorldUrl)) {
            const planet = await getResource(homeWorldUrl);
            cache[homeWorldUrl] = {name: planet.name, diameter: planet.diameter}
            pilot.homeworld = cache[homeWorldUrl]
        } else {
            pilot.homeworld = cache[homeWorldUrl]
        }

        setCachePlanet(cache);
        return pilot;
    }

    async function fetchPilots() {
        console.log('Step 2 fetch pilots')
        const cachePilots = {};

        const vehicleCopy = {...vehicles};

        for (let key in vehicleCopy) {
            const pilots = await Promise.all(vehicleCopy[key]["pilots"].map(async (url) => {
                if (!cachePilots.hasOwnProperty(url)) {
                    const pilot = await getResource(url);
                    const pilotWithPlanet = await fetchPlanetsForPilot(pilot)
                    const {name, homeworld} = pilotWithPlanet;
                    cachePilots[url] = pilot
                    return {
                        name,
                        homeworld
                    }
                } else {
                    return {
                        name: cachePilots[url].name,
                        homeWorld: cachePilots[url].homeWorld
                    }
                }
            }))
            console.log({pilots})
            vehicleCopy[key]["pilots"] = [pilots]
        }

        console.log({vehicleCopy});
        // const pilotsWithPlan = await fetchPlanets(pilots);


        // setPilots(cachePilots);
    }

    useEffect(() => {
        (async () => {
            await fetchVehicles();
            await fetchPilots();

        })();
    }, []);


    return (
        <table className="VehicleTable">
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
    );
}

export default VehicleTable;
