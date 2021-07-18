import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import VehicleTable from "./VehicleTable/VhicleTable";
import BarChart from "./BarChart/BarChart";


function App() {
    return (
        <div className="App">
            <div className="container">
            <VehicleTable/>
            <BarChart/>
            </div>
        </div>
    );
}

export default App;
