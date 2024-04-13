"use client";
import { useEffect, useState } from "react";
import { deleteApplicationById, fetchApplicationById, fetchPersonDataById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { ComboboxPopover } from "@/app/ui/application/popoverStatus";
import { DialogDemo } from "@/app/ui/application/dialog-grade";
import { Application, Person } from "../../../../../../lib/definitions";



export default function ApplicationUpdate({
  params,
}: {
  params: { id: string };
}) {
  const [application, setApplication] = useState({} as Application);
  const [student, setStudent] = useState({} as Person);
  const [grade, setGrade] = useState(0);


  useEffect(() => {
    const appId = params.id.replace("#", "%23");
    fetchApplicationById(appId).then((app) => {
      setApplication(app);
      const studentId = app?.student?.id.replace("#", "%23");
      fetchPersonDataById(studentId).then((student) => setStudent(student));
    });
  }, []);

  if (!application) {
    notFound();
  }

  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null);

  function handleDelete(id: string) {
    setApplicationToDelete(id);
    const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (modal) {
      modal.showModal();
    }
  }

  return (
    <div className="mx-2 my-2">
      <h2 className="croll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-2 max-w-fit">
        Update Application - {application?.course?.name} -{" "}
        {application?.student?.firstName}
      </h2>
      <div className="my-6 w-full overflow-y-auto">
        <table className="max-w-fit">
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Student
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application?.student?.firstName}{" "}
                {application?.student?.lastName}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Email
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application?.student?.email}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Username
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application?.student?.username}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Date of Birth
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application?.student?.dateOfBirth}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Adress
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application?.student?.address}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-6 w-full overflow-y-auto">
        <table className="max-w-fit">
          <tbody>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                About you
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application?.aboutYou}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Previouse Knowledge
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application.prevKnowledge ? "Yes" : "No"}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Previouse Experience
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {application?.prevExperience ? "Yes" : "No"}
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Status
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                <ComboboxPopover />
              </td>
            </tr>
            <tr className="m-0 border-t p-0 even:bg-muted">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Final Grade
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                <DialogDemo grade={grade} setGrade={setGrade} />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={() => handleDelete(application.id)}>Delete</button>
        <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure you want to delete this person?</h3>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={() => {
                if (applicationToDelete) {
                  deleteApplicationById(applicationToDelete);
                  const modal = document.getElementById('my_modal_1') as HTMLDialogElement;
                  if (modal) {
                    modal.close();
                  }
                  setApplicationToDelete(null);
                }
              }}>Confirm</button>
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      </div>
    </div>
  );
}
