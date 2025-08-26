"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NewGuardian() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
          <PlusIcon /> New Guardian
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Create new Guardian</SheetTitle>
          <SheetDescription>
            Create a new guardian with the following details.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">First Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Middle Name</Label>
            <Input id="sheet-demo-username" defaultValue="Al" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Last Name</Label>
            <Input id="sheet-demo-username" defaultValue="Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Phone Number</Label>
            <Input id="sheet-demo-username" defaultValue="1234567890" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">
              Confirmation Phone Number
            </Label>
            <Input id="sheet-demo-username" defaultValue="1234567890" />
          </div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
