"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { AvatarCell } from "@/components/CellRenderer/AvatarCell";
import { useStudents } from "@/hooks/useStudents";
import { StudentResponse } from "@/service/api";
import { GridDateFormatter } from "@/utils/formatter/grid-date";

import { ActionMenu } from "./ActionMenu";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export function DataGrid() {
  const gridRef = useRef<AgGridReact<StudentResponse>>(null);
  const { data, isLoading, error } = useStudents();

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef<StudentResponse>[]>([
    {
      field: "id",
      headerName: "Student ID",
      flex: 1,
      minWidth: 120,
      pinned: "left",
    },
    {
      field: "photo_url",
      headerName: "Photo",
      width: 80,
      filter: false,
      sortable: false,
      cellRenderer: AvatarCell,
    },
    {
      colId: "display_name",
      headerName: "Display Name",
      flex: 2,
      minWidth: 140,
      valueGetter: (params) => {
        return `${params?.data?.first_name} ${params?.data?.last_name}`;
      },
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      flex: 1.5,
      minWidth: 160,
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 1.5,
      minWidth: 180,
      valueFormatter: GridDateFormatter,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      flex: 1.5,
      minWidth: 180,
      valueFormatter: GridDateFormatter,
    },
    {
      colId: "actions",
      headerName: "",
      width: 80,
      pinned: "right",
      filter: false,
      sortable: false,
      resizable: false,
      cellRenderer: ActionMenu,
    },
  ]);

  // Callback to handle grid ready event
  const onGridReady = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      // Size columns to fit the available width
      gridRef.current.api.sizeColumnsToFit();
    }
  }, []);

  // Callback to handle data changes
  const onRowDataUpdated = useCallback(() => {
    if (gridRef.current && gridRef.current.api) {
      // Reapply sizing to fit when data updates
      setTimeout(() => {
        gridRef.current?.api?.sizeColumnsToFit();
      }, 100);
    }
  }, []);

  // Effect to handle column sizing when data changes
  useEffect(() => {
    if (data && gridRef.current && gridRef.current.api) {
      // Small delay to ensure DOM is updated
      const timeoutId = setTimeout(() => {
        gridRef.current?.api?.sizeColumnsToFit();
      }, 150);

      return () => clearTimeout(timeoutId);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <AgGridReact<StudentResponse>
        ref={gridRef}
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 60,
        }}
        rowData={data ?? []}
        columnDefs={colDefs}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
        pagination={true}
        paginationPageSize={20}
        onGridReady={onGridReady}
        onRowDataUpdated={onRowDataUpdated}
        maintainColumnOrder={true}
        suppressColumnMoveAnimation={true}
      />
    </div>
  );
}
