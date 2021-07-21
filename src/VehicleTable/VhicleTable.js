import React, {useEffect, useMemo} from 'react';
import useVehicle from "./useVehicle";
import usePilots from "./usePilots";

import {Table, Icon} from 'semantic-ui-react'

import './vehicleTable.scss';

const VehicleTable = () => {
    const [
        {data: vehicles, highestVehicle},
        getVehicles,
        setVehiclesPilots,
        getHighestVehicle
    ] = useVehicle("vehicles");

    const [
        {pilotsWithPlanets},
        getPilots
    ] = usePilots();

    useEffect(() => {
        getVehicles();
    }, [getVehicles]);

    useEffect(() => {
        vehicles && getPilots(vehicles);
    }, [vehicles, getPilots])

    useEffect(() => {
        pilotsWithPlanets && setVehiclesPilots(pilotsWithPlanets);
    }, [pilotsWithPlanets, setVehiclesPilots])

    const vehicleData = useMemo(() => {
        if (highestVehicle) {
            const {name, pilots} = highestVehicle;
            let planets = [];
            highestVehicle.pilots.map(({homeworld}) => {
                planets.push(homeworld)
            })
            return {name, pilots, planets}
        }
    }, [highestVehicle])

    return (
        <>
            {highestVehicle && vehicleData
                ? <Table celled striped className="VehicleTable">

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                Vehicle Details
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                Vehicle name with the largest population sum
                            </Table.Cell>
                            <Table.Cell>
                                <Icon name="star" color="yellow"/>
                                {vehicleData.name}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Related home planets and their respective population
                            </Table.Cell>
                            <Table.Cell>
                                {vehicleData.planets.map((planet, i) => {
                                    return <p key={i} className="planets">
                                        <Icon name="star" color="yellow"/>
                                            <span className="title">Name:</span>
                                            {planet.name}
                                            <span className="title">Population:</span>
                                            {planet.population}
                                    </p>
                                })}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Related pilot names
                            </Table.Cell>
                            <Table.Cell>
                                {vehicleData.pilots.map((pilot, i) => {
                                    return <p key={i}>
                                        <Icon name="star" color="yellow"/>
                                        {pilot.name}</p>
                                })}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                : <div>... loading</div>
            }
        </>
    );
}

export default VehicleTable;
