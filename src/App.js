import React from 'react';
import {Container, Grid} from "semantic-ui-react";

import VehicleTable from "./VehicleTable/VhicleTable";
import BarChart from "./BarChart/BarChart";

import 'semantic-ui-css/semantic.min.css'
import './App.scss';


function App() {

    const data = [
        {name: "Tatooine", value: 200000},
        {name: "Alderan", value: 200000000},
        {name: "Naboo", value: 450000000},
        {name: "Bespin", value: 6000000},
        {name: "Endor", value: 30000000},
    ]

    return (
        <div className="App">
            <Container>
                <Grid stackable columns={2} verticalAlign="center">
                    <Grid.Column className="left-col" verticalAlign="center">
                    <VehicleTable/>
                    </Grid.Column>
                    <Grid.Column>
                    <BarChart data={data}/>
                    </Grid.Column>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
