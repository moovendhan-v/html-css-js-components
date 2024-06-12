"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be atleast 5 characters.",
    }),
    description: z.string().min(5, {
        message: "description must be at least 5 characters.",
    }),
    tags: z.string().min(2, {
        message: "Tags must be at least 2 characters.",
    }),
    folder_name: z.string().min(5, {
        message: "folder_name must be at least 5 characters.",
    }),
})

export function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            tags: "uicomponents"
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Project Title" {...field} />
                            </FormControl>
                            <FormDescription>
                                Title for the compoents
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="Project description" {...field} />
                            </FormControl>
                            <FormDescription>
                                Components description
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>tags</FormLabel>
                            <FormControl>
                                <Input placeholder="Project tags" {...field} />
                            </FormControl>
                            <FormDescription>
                                Components tags
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="folder_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Folder Name</FormLabel>
                            <FormControl>
                                <Input placeholder="folder_name" {...field} />
                            </FormControl>
                            <FormDescription>
                                    Folder Name : This will push to github repo you can only give a unique one use some random charaacter at the end.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
