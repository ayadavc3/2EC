import React from 'react';

import type { CustomCellRendererProps } from 'ag-grid-react';

import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

const AvatarCell = (params: CustomCellRendererProps) => {
  return (
    <Avatar className="mt-1">
        <AvatarImage src={params.value} />
        <AvatarFallback>{params.data.first_name.charAt(0)}{params.data.last_name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export { AvatarCell };