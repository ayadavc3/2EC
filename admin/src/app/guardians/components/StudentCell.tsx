import React from "react";

import { CustomCellRendererProps } from "ag-grid-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function StudentCell(params: CustomCellRendererProps) {
  return (
    <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 pt-1">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@ayadavc3" />
        <AvatarFallback>AY</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
        <AvatarFallback>LR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>
    </div>
  );
}
