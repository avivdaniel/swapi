import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

import './vehicleTable.scss';

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState(null);
    const [cachePlanet, setCachePlanet] = useState({});
    const [highestVehicle, setHighestVehicle] = useState(null);

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
        return onlyVehiclesWithPilots;

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

    const calcHighest = (vehicles) => {
        let diameterSum;
        let result = [];
        for (let key in vehicles) {
            let vehiclePilots = vehicles[key]["pilots"];
            let bla = vehiclePilots.map(pilot => {
                console.log(pilot)
            })
            // console.log(diameterSum)
            // if (!diameterSum) {
            //     diameterSum = sumPilotDiameter;
            // }
            // if (sumPilotDiameter > diameterSum) {
            //     diameterSum = sumPilotDiameter;
            //     result.push(vehicles[key]);
            // }
        }
        return result;
    }

    async function fetchPlanetsForPilot(pilot) {
        console.log('Step 3 fetch Planets')
        const cache = {...cachePlanet};
        const homeWorldUrl = pilot.homeworld;
        if (!cache.hasOwnProperty(homeWorldUrl)) {
            const planet = await getResource(homeWorldUrl);
            cache[homeWorldUrl] = {name: planet.name, diameter: Number(planet.diameter) || 0}
            pilot.homeworld = cache[homeWorldUrl]
        } else {
            pilot.homeworld = cache[homeWorldUrl]
        }

        setCachePlanet((prevCache => ({
                ...prevCache,
                ...cache
            }
        )));

        return pilot;
    }

    useEffect(() => {
        console.log({cachePlanet});
    }, [cachePlanet])

    async function fetchPilots(vehicles) {
        console.log('Step 2 fetch pilots')
        const cachePilots = {};
        for (let key in vehicles) {
            const pilots = await Promise.all(vehicles[key]["pilots"].map(async (url) => {
                if (!cachePilots.hasOwnProperty(url)) {
                    const pilot = await getResource(url);
                    const pilotWithPlanet = await fetchPlanetsForPilot(pilot)
                    // console.log('pilot with planet', pilotWithPlanet)
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
            vehicles[key]["pilots"] = pilots
        }

        return vehicles;
    }

    useEffect(() => {
        (async () => {
            const vehicles = await fetchVehicles();
            const vehiclesWithPilotsWithPlanets = await fetchPilots(vehicles);
            // const highestVehicle = calcHighest(vehiclesWithPilotsWithPlanets);
            setVehicles(vehiclesWithPilotsWithPlanets)
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
