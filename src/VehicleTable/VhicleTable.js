import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";

import './vehicleTable.scss';

const VehicleTable = () => {
    const [vehicles, setVehicles] = useState(null);
    const [pilots, setPilots] = useState(null);
    const [planets, setPlanets] = useState(null);
    const [tree, setTree] = useState(null);

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
            const onlyVehiclesWithPilots = filterOnlyVehiclesWithPilots(cacheVehicles);
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

    async function fetchPlanets() {
        console.log('Step 3 fetch planets')
        const cachePlanets = {};
        for (let key in pilots) {
            if (!cachePlanets.hasOwnProperty(pilots[key]["homeworld"])) {
                const planet = await getResource(pilots[key]["homeworld"]);
                cachePlanets[pilots[key]["homeworld"]] = planet
            }
        }
        setPlanets(cachePlanets);
    }

    async function fetchPilots() {
        console.log('Step 2 fetch pilots')
        const cachePilots = {};

        for (let key in vehicles) {
            await Promise.all(vehicles[key]["pilots"].map(async (url) => {
                if (!cachePilots.hasOwnProperty(url)) {
                    const result = await getResource(url);
                    cachePilots[url] = result
                }
            }))
        }
        setPilots(cachePilots);
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        vehicles && fetchPilots();
    }, [vehicles]);

    useEffect(() => {
        pilots && fetchPlanets();
    }, [pilots]);

    useEffect(() => {
        if (planets) {
            console.log({planets})
            // console.log({pilots})
            // console.log({vehicles})
            // const tree = {...vehicles};
            // console.log({tree})
            // for (let key in tree) {
            //     tree[key]["pilots"] = tree[key]["pilots"].map((pilotUrl)=> {
            //         return pilots[pilotUrl]
            //     })
            // }
            // console.log(vehicles['https://swapi.dev/api/vehicles/14/'])
        }

    }, [planets]);

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
