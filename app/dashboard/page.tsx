'use client'
import React, { useEffect, useState } from 'react';
import CourseMini from '../_components/courseMini';
import { Input } from '../_components/input';
import { Button } from '../_components/button';

interface CourseMiniProps {
    id: number;
    name: string;
    icon_path: string;
    owner_name: string;
    year_start: number;
}

const Page: React.FC = () => {
    const [courses, setCourses] = useState<CourseMiniProps[]>([]);

    useEffect(() => {
        // Tutaj możesz wywołać API i otrzymać tablicę `courseMini`
        // Przykładowo:
        // fetch('https://example.com/api/courses')
        //   .then(response => response.json())
        //   .then(data => setCourses(data));

        // Poniżej używam przykładowych danych
        const mockCourses: CourseMiniProps[] = [
            {
                id: 1,
                name: "Course 1",
                icon_path: "/path/to/icon1.png",
                owner_name: "Owner 1",
                year_start: 2021
            },
            {
                id: 2,
                name: "Course 2",
                icon_path: "/path/to/icon2.png",
                owner_name: "Owner 2",
                year_start: 2022
            },
            {
                id: 3,
                name: "Course 3",
                icon_path: "/path/to/icon3.png",
                owner_name: "Owner 3",
                year_start: 2023
            }
        ];

        setCourses(mockCourses);
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchQuery = event.currentTarget.search.value;
        // Call your API or perform any other logic here to update the courses
        // For example:
        // fetch('https://example.com/api/updateCourses', {
        //     method: 'POST',
        //     body: JSON.stringify({ searchQuery: event.currentTarget.search.value }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => response.json())
        // .then(data => setCourses(data));

        // For now, let's just update the courses with a mock response
        const mockUpdatedCourses: CourseMiniProps[] = [
            {
                id: 4,
                name: searchQuery,
                icon_path: "/path/to/icon4.png",
                owner_name: "Owner 4",
                year_start: 2024
            },
            {
                id: 5,
                name: searchQuery,
                icon_path: "/path/to/icon5.png",
                owner_name: "Owner 5",
                year_start: 2025
            }
        ];

        setCourses(mockUpdatedCourses);
    };

    return (
        <>
        <div className="max-w-full">
            <div className='max-w-full items-center flex flex-col'>
                <h2 className='w-4/5 text-left text-4xl m-4 font-bold'>All Courses</h2>
                <form className="w-4/5 flex" onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Search" name="search" />
                    <Button type="submit">Search</Button>
                </form>
                {courses.map(course => (
                    <div className="w-4/5">
                        <CourseMini {...course}/>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default Page;