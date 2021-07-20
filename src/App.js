import React, {useCallback, useEffect, useState} from 'react';
import VehicleTable from "./VehicleTable/VhicleTable";
import BarChart from "./BarChart/BarChart";
import './App.css';


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
            <div className="container">
                <VehicleTable/>
                <BarChart data={data}/>
            </div>
        </div>
    );
}

export default App;
