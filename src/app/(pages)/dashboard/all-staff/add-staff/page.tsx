"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AddStaff() {
  const { toast } = useToast();
  const personIdparam = sessionStorage.getItem("userId");
  const formSchema = z.object({
    email: z.string().email(),
    firstName: z.string().min(1, "Please update your first name"),
    lastName: z.string().min(1, "Please update your last name"),
    role: z.string().min(1, "Role Required"),
    username: z.string().min(1, "Please update your username"),
    dateOfBirth: z.string().min(1, "Please update your date of birth"),
    address: z.string().min(1, "Please update your address"),
    cv: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "Please update your first name",
      lastName: "Please update your last name",
      username: "Please_update_your_username",
      dateOfBirth: "1990-01-01",
      address: "Please update your address",
      cv: "No need for CV",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Validate the form values
      const validatedValues = formSchema.parse(values);
      const url = "http://localhost:3000/proxy/api/v1/persons";

      // Add additional fields

      const api_req_SelectItems = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedValues),
      };

      const response = await fetch(url, api_req_SelectItems);

      if (response.ok) {
        toast({
          title: "Staff was created successfully",
        });
      } else {
        const json = await response.json();
        toast({
          variant: "destructive",
          title: json.message,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "There was an error creating this staff",
      });
    }
  }

  return (
    <div>
      <h1>Create new staff</h1>
      <main>
        <div className="flex flex-col items-center justify-center p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-20 p-20 pt-0"
            >
              <div className="grid w-full max-w-sm items-center gap-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Email</FormLabel>
                      <FormControl>
                        <Input
                          className="text-input"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400">Role: </FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger className="text-gray-400">
                            {field.value ? `${field.value} ` : "Choose Role "}
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Role:</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup
                              value={field.value}
                              onValueChange={(value) => field.onChange(value)}
                            >
                              <DropdownMenuRadioItem value="Teacher">
                                Teacher
                              </DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="Admin">
                                Admin
                              </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full my">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
}
