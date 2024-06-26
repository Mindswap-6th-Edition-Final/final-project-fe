'use client';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
  } from "@/components/ui/table";
  import { cn } from "@/lib/utils";
  import { Button } from "@/components/ui/button";
  import Link from "next/link";
  import { getPersonByRole } from "@/app/lib/data";
  import React, { useState, useEffect } from "react";
  import { Person } from "@/app/lib/definitions";
  import { deletePersonById } from "@/app/lib/data";
  import { DocumentMinusIcon } from "@heroicons/react/24/outline";
  
  export default function AllStaff() {
    const [allStaff, setAllStaff] = useState<Person[]>([]);
  
    useEffect(() => {
      async function fetchStaff() {
        const teachers = await getPersonByRole("TEACHER");
        const admins = await getPersonByRole("ADMIN");
        setAllStaff([...teachers, ...admins]);
      }
  
      fetchStaff();
    }, []);

    const [personToDelete, setPersonToDelete] = useState<string | null>(null);

    function handleDelete(id: string) {
      setPersonToDelete(id);
      setPersonToDelete(id);
      const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
      if (modal) {
      modal.showModal();
  }
    }
  
    return (
      <div className="mx-2 my-2">
        <div>
          <h1 className="text-2xl mb-4">All Staff</h1>
        </div>
        <div className="mt-5 ml-4 w-[800px] flex space-x-12">
  <Link href="/dashboard/all-staff/add-staff">
   
      <Button
        className={cn("bg-primary text-white")}
        onClick={() => {
          console.log("clicked");
        }}
      >
        Add Staff
      </Button>
   
  </Link>
</div>
        <Table>
          <TableCaption>A list of all staff members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allStaff.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">
                  {staff.firstName} {staff.lastName}
                </TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
            <button onClick={() => handleDelete(staff.id)}>Delete</button>
          </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow></TableRow>
          </TableFooter>
        </Table>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to delete this person?</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => {
                if (personToDelete) {
                  deletePersonById(personToDelete);
                  setAllStaff(allStaff.filter(person => person.id !== personToDelete));
                  const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                  if (modal) {
                  modal.close();
                  
    }
                  setPersonToDelete(null);
                }
              }}>Confirm</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      </div>
    );
  }
  