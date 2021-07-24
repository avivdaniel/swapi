import React, {useEffect, useMemo, useState} from 'react';
import useVehicle from "../hooks/useVehicle";
import usePilots from "../hooks/usePilots";
import usePlanets from "../hooks/usePlanets"
import {Table, Icon} from 'semantic-ui-react'

import './vehicleTable.scss';

const VehicleTable = ({loading, setLoading}) => {
    const {
        getVehicles,
        setVehiclesPilots,
        getHighestVehicle
    } = useVehicle("vehicles");

    const {getPilots, setPilotsHomeworld} = usePilots();
    const {getPlanets} = usePlanets();

    const [highestVehicle, setHighestVehicle] = useState(null);

    const vehicleData = useMemo(() => {
        if (highestVehicle) {
            const {name, pilots} = highestVehicle;
            let planets = [];
            highestVehicle.pilots.map(({homeworld}) => {
                planets.push(homeworld)
            })
            return {name, pilots, planets}
        }
    }, [highestVehicle]);

    useEffect(() => {
        (async () => {
                setLoading(true);
            try {
                const vehicles = await getVehicles();
                const pilots = await getPilots(vehicles);
                const planets = await getPlanets(pilots);
                const pilotsAndHomeworld = setPilotsHomeworld(pilots, planets);
                const tree = setVehiclesPilots(vehicles, pilotsAndHomeworld);
                const result = getHighestVehicle(tree);
                setHighestVehicle(result);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        })();
    }, []);

    return (
        <>
            {vehicleData &&
            <Table celled striped className="VehicleTable">
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
            }
        </>
    );
}

export default VehicleTable;
