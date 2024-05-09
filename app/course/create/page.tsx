'use client'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/app/_components/form"
  import { Input } from "@/app/_components/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import React, { useState } from 'react';

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })

const CreateCoursePage: React.FC = () => {
    const [courseName, setCourseName] = useState('');
    const [courseYearStart, setCourseDescription] = useState('');

    const handleCourseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCourseName(event.target.value);
    };

    const handleCourseYearStartChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCourseDescription(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Add your logic to handle course creation here
        console.log('Course name:', courseName);
        console.log('Course description:', courseYearStart);
    };

    const form = z.object({
        username: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      })

    return (
        <div>
            <h1>Create Course</h1>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                        This is your public display name.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </form>
            </Form>
        </div>
    );
};

export default CreateCoursePage;