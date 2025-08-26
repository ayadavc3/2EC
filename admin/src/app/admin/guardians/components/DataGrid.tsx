"use client";

import React, { useState } from "react";

import type { ColDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { AvatarCell } from "@/components/CellRenderer/AvatarCell";
import { GridDateFormatter } from "@/utils/formatter/grid-date";

import { ActionMenu } from "./ActionMenu";
import { StudentCell } from "./StudentCell";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

type Guardian = {
  uid: string;
  photo_url: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
};

export function DataGrid() {
  const [rowData] = useState<Guardian[]>([
    {
      uid: "GDU001",
      photo_url:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      first_name: "John",
      last_name: "Doe",
      middle_name: "Michael",
      phone_number: "+1-555-0123",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-01-15T10:30:00Z",
    },
    {
      uid: "GDU002",
      photo_url:
        "https://images.unsplash.com/photo-1494790108755-2616c6c2b8c0?w=150&h=150&fit=crop&crop=face",
      first_name: "Jane",
      last_name: "Smith",
      middle_name: "Elizabeth",
      phone_number: "+1-555-0456",
      created_at: "2024-01-16T14:20:00Z",
      updated_at: "2024-01-20T09:15:00Z",
    },
    {
      uid: "GDU003",
      photo_url:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      first_name: "Alex",
      last_name: "Johnson",
      middle_name: "Robert",
      phone_number: "+1-555-0789",
      created_at: "2024-01-18T16:45:00Z",
      updated_at: "2024-01-22T11:30:00Z",
    },
    {
      uid: "GDU004",
      photo_url:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      first_name: "Sarah",
      last_name: "Williams",
      middle_name: "Marie",
      phone_number: "+1-555-0321",
      created_at: "2024-01-20T08:15:00Z",
      updated_at: "2024-01-24T13:45:00Z",
    },
    {
      uid: "GDU005",
      photo_url:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      first_name: "David",
      last_name: "Brown",
      middle_name: "Christopher",
      phone_number: "+1-555-0654",
      created_at: "2024-01-22T12:00:00Z",
      updated_at: "2024-01-25T15:20:00Z",
    },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState<ColDef<Guardian>[]>([
    {
      field: "uid",
      headerName: "Guardian ID",
      width: 120,
      pinned: "left",
    },
    {
      field: "photo_url",
      headerName: "Photo",
      width: 60,
      minWidth: 100,
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
      colId: "students",
      headerName: "Students",
      width: 100,
      cellRenderer: StudentCell,
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

  return (
    <div style={{ height: "80vh", width: "100%" }}>
      <AgGridReact<Guardian>
        autoSizeStrategy={{
          type: "fitGridWidth",
          defaultMinWidth: 60,
        }}
        rowData={rowData}
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
