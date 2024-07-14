"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect } from "react"
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
import { useCreateComponentsStore } from "@/store/createComponents/create.components"
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AlertDialogHeader } from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"

const formSchema = z.object({
    title: z.string().min(5, {
        message: "Title must be at least 5 characters.",
    }),
    description: z.string().min(5, {
        message: "Description must be at least 5 characters.",
    }),
    html: z.string().min(1, {
        message: "HTML is required.",
    }),
    css: z.string().min(1, {
        message: "CSS is required.",
    }),
    javascript: z.string().min(1, {
        message: "JavaScript is required.",
    }),
    categories: z.array(z.string()).min(1, {
        message: "Categories is required.",
    }),
    tags: z.array(z.string()).min(1, {
        message: "Tags are required.",
    }),
    folder_name: z.string().min(5, {
        message: "Folder name must be at least 5 characters.",
    }),
    type: z.string().min(1, {
        message: "Type is required.",
    }),
});


export function ProfileForm() {
    const viewCreateComponentsStore = useCreateComponentsStore((state) => state.createComponents)
    const setCreateComponentField = useCreateComponentsStore((state) => state.setCreateComponentField)

    const categoriesOptions = [
        { value: 'category1', label: 'Category 1' },
        { value: 'category2', label: 'Category 2' },
        // Add more categories as needed
    ];

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: viewCreateComponentsStore.title,
            description: viewCreateComponentsStore.description,
            // html: viewCreateComponentsStore.html,
            // css: viewCreateComponentsStore.css,
            // javascript: viewCreateComponentsStore.javascript,
            categories: viewCreateComponentsStore?.categories,
            // folder_path: viewCreateComponentsStore.folder_path,
            folder_name: viewCreateComponentsStore.folder_name,
            type: viewCreateComponentsStore.type,
        },
    })

    useEffect(() => {
        form.reset({
            title: viewCreateComponentsStore.title,
            description: viewCreateComponentsStore.description,
            // html: viewCreateComponentsStore.html,
            // css: viewCreateComponentsStore.css,
            // javascript: viewCreateComponentsStore.javascript,
            categories: viewCreateComponentsStore?.categories,
            // folder_path: viewCreateComponentsStore.folder_path,
            folder_name: viewCreateComponentsStore.folder_name,
            type: viewCreateComponentsStore.type,
        })
    }, [viewCreateComponentsStore, form])


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // for (const [field, value] of Object.entries(values)) {
        //     setCreateComponentField("title", value)
        // }
    }


    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                    <span>Contribute Components</span>
                </HoverBorderGradient>
            </AlertDialogTrigger>
            <AlertDialogContent className="max-w-5xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        Title for the component
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
                                        <Textarea placeholder="Project description" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Component description
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="html"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>HTML</FormLabel>
                                    <FormControl>
                                        <Input placeholder="HTML content" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        HTML code for the component
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="css"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CSS</FormLabel>
                                    <FormControl>
                                        <Input placeholder="CSS content" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        CSS code for the component
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="javascript"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>JavaScript</FormLabel>
                                    <FormControl>
                                        <Input placeholder="JavaScript content" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        JavaScript code for the component
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categories</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            value={field.value || []} // Ensure field.value is correctly typed as an array of strings
                                            onChange={(selectedOption: any) => {
                                                if (selectedOption) {
                                                    field.onChange(Array.isArray(selectedOption) ? selectedOption.map(option => option.value) : [selectedOption.value]);
                                                } else {
                                                    field.onChange([]);
                                                }
                                            }}
                                            onBlur={() => field.onBlur()}
                                            options={categoriesOptions} // Provide the options array
                                            name="categories"
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Categories for the component
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
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            options={[
                                                { value: 'tag1', label: 'Tag 1' },
                                                { value: 'tag2', label: 'Tag 2' },
                                                // Add more tags as needed
                                            ]}
                                            onChange={(selectedOptions: any[]) => {
                                                field.onChange(selectedOptions.map((option: { value: any }) => option.value))
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Tags for the component
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
                                        <Input placeholder="Folder name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Folder Name: This will be pushed to GitHub repo; use a unique one with some random characters at the end.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Type" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Type of the component
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="col-span-1 md:col-span-2">
                            <Button type="submit" className="w-full">Submit</Button>
                        </div>
                    </form>
                </Form>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Contribute My Component</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
