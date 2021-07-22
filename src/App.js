import React, {useState} from 'react';
import {Container, Grid} from "semantic-ui-react";
import VehicleTable from "./VehicleTable/VhicleTable";
import Population from "./Population/Population";
import AppLoader from "./components/AppLoader/AppLoader";

import 'semantic-ui-css/semantic.min.css'
import './App.scss';


function App() {
    const [isLoadingTable, setIsLoadingTable] = useState(true);
    const [isLoadingGraph, setIsLoadingGraph] = useState(true);

    return (
            <div className="App">
                <AppLoader/>
                <Container>
                    <Grid stackable columns={2}>
                        <Grid.Column className="left-col">
                            <VehicleTable loading={isLoadingTable} setLoading={setIsLoadingTable}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Population loading={isLoadingGraph} setLoading={setIsLoadingGraph}/>
                        </Grid.Column>
                    </Grid>
                </Container>
            </div>
    );
}

export default App;
