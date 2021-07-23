import React, {useState} from 'react';
import {Container} from "semantic-ui-react";
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
            <AppLoader loading={isLoadingGraph || isLoadingTable}/>
            <Container>
                <VehicleTable loading={isLoadingTable} setLoading={setIsLoadingTable}/>
                <Population loading={isLoadingGraph} setLoading={setIsLoadingGraph}/>
            </Container>
        </div>
    );
}

export default App;
