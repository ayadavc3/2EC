"use client";

import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";
import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component

import { AvatarCell } from "@/components/CellRenderer/AvatarCell";
import { api, StudentResponse } from "@/service/api";
import { GridDateFormatter } from "@/utils/formatter/grid-date";

import { ActionMenu } from "./ActionMenu";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

export function DataGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["students"],
    queryFn: () => api.student.getAll(),
  });

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef<StudentResponse>[]>([
    {
      field: "id",
      headerName: "Student ID",
      width: 120,
      pinned: "left",
    },
    {
      field: "photo_url",
      headerName: "Photo",
      width: 60,
      filter: false,
      sortable: false,
      cellRenderer: AvatarCell,
    },
    {
      colId: "display_name",
      headerName: "Display Name",
      width: 140,
      valueGetter: (params) => {
        return `${params?.data?.first_name} ${params?.data?.last_name}`;
      },
    },
    {
      field: "phone_number",
      headerName: "Phone Number",
      width: 160,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 180,
      valueFormatter: GridDateFormatter,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 180,
      valueFormatter: GridDateFormatter,
    },
    {
      colId: "actions",
      headerName: "",
      width: 60,
      pinned: "right",
      filter: false,
      sortable: false,
      resizable: false,
      cellRenderer: ActionMenu,
    },
  ]);

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
      />
    </div>
  );
}
