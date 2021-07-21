import React, {useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {getResource} from "./service";
import './vehicleTable.scss';
import useVehicle from "./useVehicle";

const VehicleTable = () => {
    const [{data: vehicles}, getVehicles] = useVehicle("vehicles");

    const getPilots = useCallback(
        async () => {
            console.log('Step 2 get pilots')
            let cacheVehicle = Object.assign({}, vehicles);
            let cachePilots = {};
            let cacheHomeWorlds = {}

            //Get only pilots needed
            for (let key in cacheVehicle) {
                let pilotsUrls = cacheVehicle[key]["pilots"];
                for (let url of pilotsUrls) {
                    if (!cachePilots.hasOwnProperty(url)) {
                        cachePilots[url] = url
                    }
                }
            }

            //Fetch pilots needed
            for (let key in cachePilots) {
                const result = await getResource(key);
                const {name, homeworld} = result

                //fetch planets needed
                if (!cacheHomeWorlds.hasOwnProperty(homeworld)) {
                    const result = await getResource(homeworld)
                    const {name, population} = result;
                    cacheHomeWorlds[homeworld] = {name, population: Number(population) ? Number(population) : 0}
                }
                cachePilots[key] = {name, homeworld: cacheHomeWorlds[homeworld]};
            }

            //Populate vehicles with the data
            for (let key in cacheVehicle) {
                let pilotsUrl = cacheVehicle[key]["pilots"];
                let pilotsData = pilotsUrl.map(url => cachePilots[url])
                cacheVehicle[key]["pilots"] = pilotsData
            }

            //Find the sum
            let populationSum;
            let result = [];

            for (let key in cacheVehicle) {
                let pilots = cacheVehicle[key]["pilots"];
                let sum = pilots.reduce((sum, current) => sum + current.homeworld.population, 0);
                if (!populationSum) {
                    populationSum = sum;
                }
                if (sum > populationSum) {
                    populationSum = sum;
                    result.push(vehicles[key]);
                }
            }

            console.log({result})

        }
        , [vehicles])

    useEffect(()=> {
        getVehicles();
    },[getVehicles]);

    useEffect(() => {
        (async () => {
            if (vehicles) await getPilots();
        })();
    }, [vehicles, getPilots])

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
