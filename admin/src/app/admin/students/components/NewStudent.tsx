"use client";

import { useState } from "react";

import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { useCreateStudent } from "@/hooks/useStudents";
import { StudentCreateArgs } from "@/service/api/student/types";

type FormData = StudentCreateArgs & {
  confirm_phone_number: string;
};

export function NewStudent() {
  const [open, setOpen] = useState(false);
  const createStudentMutation = useCreateStudent();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      confirm_phone_number: "",
    },
  });

  const phoneNumber = watch("phone_number");

  const onSubmit = async (data: FormData) => {
    try {
      // Validate phone numbers match
      if (data.phone_number !== data.confirm_phone_number) {
        toast.error("Phone numbers do not match");
        return;
      }

      // Create student data without confirmation field
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { confirm_phone_number, ...studentData } = data;

      await createStudentMutation.mutateAsync(studentData);

      toast.success("Student created successfully!");
      reset();
      setOpen(false);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create student";
      toast.error(errorMessage);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="default">
          <PlusIcon /> New Student
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[600px] sm:w-[540px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SheetHeader>
            <SheetTitle>Create new Student</SheetTitle>
            <SheetDescription>
              Create a new student with the following details.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="first_name">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="first_name"
                {...register("first_name", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
                className={errors.first_name ? "border-red-500" : ""}
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">
                  {errors.first_name.message}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="middle_name">Middle Name</Label>
              <Input id="middle_name" {...register("middle_name")} />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="last_name">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="last_name"
                {...register("last_name", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
                className={errors.last_name ? "border-red-500" : ""}
              />
              {errors.last_name && (
                <p className="text-sm text-red-500">
                  {errors.last_name.message}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phone_number">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone_number"
                {...register("phone_number", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: "Invalid phone number format",
                  },
                })}
                className={errors.phone_number ? "border-red-500" : ""}
              />
              {errors.phone_number && (
                <p className="text-sm text-red-500">
                  {errors.phone_number.message}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="confirm_phone_number">
                Confirm Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="confirm_phone_number"
                {...register("confirm_phone_number", {
                  required: "Please confirm phone number",
                  validate: (value) =>
                    value === phoneNumber || "Phone numbers do not match",
                })}
                className={errors.confirm_phone_number ? "border-red-500" : ""}
              />
              {errors.confirm_phone_number && (
                <p className="text-sm text-red-500">
                  {errors.confirm_phone_number.message}
                </p>
              )}
            </div>
          </div>
          <SheetFooter>
            <Button
              type="submit"
              disabled={isSubmitting || createStudentMutation.isPending}
            >
              {isSubmitting || createStudentMutation.isPending
                ? "Creating..."
                : "Create Student"}
            </Button>
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
