"use client"

import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component

import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import type { ColDef } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Car = { make: string; model: string; price: number; electric: boolean };

export default function DataGrid() {
    const [rowData] = useState<Car[]>([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
    ]);

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs] = useState<ColDef<Car>[]>([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);

    return (
        <div style={{ height: "80vh", width: '100%' }}>
            <AgGridReact<Car>
                rowData={rowData}
                columnDefs={colDefs}
            />
        </div>
    )
}
