// data fetching methods go here
// e.g. get all courses; get all users

import { Course, Person } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';




export async function fetchCourses(currentPage: number): Promise<Course[]> {
    noStore();
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await fetch(`http://localhost:8080/api/v1/courses`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const courses: Course[] = await response.json();
        //console.log(courses);

        return courses;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch all courses.');
    }
}

export async function fetchCourseById(id: string): Promise<Course> {
    noStore();
    try {
        const response = await fetch(`http://localhost:8080/api/v1/courses/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const course: Course = await response.json();
        //console.log(course);

        return course;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch course.');
    }
}


export async function fetchPersonById(id: string): Promise<Person> {
    noStore();
    try {
        const response = await fetch(`http://localhost:8080/api/v1/persons/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const person: Person = await response.json();
        console.log(person);

        return person;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch person.');
    }
}

const ITEMS_PER_PAGE = 4;
export function fetchCoursesPages(courses: Course[]) {
    noStore();

    try {
        const totalCourses = courses?.length;
        const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch total number of courses.');
    }
}

export async function fetchCoursesByLocation(

    location: string,
    currentPage: number
):
    Promise<Course[]> {

    noStore();
    try {
        await new Promise((resolve) => setTimeout(resolve, 3000));

        const response = await fetch(`http://localhost:8080/api/v1/courses/location/${location}`);
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        const courses: Course[] = await response.json();
        //console.log(courses);

        return courses;
    } catch (error) {
        console.error('Database error:', error);
        throw new Error('Failed to fetch all courses.');
    }
}




