import { CustomCellRendererProps } from "ag-grid-react";
import {
  EllipsisIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { useDeleteStudent } from "@/hooks/useStudents";

export function ActionMenu(params: CustomCellRendererProps) {
  const { id } = params.data;
  const { mutate: deleteStudent } = useDeleteStudent();

  const handleDelete = async () => {
    try {
      await deleteStudent(id);
      toast.success("Student deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete student");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisIcon width={16} height={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Details
            <DropdownMenuShortcut>
              <ExternalLinkIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Update
            <DropdownMenuShortcut>
              <PencilIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Manage guardians
            <DropdownMenuShortcut>
              <UsersIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" onClick={handleDelete}>
            Delete
            <DropdownMenuShortcut>
              <TrashIcon />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
