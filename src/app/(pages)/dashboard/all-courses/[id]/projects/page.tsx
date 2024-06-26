"use client"
import { fetchProjectsByCourseId, fetchUpdateProjectGrade } from "@/app/lib/data";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/app/ui/courses/card";
import { Github, Pencil, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Project } from "@/app/lib/definitions";
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { useState, useEffect } from 'react';




  export default function ProjectsByCourse({params} : {params: { id: string}}) {
    const id = params.id;
    const [projects, setProjects] = useState<Project[]>([]);
    const [newGrade, setNewGrade] = useState<number>(0);

    useEffect(() => {
        const fetchProjects = async () => {
            const projectsData = await fetchProjectsByCourseId(id);
            setProjects(projectsData);
        };

        fetchProjects();
    }, [id]);

    const handleUpdateGrade = async (projectId:string) => {
        console.log( "grade");
        try {
            await fetchUpdateProjectGrade(projectId, newGrade);
        } catch (error) {
            console.error('Failed to update project grade:', error);
        }
    };
 

    return (
        <div className="mx-2 my-2">
            <div>
                <h1 className='text-2xl mb-4'>Projects</h1>
            </div>

            <div className="flex flex-wrap">
                {projects?.map((project) => ( 
                    <div key={project.id}> 
                        <div>
                            <Card className={cn("w-[380px] mx-4 my-4")}>
                                <CardHeader>
                                    <CardTitle>{project.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    <div className=" flex items-center space--4 rounded-md border p-4">
                                        <div className=" flex flex-col flex-1 space-y-1 items-center justify-center">
                                            <div className="flex flex row items-center justify-center">
                                                <Github /> 
                                                <p className="text-sm font-medium leading-none ml-2">
                                                    {project.gitHubRepo}
                                                </p>
                                            </div>
                                            <div className=" items-center justify-center">
                                                <p className="text-sm font-medium leading-none ml-2">
                                                    Grade: {project.grade}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                
                                    <CardFooter>
                                        <Button className="w-full flex items-center p-0 pt-0">
                                            <GetProjectInfo id= {project.id.replace("#", "%23")}/>
                                        </Button>
                                    </CardFooter>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button  className="w-full flex items-center p-0 pt-0 mb-5 ">
                                            Update Grade <Pencil className="ml-2 h-4 w-4" /></Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                        <DialogTitle>Update Grade</DialogTitle>
                                        <DialogDescription>
                                        Write the project note here. Click save when you're done.
                                        </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Grade
                                                </Label>
                                                <Input
                                                    id="grade"
                                                    defaultValue="0-20"
                                                    className="col-span-3"
                                                    onChange={(e) => setNewGrade(parseInt(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                        <Button type="submit" onClick={() => handleUpdateGrade(project.id.replace("#", "%23"))}>
                                        Save
                                        </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </Card>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    function GetProjectInfo({id}: {id:string}) {
        return (
            <Link className="flex items-center p-0 pt-0"
                href={`/dashboard/all-courses/${id}/projects/projectInfo`}
            >
                More Info <ChevronsRight className="ml-2 h-4 w-4" />
            </Link>
        );
    }

  
}